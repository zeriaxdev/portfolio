// Run with `npm test`. Node strips the types from weather.ts itself.
import { test } from "node:test";
import assert from "node:assert/strict";
import { driftSeconds, skyFrom } from "./weather.ts";

const at = (over) => ({
  cloud_cover: 0, weather_code: 0, wind_speed_10m: 0, wind_direction_10m: 270, wind_gusts_10m: 0, ...over,
});

test("cloud cover picks the kind", () => {
  assert.equal(skyFrom(at({ cloud_cover: 5 })).kind, "clear");
  assert.equal(skyFrom(at({ cloud_cover: 20 })).kind, "few");
  assert.equal(skyFrom(at({ cloud_cover: 50 })).kind, "scattered");
  assert.equal(skyFrom(at({ cloud_cover: 80 })).kind, "broken");
  assert.equal(skyFrom(at({ cloud_cover: 95 })).kind, "overcast");
});

test("fog and rain win over cloud cover", () => {
  assert.equal(skyFrom(at({ cloud_cover: 20, weather_code: 45 })).kind, "fog");
  assert.equal(skyFrom(at({ cloud_cover: 20, weather_code: 61 })).kind, "overcast");
});

test("wind direction sets which way the clouds drift", () => {
  assert.equal(skyFrom(at({ wind_direction_10m: 270 })).dir, "reverse"); // from the west: moves right
  assert.equal(skyFrom(at({ wind_direction_10m: 90 })).dir, "normal"); // from the east: moves left
});

test("stronger wind drifts faster, within bounds", () => {
  assert.ok(driftSeconds(10) < driftSeconds(2));
  assert.equal(driftSeconds(0), 900);
  assert.equal(driftSeconds(100), 60);
});
