"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// WebGL: client only, and loaded after the page so it never blocks text.
const Dither = dynamic(() => import("@/components/other/Dither"), { ssr: false });

/** The homepage sky: my dither shader draws white clouds, screened over a
 *  sky gradient (CSS) so its black ground disappears. Day sky in light mode,
 *  night sky in dark. The clouds drift slowly and hold still under reduced
 *  motion. */
export default function HeroSky() {
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setStill(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  return (
    <div className="home-sky" aria-hidden>
      <div className="home-sky-clouds">
        <Dither
          waveColor={[1, 1, 1]}
          colorNum={5}
          pixelSize={3}
          waveFrequency={1.6}
          waveAmplitude={0.22}
          waveSpeed={0.015}
          enableMouseInteraction={false}
          disableAnimation={still}
        />
      </div>
    </div>
  );
}
