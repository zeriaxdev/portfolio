// Run with `npm test`. Node strips the types from weather.ts itself.
import { test } from "node:test";
import assert from "node:assert/strict";
import { driftSeconds, skyFrom } from "./weather.ts";

const at = ({
  cloud_cover = 0,
  fog_cover = 0,
  symbol = "clearsky_day",
  precipitation = 0,
  time = "2026-07-01T12:00:00Z",
  wind_speed = 0,
  wind_direction = 270,
  wind_gust = 0,
} = {}) => ({
  time,
  data: {
    instant: {
      details: {
        cloud_area_fraction: cloud_cover,
        fog_area_fraction: fog_cover,
        wind_speed,
        wind_from_direction: wind_direction,
        wind_speed_of_gust: wind_gust,
      },
    },
    next_1_hours: {
      summary: { symbol_code: symbol },
      details: { precipitation_amount: precipitation },
    },
  },
});

test("cloud cover picks the kind", () => {
  assert.equal(skyFrom(at({ cloud_cover: 5 })).kind, "clear");
  assert.equal(skyFrom(at({ cloud_cover: 20 })).kind, "few");
  assert.equal(skyFrom(at({ cloud_cover: 50 })).kind, "scattered");
  assert.equal(skyFrom(at({ cloud_cover: 80 })).kind, "broken");
  assert.equal(skyFrom(at({ cloud_cover: 95 })).kind, "overcast");
});

test("fog and precipitation win over cloud cover", () => {
  assert.equal(skyFrom(at({ cloud_cover: 20, symbol: "fog" })).kind, "fog");
  assert.equal(skyFrom(at({ cloud_cover: 20, symbol: "rain" })).kind, "rain");
  assert.equal(skyFrom(at({ cloud_cover: 20, symbol: "snow" })).kind, "snow");
  assert.equal(skyFrom(at({ cloud_cover: 20, symbol: "rainandthunder" })).kind, "storm");
  assert.equal(skyFrom(at({ cloud_cover: 20, symbol: "sleet" })).precipitationType, "sleet");
  assert.equal(skyFrom(at({ cloud_cover: 20, symbol: "cloudy" })).kind, "few");
});

test("precipitation intensity follows the code and measured amount", () => {
  const light = skyFrom(at({ symbol: "lightrain" }));
  const heavy = skyFrom(at({ symbol: "heavyrain" }));
  const thunderstorm = skyFrom(at({ symbol: "rainandthunder" }));
  const heavyThunderstorm = skyFrom(at({ symbol: "heavyrainandthunder" }));
  const measured = skyFrom(at({ symbol: "rain", precipitation: 12 }));

  assert.ok(light.intensity < heavy.intensity);
  assert.ok(thunderstorm.intensity < heavyThunderstorm.intensity);
  assert.equal(measured.intensity, 1);
});

test("wind direction sets which way the clouds drift", () => {
  const westerly = skyFrom(at({ wind_direction: 270, wind_speed: 12 }));
  const easterly = skyFrom(at({ wind_direction: 90, wind_speed: 12 }));

  assert.equal(westerly.dir, "reverse"); // from the west: moves right
  assert.equal(easterly.dir, "normal"); // from the east: moves left
});

test("time of day follows the current condition", () => {
  assert.equal(skyFrom(at({ symbol: "clearsky_day" })).time, "day");
  assert.equal(skyFrom(at({ symbol: "clearsky_night" })).time, "night");
});

test("stronger wind drifts faster, within bounds", () => {
  assert.ok(driftSeconds(10) < driftSeconds(2));
  assert.equal(driftSeconds(0), 900);
  assert.equal(driftSeconds(100), 60);
});
