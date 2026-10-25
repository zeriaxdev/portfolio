/** Helsinki's sky right now, as the homepage hero draws it. */

export type SkyKind =
  | "clear"
  | "few"
  | "scattered"
  | "broken"
  | "overcast"
  | "fog"
  | "rain"
  | "snow"
  | "storm";
export type SkyTime = "day" | "night";
export type PrecipitationType = "rain" | "snow" | "freezing" | "hail" | null;

export type Sky = {
  kind: SkyKind;
  time: SkyTime;
  weatherCode: number;
  precipitationType: PrecipitationType;
  intensity: number;
  windSpeed: number;
  windDirection: number;
  /** Seconds for one tile to drift past. Faster wind, shorter. */
  drift: number;
  /** Clouds move left on an easterly wind, right on a westerly. */
  dir: "normal" | "reverse";
  /** Vertical sway in px, from the gusts. */
  sway: number;
};

/** Open-Meteo `current` values; snowfall is cm, other precipitation is mm. */
export type Current = {
  cloud_cover: number;
  weather_code: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  is_day: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
};

/** Seconds for the 1920px tile to drift past at a wind speed. The ?wind=
 *  preview in app/page.tsx repeats this formula; keep the two in step. */
export const driftSeconds = (windMs: number, share = 1) =>
  Math.round(Math.min(900, Math.max(60, 1920 / (1.5 + windMs * 1.6 * share))));

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function kindFrom(code: number, cover: number): SkyKind {
  if (code === 45 || code === 48) return "fog";
  if ([95, 96, 97, 99].includes(code)) return "storm";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if (code === 3 || cover >= 90) return "overcast";
  if (cover >= 65) return "broken";
  if (cover >= 35) return "scattered";
  if (cover >= 10) return "few";
  return "clear";
}

function intensityFrom(kind: SkyKind, c: Current): number {
  if (kind !== "rain" && kind !== "snow" && kind !== "storm") return 0;

  const code = c.weather_code;
  let codeIntensity = 0.35;
  if (kind === "storm") {
    codeIntensity = code === 95 ? 0.58 : code === 96 ? 0.7 : code === 99 ? 1 : 0.92;
  } else if ([55, 57, 65, 67, 75, 82, 86].includes(code)) {
    codeIntensity = 0.92;
  } else if ([53, 63, 73, 81].includes(code)) {
    codeIntensity = 0.62;
  }

  const observedIntensity = kind === "snow"
    ? c.snowfall / 3
    : Math.max(c.precipitation, c.rain + c.showers) / 8;
  return Math.round(clamp(Math.max(codeIntensity, observedIntensity), 0.2, 1) * 100) / 100;
}

export function skyFrom(c: Current): Sky {
  const kind = kindFrom(c.weather_code, c.cloud_cover);
  const intensity = intensityFrom(kind, c);
  const windSpeed = clamp(c.wind_speed_10m, 0, 60);
  const windDirection = ((c.wind_direction_10m % 360) + 360) % 360;

  // Wind direction is where it comes from; its east-west part moves the
  // clouds. A north or south wind still drifts them a little.
  const dx = -Math.sin((windDirection * Math.PI) / 180);
  return {
    kind,
    time: c.is_day === 1 ? "day" : "night",
    weatherCode: c.weather_code,
    precipitationType: [56, 57, 66, 67].includes(c.weather_code)
      ? "freezing"
      : [96, 99].includes(c.weather_code)
        ? "hail"
        : kind === "rain" || kind === "snow"
          ? kind
          : null,
    intensity,
    windSpeed,
    windDirection,
    drift: driftSeconds(windSpeed, Math.max(Math.abs(dx), 0.35)),
    dir: dx > 0 ? "reverse" : "normal",
    sway: Math.round(Math.min(8, Math.max(2, c.wind_gusts_10m * 0.6))),
  };
}

const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=60.1699&longitude=24.9384" +
  "&current=cloud_cover,weather_code,precipitation,rain,showers,snowfall,is_day," +
  "wind_speed_10m,wind_direction_10m,wind_gusts_10m" +
  "&wind_speed_unit=ms";

/** Cached for 30 minutes; null when the API is down, and the page falls
 *  back to a random sky. */
export async function getHelsinkiSky(): Promise<Sky | null> {
  try {
    const res = await fetch(URL, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    const { current } = (await res.json()) as { current: Current };
    return skyFrom(current);
  } catch {
    return null;
  }
}
