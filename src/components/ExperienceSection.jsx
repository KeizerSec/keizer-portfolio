import { Briefcase } from "lucide-react";
import SectionTitle from "./SectionTitle";

const experiences = [
  {
    role: "Technicien Support IT",
    company: "SPIE ICS — Bron",
    period: "Mars 2023 — Présent",
    points: [
      "Administration Active Directory (250+ utilisateurs) : comptes, groupes, droits d'accès",
      "Support Office 365, Azure AD, VPN — incidents niveau N1 sous SLA",
      "Documentation technique et coordination avec les équipes infrastructure",
      "En parallèle : 1000h+ de formation cybersécurité (CTF, recherche, veille CTI)",
    ],
  },
  {
    role: "Manager d'équipe",
    company: "McDonald's Lyon",
    period: "2016 — 2022",
    points: [
      "Management d'équipes de 15 à 20 personnes en environnement haute pression",
      "Gestion de crise opérationnelle, observation comportementale, prise de décision rapide",
      "Compétences transférables : analyse comportementale, communication sous pression, leadership",
    ],
  },
];

export default function ExperienceSection({ ct, mono }) {
  const colors = [ct.primary, ct.secondary];
  return (
    <section style={{ padding: "60px 20px", backgroundColor: ct.primary + "05" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <SectionTitle icon={<Briefcase size={24} />} text="EXPÉRIENCE" ct={ct} mono={mono} />
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {experiences.map((exp, i) => {
            const color = colors[i];
            return (
              <div key={i} style={{
                padding: "26px", backgroundColor: ct.bg + "ee",
                border: "2px solid " + color + "22", borderRadius: "12px",
                transition: "all 0.3s", borderLeft: "4px solid " + color,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = "0 6px 24px " + color + "22"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = color + "22"; e.currentTarget.style.borderLeftColor = color; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
                  <div>
                    <h4 style={{ fontSize: "17px", fontWeight: "bold", color, marginBottom: "3px" }}>{exp.role}</h4>
                    <p style={{ fontSize: "13px", color: ct.text, opacity: 0.8 }}>{exp.company}</p>
                  </div>
                  <span style={{ padding: "4px 12px", border: "1px solid " + color + "44", borderRadius: "8px", fontSize: "11px", color, height: "fit-content" }}>
                    {exp.period}
                  </span>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                  {exp.points.map((p, j) => (
                    <li key={j} style={{ display: "flex", gap: "8px", fontSize: "13px", color: ct.text, opacity: 0.8 }}>
                      <span style={{ color, marginTop: "2px", flexShrink: 0 }}>›</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
