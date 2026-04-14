import { useState, useEffect } from "react";

export default function BackToTop({ ct }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed", bottom: "30px", right: "30px", zIndex: 998,
        width: "44px", height: "44px", borderRadius: "50%",
        backgroundColor: ct.bg, border: "2px solid " + ct.primary,
        color: ct.primary, cursor: "pointer", fontSize: "18px",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 0 16px " + ct.primary + "44",
        transition: "all 0.3s",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        pointerEvents: visible ? "auto" : "none",
        fontFamily: "monospace",
      }}
      onMouseEnter={e => { e.currentTarget.style.backgroundColor = ct.primary; e.currentTarget.style.color = ct.bg; e.currentTarget.style.boxShadow = "0 0 24px " + ct.primary; }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = ct.bg; e.currentTarget.style.color = ct.primary; e.currentTarget.style.boxShadow = "0 0 16px " + ct.primary + "44"; }}
      title="Retour en haut"
    >
      ↑
    </button>
  );
}
