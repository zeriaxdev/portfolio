import { unstable_cache } from "next/cache";

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
export type PrecipitationType = "rain" | "snow" | "sleet" | "freezing" | "hail" | null;

export type Sky = {
  kind: SkyKind;
  time: SkyTime;
  isDrizzle: boolean;
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

type ForecastPeriod = {
  summary?: { symbol_code?: string };
  details?: {
    precipitation_amount?: number;
    probability_of_thunder?: number;
  };
};

export type ForecastStep = {
  time: string;
  data: {
    instant: {
      details: {
        cloud_area_fraction?: number;
        fog_area_fraction?: number;
        wind_speed?: number;
        wind_from_direction?: number;
        wind_speed_of_gust?: number;
      };
    };
    next_1_hours?: ForecastPeriod;
    next_6_hours?: ForecastPeriod;
    next_12_hours?: ForecastPeriod;
  };
};

type ForecastResponse = {
  properties?: { timeseries?: ForecastStep[] };
};

type CachedSky = {
  sky: Sky;
  lastModified: string | null;
};

/** Seconds for the 1920px tile to drift past at a wind speed. The ?wind=
 *  preview in app/page.tsx repeats this formula; keep the two in step. */
export const driftSeconds = (windMs: number, share = 1) =>
  Math.round(Math.min(900, Math.max(60, 1920 / (1.5 + windMs * 1.6 * share))));

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const finiteOr = (value: number | undefined, fallback = 0) =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;

function cloudKind(cover: number): SkyKind {
  if (cover >= 90) return "overcast";
  if (cover >= 65) return "broken";
  if (cover >= 35) return "scattered";
  if (cover >= 10) return "few";
  return "clear";
}

function isHelsinkiDaylight(timestamp: string): boolean {
  const date = new Date(timestamp);
  if (!Number.isFinite(date.getTime())) return true;

  const dayOfYear = Math.floor(
    (Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) -
      Date.UTC(date.getUTCFullYear(), 0, 0)) /
      86_400_000,
  );
  const latitude = (60.17 * Math.PI) / 180;
  const longitude = 24.94;
  const declination =
    (23.44 * Math.sin((2 * Math.PI * (284 + dayOfYear)) / 365) * Math.PI) / 180;
  const civilTwilight = (96 * Math.PI) / 180;
  const cosHourAngle =
    (Math.cos(civilTwilight) - Math.sin(latitude) * Math.sin(declination)) /
    (Math.cos(latitude) * Math.cos(declination));

  if (cosHourAngle >= 1) return false;
  if (cosHourAngle <= -1) return true;

  const halfDayHours = (Math.acos(cosHourAngle) * 12) / Math.PI;
  const solarNoonUtc = 12 - longitude / 15;
  const utcHour = date.getUTCHours() + date.getUTCMinutes() / 60;
  return Math.abs(utcHour - solarNoonUtc) <= halfDayHours;
}

function periodFor(step: ForecastStep): { value?: ForecastPeriod; hours: number } {
  if (step.data.next_1_hours) return { value: step.data.next_1_hours, hours: 1 };
  if (step.data.next_6_hours) return { value: step.data.next_6_hours, hours: 6 };
  if (step.data.next_12_hours) return { value: step.data.next_12_hours, hours: 12 };
  return { value: undefined, hours: 1 };
}

function symbolBase(symbolCode: string): { base: string; variant?: string } {
  const match = symbolCode.match(/_(day|night|polartwilight)$/);
  return {
    base: symbolCode.replace(/_(day|night|polartwilight)$/, ""),
    variant: match?.[1],
  };
}

function kindFrom(symbol: string, cloudCover: number, fogCover: number): SkyKind {
  if (symbol.includes("andthunder")) return "storm";
  if (symbol.includes("snow")) return "snow";
  if (symbol.includes("rain") || symbol.includes("sleet")) return "rain";
  if (symbol === "fog" || fogCover >= 50) return "fog";
  return cloudKind(cloudCover);
}

function precipitationFrom(symbol: string): PrecipitationType {
  if (symbol.includes("snow")) return "snow";
  if (symbol.includes("sleet")) return "sleet";
  if (symbol.includes("rain")) return "rain";
  return null;
}

