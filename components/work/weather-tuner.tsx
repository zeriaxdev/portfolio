"use client";

import { Select } from "@base-ui-components/react/select";
import { Slider } from "@base-ui-components/react/slider";
import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import type { SkyKind } from "@/lib/weather";

const WEATHER_OPTIONS: { value: SkyKind; label: string }[] = [
  { value: "clear", label: "Clear" },
  { value: "few", label: "Few clouds" },
  { value: "scattered", label: "Scattered clouds" },
  { value: "broken", label: "Broken clouds" },
  { value: "overcast", label: "Overcast" },
  { value: "fog", label: "Fog" },
  { value: "rain", label: "Rain" },
  { value: "snow", label: "Snow" },
  { value: "storm", label: "Storm" },
];

const TIME_OPTIONS = [
  { value: "current", label: "Current Helsinki time" },
  { value: "day", label: "Day" },
  { value: "night", label: "Night" },
];

const PRECIPITATION_OPTIONS = [
  { value: "auto", label: "Automatic" },
  { value: "freezing", label: "Freezing rain / ice" },
  { value: "hail", label: "Hail" },
];

const COMPASS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

function compassPoint(degrees: number) {
  return COMPASS[Math.round(degrees / 45) % COMPASS.length];
}

function TunerSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="dev-weather-field">
      <span className="dev-weather-label">{label}</span>
      <Select.Root
        items={options}
        value={value}
        onValueChange={(next) => {
          if (typeof next === "string") onChange(next);
        }}
      >
        <Select.Trigger className="dev-weather-select" aria-label={label}>
          <Select.Value />
          <Select.Icon aria-hidden="true">⌄</Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner className="dev-weather-positioner" sideOffset={6}>
            <Select.Popup className="dev-weather-popup">
              <Select.List>
                {options.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="dev-weather-option"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator aria-hidden="true">✓</Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

function TunerSlider({
  label,
  value,
  min,
  max,
  step,
  output,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  output: string;
  onChange: (value: number) => void;
}) {
  return (
    <Slider.Root
      className="dev-weather-field"
      aria-label={label}
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={(next) => onChange(Number(next))}
    >
      <div className="dev-weather-label-row">
        <span className="dev-weather-label">{label}</span>
        <output className="dev-weather-value">{output}</output>
      </div>
      <Slider.Control className="dev-weather-slider-control">
        <Slider.Track className="dev-weather-track">
          <Slider.Indicator className="dev-weather-indicator" />
          <Slider.Thumb className="dev-weather-thumb" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}

export function WeatherTuner() {
  const [weather, setWeather] = useState<SkyKind>("rain");
  const [intensity, setIntensity] = useState(65);
  const [wind, setWind] = useState(12);
  const [direction, setDirection] = useState(225);
  const [time, setTime] = useState("current");
  const [precipitation, setPrecipitation] = useState("auto");

  const previewHref = useMemo(() => {
    const params = new URLSearchParams({
      weather,
      intensity: (intensity / 100).toFixed(2),
      wind: String(wind),
      direction: String(direction),
    });
    if (time !== "current") params.set("time", time);
    if (precipitation !== "auto") params.set("precipitation", precipitation);
    return `/?${params.toString()}`;
  }, [direction, intensity, precipitation, time, weather, wind]);

  return (
    <div className="dev-weather">
      <div className="dev-weather-grid">
        <TunerSelect
          label="Weather"
          value={weather}
          options={WEATHER_OPTIONS}
          onChange={(value) => setWeather(value as SkyKind)}
        />
        <TunerSelect
          label="Time"
          value={time}
          options={TIME_OPTIONS}
          onChange={setTime}
        />
        <TunerSlider
          label="Precipitation intensity"
          value={intensity}
          min={0}
          max={100}
          step={5}
          output={`${intensity}%`}
          onChange={setIntensity}
        />
        <TunerSelect
          label="Precipitation style"
          value={precipitation}
          options={PRECIPITATION_OPTIONS}
          onChange={setPrecipitation}
        />
        <TunerSlider
          label="Wind speed"
          value={wind}
          min={0}
          max={60}
          step={1}
          output={`${wind} m/s`}
          onChange={setWind}
        />
        <TunerSlider
          label="Wind direction (from)"
          value={direction}
          min={0}
          max={360}
          step={15}
          output={`${compassPoint(direction)} · ${direction}°`}
          onChange={setDirection}
        />
      </div>
      <div className="dev-weather-actions">
        <Button href={previewHref} target="_blank" rel="noreferrer" variant="primary">
          Preview sky
        </Button>
        <a className="t-link" href="/" target="_blank" rel="noreferrer">
          Open live Helsinki sky
        </a>
      </div>
      <p className="t-small dev-note dev-weather-help">
        Wind direction is where it comes from: north is 0°, east 90°, south 180°, west 270°.
        Preview values only change the new tab; the homepage stays tied to current Helsinki weather.
      </p>
    </div>
  );
}
