// Run with `npm test`. Node strips the types from weather.ts itself.
import { test } from "node:test";
import assert from "node:assert/strict";
import { driftSeconds, skyFrom } from "./weather.ts";

const at = (over = {}) => ({
  cloud_cover: 0,
  weather_code: 0,
  precipitation: 0,
  rain: 0,
  showers: 0,
  snowfall: 0,
  is_day: 1,
  wind_speed_10m: 0,
  wind_direction_10m: 270,
  wind_gusts_10m: 0,
  ...over,
});

test("cloud cover picks the kind", () => {
  assert.equal(skyFrom(at({ cloud_cover: 5 })).kind, "clear");
  assert.equal(skyFrom(at({ cloud_cover: 20 })).kind, "few");
  assert.equal(skyFrom(at({ cloud_cover: 50 })).kind, "scattered");
  assert.equal(skyFrom(at({ cloud_cover: 80 })).kind, "broken");
  assert.equal(skyFrom(at({ cloud_cover: 95 })).kind, "overcast");
});

test("fog and precipitation win over cloud cover", () => {
  assert.equal(skyFrom(at({ cloud_cover: 20, weather_code: 45 })).kind, "fog");
  assert.equal(skyFrom(at({ cloud_cover: 20, weather_code: 61 })).kind, "rain");
  assert.equal(skyFrom(at({ cloud_cover: 20, weather_code: 71 })).kind, "snow");
  assert.equal(skyFrom(at({ cloud_cover: 20, weather_code: 95 })).kind, "storm");
  assert.equal(skyFrom(at({ weather_code: 56 })).precipitationType, "freezing");
  assert.equal(skyFrom(at({ weather_code: 96 })).precipitationType, "hail");
  assert.equal(skyFrom(at({ cloud_cover: 20, weather_code: 3 })).kind, "overcast");
});

test("precipitation intensity follows the code and measured amount", () => {
  const light = skyFrom(at({ weather_code: 61 }));
  const heavy = skyFrom(at({ weather_code: 65 }));
  const thunderstorm = skyFrom(at({ weather_code: 95 }));
  const hailstorm = skyFrom(at({ weather_code: 99 }));
  const measured = skyFrom(at({ weather_code: 61, precipitation: 12, rain: 11 }));

  assert.ok(light.intensity < heavy.intensity);
  assert.ok(thunderstorm.intensity < hailstorm.intensity);
  assert.equal(measured.intensity, 1);
});

test("wind direction sets which way the clouds drift", () => {
  const westerly = skyFrom(at({ wind_direction_10m: 270, wind_speed_10m: 12 }));
  const easterly = skyFrom(at({ wind_direction_10m: 90, wind_speed_10m: 12 }));

  assert.equal(westerly.dir, "reverse"); // from the west: moves right
  assert.equal(easterly.dir, "normal"); // from the east: moves left
});

test("time of day follows the current condition", () => {
  assert.equal(skyFrom(at({ is_day: 1 })).time, "day");
  assert.equal(skyFrom(at({ is_day: 0 })).time, "night");
});

test("stronger wind drifts faster, within bounds", () => {
  assert.ok(driftSeconds(10) < driftSeconds(2));
  assert.equal(driftSeconds(0), 900);
  assert.equal(driftSeconds(100), 60);
});
