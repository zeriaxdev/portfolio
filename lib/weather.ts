/** Helsinki's sky right now, as the homepage hero draws it. */

export type SkyKind = "clear" | "few" | "scattered" | "broken" | "overcast" | "fog";

export type Sky = {
  kind: SkyKind;
  /** Seconds for one tile to drift past. Faster wind, shorter. */
  drift: number;
  /** Clouds move left on an easterly wind, right on a westerly. */
  dir: "normal" | "reverse";
  /** Vertical sway in px, from the gusts. */
  sway: number;
};

/** Open-Meteo `current` values (wind in m/s, direction it blows from). */
export type Current = {
  cloud_cover: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
};

/** Seconds for the 1920px tile to drift past at a wind speed. The ?wind=
 *  preview in app/page.tsx repeats this formula; keep the two in step. */
export const driftSeconds = (windMs: number, share = 1) =>
  Math.round(Math.min(900, Math.max(60, 1920 / (1.5 + windMs * 1.6 * share))));

export function skyFrom(c: Current): Sky {
  const fog = c.weather_code === 45 || c.weather_code === 48;
  // Rain, snow and storms come later; until then they read as overcast.
  const wet = c.weather_code >= 51;
  const cover = c.cloud_cover;
  const kind: SkyKind = fog
    ? "fog"
    : wet || cover >= 90
      ? "overcast"
      : cover >= 65
        ? "broken"
        : cover >= 35
          ? "scattered"
          : cover >= 10
            ? "few"
            : "clear";

  // Wind direction is where it comes from; its east-west part moves the
  // clouds. A north or south wind still drifts them a little.
  const dx = -Math.sin((c.wind_direction_10m * Math.PI) / 180);
  return {
    kind,
    drift: driftSeconds(c.wind_speed_10m, Math.max(Math.abs(dx), 0.35)),
    dir: dx > 0 ? "reverse" : "normal",
    sway: Math.round(Math.min(8, Math.max(2, c.wind_gusts_10m * 0.6))),
  };
}

const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=60.1699&longitude=24.9384" +
  "&current=cloud_cover,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m" +
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
