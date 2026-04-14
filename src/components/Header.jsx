import { Shield, Terminal as TerminalIcon } from "lucide-react";

export default function Header({ ct, mono, theme, setTheme, showTerminal, setShowTerminal }) {
  return (
    <header style={{
      padding: "14px 20px", borderBottom: "2px solid " + ct.primary,
      backgroundColor: ct.bg + "ee", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(10px)",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Shield style={{ width: 22, height: 22, color: ct.primary }} />
          <span style={{ fontSize: "20px", fontWeight: "bold", letterSpacing: "2px" }}>
            <span style={{ color: ct.primary }}>KEIZER</span>
            <span style={{ color: ct.accent }}>SEC</span>
          </span>
        </div>
        <nav style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
          {["about", "skills", "research", "projects", "writeups", "contact"].map((s) => (
            <button key={s}
              onClick={() => { const el = document.getElementById(s); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              style={{ padding: "4px 10px", color: ct.text, opacity: 0.7, background: "none", border: "none", cursor: "pointer", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", transition: "all 0.2s", fontFamily: mono }}
              onMouseEnter={e => { e.currentTarget.style.color = ct.primary; e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={e => { e.currentTarget.style.color = ct.text; e.currentTarget.style.opacity = "0.7"; }}
            >{s}</button>
          ))}
          <div style={{ display: "flex", gap: "4px", marginLeft: "8px" }}>
            {["cyber", "matrix", "hacker"].map((t) => (
              <button key={t} onClick={() => setTheme(t)} style={{
                padding: "4px 10px",
                backgroundColor: theme === t ? ct.primary : "transparent",
                color: theme === t ? ct.bg : ct.text,
                border: "1px solid " + ct.primary, borderRadius: "4px",
                cursor: "pointer", fontSize: "10px", fontWeight: "bold",
                textTransform: "uppercase", fontFamily: mono, transition: "all 0.3s",
              }}>{t}</button>
            ))}
          </div>
          <button onClick={() => setShowTerminal(!showTerminal)} style={{
            padding: "6px 14px", backgroundColor: ct.primary, color: ct.bg, border: "none",
            borderRadius: "4px", cursor: "pointer", fontWeight: "bold", display: "flex",
            alignItems: "center", gap: "5px", fontFamily: mono, fontSize: "11px", transition: "all 0.3s",
          }}>
            <TerminalIcon size={13} /> TERMINAL
          </button>
        </nav>
      </div>
    </header>
  );
}
