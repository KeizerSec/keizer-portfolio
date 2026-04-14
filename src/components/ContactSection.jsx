import { Mail, Code, Shield, Briefcase } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function ContactSection({ ct, mono }) {
  return (
    <section id="contact" style={{ padding: "60px 20px", backgroundColor: ct.primary + "06" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
        <SectionTitle icon={<Mail size={24} />} text="CONTACT" ct={ct} mono={mono} />
        <p style={{ fontSize: "14px", color: ct.text, opacity: 0.7, marginBottom: "12px" }}>
          Intéressé par un poste SOC / Threat Intelligence ? Disponible sous 2 mois.
        </p>
        <a href="mailto:keizer.cybersec@protonmail.com" style={{
          display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px",
          backgroundColor: ct.primary + "15", border: "2px solid " + ct.primary, borderRadius: "8px",
          color: ct.primary, textDecoration: "none", fontWeight: "bold", fontSize: "14px",
          marginBottom: "36px", transition: "all 0.3s",
        }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = ct.primary; e.currentTarget.style.color = ct.bg; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = ct.primary + "15"; e.currentTarget.style.color = ct.primary; }}
        >
          <Mail size={16} /> keizer.cybersec@protonmail.com
        </a>

        <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "36px" }}>
          {[
            { icon: <Code size={20} />,     name: "GitHub",    url: "https://github.com/KeizerSec",                     sub: "KeizerSec" },
            { icon: <Shield size={20} />,   name: "TryHackMe", url: "https://tryhackme.com/p/Keizer",                   sub: "Top 2% LEGEND" },
            { icon: <Briefcase size={20} />, name: "LinkedIn", url: "https://www.linkedin.com/in/kacime-benkhelifa",    sub: "Kacime Benkhelifa" },
          ].map((s, idx) => (
            <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
              padding: "18px 16px", backgroundColor: ct.bg + "ee",
              border: "2px solid " + ct.primary + "22", borderRadius: "10px",
              textDecoration: "none", color: ct.text, transition: "all 0.3s", minWidth: "110px",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ct.primary; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 6px 20px " + ct.primary + "33"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ct.primary + "22"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ color: ct.primary }}>{s.icon}</div>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>{s.name}</span>
              <span style={{ fontSize: "10px", opacity: 0.55 }}>{s.sub}</span>
            </a>
          ))}
        </div>

        <a href="https://github.com/KeizerSec" target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px",
          backgroundColor: ct.primary, color: ct.bg, border: "none", borderRadius: "8px",
          fontSize: "14px", fontWeight: "bold", textDecoration: "none", transition: "all 0.3s",
          boxShadow: "0 0 18px " + ct.primary + "44", fontFamily: mono,
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 32px " + ct.primary; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 18px " + ct.primary + "44"; }}
        >
          <Code size={18} /> Voir tous les projets sur GitHub
        </a>
      </div>
    </section>
  );
}
