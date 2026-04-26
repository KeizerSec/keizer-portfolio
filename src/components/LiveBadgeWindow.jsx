import { useEffect, useRef, useState } from "react";

const BADGE_URL = "https://raw.githubusercontent.com/KeizerSec/Tryhackme-Badge/main/assets/demo.svg";
const TITLE = "~/tryhackme/live.svg";

function useTypewriterOnVisible(ref, text, delay = 50) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done) {
        let i = 0;
        const t = setInterval(() => {
          i++;
          setOut(text.slice(0, i));
          if (i >= text.length) { clearInterval(t); setDone(true); }
        }, delay);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, text, delay, done]);
  return out;
}

export default function LiveBadgeWindow({ ct }) {
  const ref = useRef(null);
  const titleText = useTypewriterOnVisible(ref, TITLE, 45);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div ref={ref} style={{
      maxWidth: "640px", margin: "0 auto 28px",
      borderRadius: "10px", overflow: "hidden",
      border: "1px solid " + ct.primary + "55",
      backgroundColor: "#000",
      boxShadow: "0 8px 24px " + ct.primary + "22, inset 0 0 0 1px " + ct.primary + "11",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "8px 12px",
        backgroundColor: ct.bg + "ee",
        borderBottom: "1px solid " + ct.primary + "33",
      }}>
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#ff5f57", display: "inline-block", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)" }} />
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#febc2e", display: "inline-block", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)" }} />
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#28c840", display: "inline-block", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)" }} />
        </div>
        <span style={{ flex: 1, textAlign: "center", fontSize: "11px", color: ct.muted || ct.text, opacity: 0.75, letterSpacing: "0.5px", fontVariantNumeric: "tabular-nums" }}>
          {titleText}<span style={{ animation: "pulse 0.8s infinite", marginLeft: "1px", opacity: titleText.length < TITLE.length ? 1 : 0 }}>|</span>
        </span>
        <span style={{ width: "36px" }} />
      </div>

      <div style={{ position: "relative", backgroundColor: "#000" }}>
        <a href="https://github.com/KeizerSec/Tryhackme-Badge" target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
          <img src={BADGE_URL} alt="Badge TryHackMe live — auto-refresh quotidien" loading="lazy" style={{ display: "block", width: "100%", height: "auto" }} />
        </a>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(180deg, transparent 0%, " + ct.primary + "0a 50%, transparent 100%)",
          backgroundSize: "100% 8px",
          animation: "scanline 6s linear infinite",
          mixBlendMode: "screen",
        }} />
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "8px 14px",
        backgroundColor: ct.bg + "ee",
        borderTop: "1px solid " + ct.primary + "22",
        fontSize: "10px", color: ct.muted || ct.text, opacity: 0.7, letterSpacing: "0.5px",
      }}>
        <span>
          <span style={{ color: ct.primary }}>●</span> live · auto-refresh daily
        </span>
        <span>last build · {today}</span>
      </div>
    </div>
  );
}
