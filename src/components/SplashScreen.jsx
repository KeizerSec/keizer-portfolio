import { useState, useEffect } from "react";

const LINES = [
  "Initializing KeizerSec...",
  "Loading threat intelligence modules...",
  "Establishing secure connection...",
  "Access granted.",
];

export default function SplashScreen({ ct, mono, onDone }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      setTimeout(() => { setFading(true); setTimeout(onDone, 500); }, 400);
      return;
    }
    const line = LINES[lineIndex];
    if (charIndex < line.length) {
      const t = setTimeout(() => {
        setDisplayed(line.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed("");
        setCharIndex(0);
        setLineIndex(i => i + 1);
      }, lineIndex === LINES.length - 1 ? 600 : 300);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex, onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      backgroundColor: ct.bg, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", fontFamily: mono,
      opacity: fading ? 0 : 1, transition: "opacity 0.5s ease-out",
    }}>
      <div style={{ marginBottom: "32px", fontSize: "clamp(32px, 8vw, 56px)", fontWeight: "bold" }}>
        <span style={{ color: ct.primary }}>KEIZER</span>
        <span style={{ color: ct.accent }}>SEC</span>
      </div>

      <div style={{ height: "24px", fontSize: "13px", color: ct.primary, opacity: 0.8, letterSpacing: "1px", minWidth: "320px", textAlign: "center" }}>
        {displayed}
        <span style={{ animation: "pulse 0.8s infinite", marginLeft: "2px" }}>█</span>
      </div>

      <div style={{ marginTop: "40px", width: "260px", height: "2px", backgroundColor: ct.primary + "22", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{
          height: "100%", backgroundColor: ct.primary,
          boxShadow: "0 0 8px " + ct.primary,
          width: ((lineIndex / LINES.length) * 100) + "%",
          transition: "width 0.3s ease-out",
        }} />
      </div>
    </div>
  );
}
