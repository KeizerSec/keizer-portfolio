import { Code, Target, Award, Zap } from "lucide-react";
import { statsData, certifications } from "../data/certifications";

export default function HeroSection({ ct }) {
  return (
    <>
      <section id="about" style={{ padding: "80px 20px 60px", textAlign: "center", animation: "fadeUp 0.5s ease-out" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 16px",
            backgroundColor: ct.primary + "15", border: "1px solid " + ct.primary + "44",
            borderRadius: "20px", marginBottom: "20px", fontSize: "11px", color: ct.primary, fontWeight: "bold",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: ct.primary, display: "inline-block", animation: "pulse 2s infinite" }} />
            OPEN TO WORK — SOC Analyst / Threat Intelligence Junior
          </div>

          <h1 style={{ fontSize: "clamp(36px, 9vw, 68px)", fontWeight: "bold", marginBottom: "14px", lineHeight: 1.1 }}>
            <span style={{ color: ct.primary }}>KEIZER</span>
            <span style={{ color: ct.accent }}>SEC</span>
          </h1>
          <p style={{ fontSize: "clamp(12px, 1.8vw, 15px)", color: ct.secondary, marginBottom: "10px", letterSpacing: "1px" }}>
            SOC Analyst · Threat Intelligence · LLM Security Research
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "44px", flexWrap: "wrap" }}>
            {[
              { label: "[0xD][LEGEND]",          color: ct.primary },
              { label: "Top 2% TryHackMe",       color: "#ffd700" },
              { label: "Professional",            color: ct.secondary },
              { label: "CC BY-NC-SA 4.0 — LitM Author", color: ct.accent },
            ].map((badge, i) => (
              <span key={i} style={{ padding: "4px 12px", border: "1px solid " + badge.color + "66", borderRadius: "12px", fontSize: "11px", color: badge.color, backgroundColor: badge.color + "11" }}>
                {badge.label}
              </span>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: "14px" }}>
            {[
              { label: "GitHub Repos",   value: statsData.repos,        icon: <Code size={20} />,   sub: "KeizerSec" },
              { label: "THM Rooms",      value: statsData.rooms,        icon: <Target size={20} />, sub: "Completed" },
              { label: "Badges THM",     value: statsData.badges,       icon: <Award size={20} />,  sub: "Earned" },
              { label: "Hours Practice", value: statsData.hours + "+",  icon: <Zap size={20} />,    sub: "TryHackMe" },
            ].map((stat, idx) => (
              <div key={idx} style={{
                padding: "20px 14px", backgroundColor: ct.bg + "dd",
                border: "2px solid " + ct.primary + "22", borderRadius: "10px",
                transition: "all 0.3s", cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ct.primary; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px " + ct.primary + "33"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ct.primary + "22"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ color: ct.primary, marginBottom: "6px" }}>{stat.icon}</div>
                <div style={{ fontSize: "28px", fontWeight: "bold", color: ct.primary, marginBottom: "2px" }}>{stat.value}</div>
                <div style={{ fontSize: "11px", color: ct.text, opacity: 0.7, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>{stat.label}</div>
                <div style={{ fontSize: "10px", color: ct.secondary, opacity: 0.6 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "20px 20px 40px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            {certifications.map((cert, i) => (
              <div key={i} style={{
                padding: "14px 20px", backgroundColor: ct.bg + "ee",
                border: "2px solid " + cert.color + "44", borderRadius: "10px",
                display: "flex", alignItems: "center", gap: "10px", transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = cert.color; e.currentTarget.style.boxShadow = "0 4px 16px " + cert.color + "33"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = cert.color + "44"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <span style={{ fontSize: "20px" }}>{cert.icon}</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: cert.color }}>{cert.name}</div>
                  <div style={{ fontSize: "10px", color: ct.text, opacity: 0.6 }}>{cert.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
