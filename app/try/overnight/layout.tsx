import { Instrument_Serif } from "next/font/google";
import "./overnight.css";

// SIL Open Font License 1.1 (Google Fonts), self-hosted by next/font. Only option C uses it.
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--ov-font-b", weight: "400" });

export default function OvernightLayout({ children }: { children: React.ReactNode }) {
  return <div className={`ov-root ${instrument.variable}`}>{children}</div>;
}