function intensityFrom(
  kind: SkyKind,
  symbol: string,
  amount: number,
  hours: number,
): number {
  if (kind !== "rain" && kind !== "snow" && kind !== "storm") return 0;

  const classIntensity = symbol.startsWith("heavy")
    ? 0.92
    : symbol.startsWith("light")
      ? 0.34
      : 0.62;
  const hourlyAmount = Math.max(0, amount) / hours;
  const amountScale = kind === "snow" ? 4 : 8;
  const amountIntensity = clamp(hourlyAmount / amountScale, 0, 1);
  const stormFloor = kind === "storm" ? 0.74 : 0.2;
  return Math.round(clamp(Math.max(classIntensity, amountIntensity, stormFloor), 0.2, 1) * 100) / 100;
}

export function skyFrom(step: ForecastStep): Sky {
  const details = step.data.instant.details;
  const period = periodFor(step);
  const { base: symbol, variant } = symbolBase(period.value?.summary?.symbol_code ?? "");
  const cloudCover = clamp(finiteOr(details.cloud_area_fraction), 0, 100);
  const fogCover = clamp(finiteOr(details.fog_area_fraction), 0, 100);
  const precipitationType = precipitationFrom(symbol);
  const kind = kindFrom(symbol, cloudCover, fogCover);
  const intensity = intensityFrom(
    kind,
    symbol,
    finiteOr(period.value?.details?.precipitation_amount),
    period.hours,
  );
  const windSpeed = clamp(finiteOr(details.wind_speed), 0, 60);
  const windDirection = ((finiteOr(details.wind_from_direction) % 360) + 360) % 360;

  // Wind direction is where it comes from; its east-west part moves the
  // clouds. A north or south wind still drifts them a little.
  const dx = -Math.sin((windDirection * Math.PI) / 180);
  const time = variant
    ? variant === "night"
      ? "night"
      : "day"
    : isHelsinkiDaylight(step.time)
      ? "day"
      : "night";

  return {
    kind,
    time,
    isDrizzle: symbol.startsWith("lightrain"),
    precipitationType,
    intensity,
    windSpeed,
    windDirection,
    drift: driftSeconds(windSpeed, Math.max(Math.abs(dx), 0.35)),
    dir: dx > 0 ? "reverse" : "normal",
    sway: Math.round(Math.min(8, Math.max(2, finiteOr(details.wind_speed_of_gust, windSpeed) * 0.6))),
  };
}

const URL =
  "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.17&lon=24.94";
const USER_AGENT = "zeriax.com weather (contact@zeriax.com)";
let lastCachedSky: CachedSky | null = null;

const getCachedHelsinkiForecast = unstable_cache(
  async (): Promise<CachedSky> => {
    const headers = new Headers({ "User-Agent": USER_AGENT });
    if (lastCachedSky?.lastModified) {
      headers.set("If-Modified-Since", lastCachedSky.lastModified);
    }

    const res = await fetch(URL, {
      cache: "no-store",
      headers,
      signal: AbortSignal.timeout(3000),
    });
    if (res.status === 304 && lastCachedSky) return lastCachedSky;
    if (!res.ok) throw new Error(`MET Norway returned ${res.status}`);

    const forecast = (await res.json()) as ForecastResponse;
    const current = forecast.properties?.timeseries?.[0];
    if (!current?.data?.instant?.details) {
      throw new Error("MET Norway returned no current Helsinki forecast");
    }

    const snapshot = {
      sky: skyFrom(current),
      lastModified: res.headers.get("last-modified"),
    };
    lastCachedSky = snapshot;
    return snapshot;
  },
  ["met-no-helsinki-locationforecast-v1"],
  { revalidate: 1800 },
);

/** The cached server fetch refreshes only after a visitor arrives following
 *  expiry. MET Norway updates Nordic forecasts hourly and asks clients to
 *  wait at least 30 minutes between requests for the same location. Rechecks
 *  use Last-Modified when the current server process has that metadata. */
export async function getHelsinkiSky(): Promise<Sky | null> {
  try {
    const snapshot = await getCachedHelsinkiForecast();
    lastCachedSky = snapshot;
    return snapshot.sky;
  } catch {
    return null;
  }
}
