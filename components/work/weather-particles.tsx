"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  size: number;
  alpha: number;
  weight: number;
  solid: boolean;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** A single capped canvas draws discrete precipitation only while visible. */
export function WeatherParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sky = canvas?.closest<HTMLElement>(".home-sky");
    const context = canvas?.getContext("2d", { alpha: true, desynchronized: true });
    if (!canvas || !sky || !context) return;

    const kind = sky.dataset.kind;
    if (kind !== "rain" && kind !== "snow" && kind !== "storm") return;
    const precipitationType = sky.dataset.precipitationType;
    const isDrizzle = sky.dataset.drizzle === "true";

    const query = new URLSearchParams(window.location.search);
    const parsedIntensity = Number.parseFloat(sky.style.getPropertyValue("--intensity"));
    const intensity = clamp(Number.isFinite(parsedIntensity) ? parsedIntensity : 0.6, 0, 1);
    const queryWind = query.get("wind");
    let windSpeed = Number.parseFloat(queryWind ?? sky.dataset.windSpeed ?? "0");
    if (!Number.isFinite(windSpeed)) windSpeed = 0;
    const queryDirection = query.get("direction");
    let windDirection = Number.parseFloat(
      queryDirection ?? (queryWind !== null && windSpeed < 0 ? "270" : sky.dataset.windDirection ?? "90"),
    );
    if (!Number.isFinite(windDirection)) windDirection = 90;
    windDirection = ((windDirection % 360) + 360) % 360;
    windSpeed = clamp(Math.abs(windSpeed), 0, 60);

    const radians = (windDirection * Math.PI) / 180;
    const wind = Math.min(60, windSpeed) * 2.1;
    const windX = -Math.sin(radians) * wind;
    const windY = Math.cos(radians) * wind;
    const particleColor = getComputedStyle(sky).getPropertyValue("--weather-particle").trim() || "#EDF4FF";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let timer = 0;
    let lastFrame = 0;
    let onScreen = false;
    let pageVisible = document.visibilityState === "visible";
    let flashAt = 0;
    let nextFlashAt = performance.now() + 10000 + Math.random() * 12000;

    const makeParticle = (fromTop = false): Particle => {
      const snow = kind === "snow" || precipitationType === "snow";
      const solid = snow ||
        (precipitationType === "freezing" && Math.random() < 0.38) ||
        (precipitationType === "hail" && Math.random() < 0.58) ||
        (precipitationType === "sleet" && Math.random() < 0.38);
      const x = Math.random() * width;
      const baseY = fromTop ? -Math.random() * 80 : Math.random() * height;
      const speedScale = 0.7 + intensity * 0.6;
      if (snow) {
        return {
          x,
          y: baseY,
          vx: windX * 0.75 + (Math.random() - 0.5) * 12,
          vy: clamp((22 + Math.random() * 32) * speedScale + windY * 0.45, 10, 130),
          length: 0,
          size: 0.9 + Math.random() * 1.6,
          alpha: 0.36 + Math.random() * 0.42,
          weight: 0,
          solid: true,
        };
      }
      return {
        x,
        y: baseY,
        vx: windX * 0.55 + (Math.random() - 0.5) * 8,
        vy: clamp((155 + Math.random() * 125) * speedScale + windY * 0.25, 80, 440),
        length: isDrizzle ? 4 + Math.random() * 5 : 7 + Math.random() * 9,
        size: solid ? 1.3 + Math.random() * 1.4 : 0,
        alpha: solid ? 0.44 + Math.random() * 0.3 : 0.26 + Math.random() * 0.28,
        weight: 0.7 + Math.random() * 0.45,
        solid,
      };
    };

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      if (kind === "storm" && !prefersReducedMotion.matches) {
        if (now >= nextFlashAt) {
          flashAt = now;
          nextFlashAt = now + 14000 + Math.random() * 18000;
        }
        const age = now - flashAt;
        const flashAlpha = age >= 0 && age < 125 ? (age < 40 ? 0.055 : 0.022) * intensity : 0;
        if (flashAlpha > 0) {
          context.globalAlpha = flashAlpha;
          context.fillStyle = particleColor;
          context.fillRect(0, 0, width, height);
        }
      }

      context.strokeStyle = particleColor;
      context.fillStyle = particleColor;
      for (const particle of particles) {
        context.globalAlpha = particle.alpha * (0.5 + intensity * 0.5);
        if (particle.solid) {
          context.fillRect(particle.x, particle.y, particle.size, particle.size);
        } else {
          const slant = (particle.vx / particle.vy) * particle.length;
          context.lineWidth = particle.weight;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(particle.x + slant, particle.y + particle.length);
          context.stroke();
        }
      }
      context.globalAlpha = 1;
    };

    const resize = () => {
      const bounds = sky.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.imageSmoothingEnabled = false;

      const areaScale = kind === "snow" || sky.dataset.precipitationType === "snow" ? 26000 : 17000;
      const density = 0.28 + intensity * 0.72;
      const stormBoost = kind === "storm" ? 1.15 : 1;
      const count = clamp(Math.round((width * height * density * stormBoost) / areaScale), 8, 88);
      particles.length = 0;
      for (let index = 0; index < count; index += 1) particles.push(makeParticle());
      draw(performance.now());
    };

    const canAnimate = () => onScreen && pageVisible && !prefersReducedMotion.matches;
    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (timer) window.clearTimeout(timer);
      frame = 0;
      timer = 0;
      lastFrame = 0;
    };
    const tick = (now: number) => {
      frame = 0;
      if (!canAnimate()) return;
      const delta = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 0;
      lastFrame = now;
      for (const particle of particles) {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        if (particle.y > height + 20 || particle.x < -32 || particle.x > width + 32) {
          Object.assign(particle, makeParticle(true));
        }
      }
      draw(now);
      timer = window.setTimeout(() => {
        timer = 0;
        if (canAnimate()) frame = window.requestAnimationFrame(tick);
      }, 1000 / 30);
    };
    const start = () => {
      if (canAnimate() && !frame && !timer) frame = window.requestAnimationFrame(tick);
      else if (prefersReducedMotion.matches) draw(performance.now());
    };
    const onVisibilityChange = () => {
      pageVisible = document.visibilityState === "visible";
      if (pageVisible) start();
      else stop();
    };
    const onMotionPreferenceChange = () => {
      if (prefersReducedMotion.matches) stop();
      start();
    };

    resize();
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    intersectionObserver.observe(sky);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(sky);
    document.addEventListener("visibilitychange", onVisibilityChange);
    prefersReducedMotion.addEventListener("change", onMotionPreferenceChange);

    return () => {
      stop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      prefersReducedMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="home-sky-weather" aria-hidden="true" />;
}
