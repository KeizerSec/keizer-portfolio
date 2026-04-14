import { Code, ExternalLink } from "lucide-react";
import { projects } from "../data/projects";
import SectionTitle from "./SectionTitle";

export default function ProjectsSection({ ct, mono }) {
  return (
    <section id="projects" style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionTitle icon={<Code size={24} />} text="PROJETS GITHUB" ct={ct} mono={mono} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {projects.map((proj) => (
            <div key={proj.id} style={{
              backgroundColor: ct.bg + "ee", border: "2px solid " + ct.primary + "22",
              borderRadius: "12px", padding: "24px", transition: "all 0.3s", display: "flex", flexDirection: "column",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ct.primary; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 12px 32px " + ct.primary + "22"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ct.primary + "22"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <span style={{ fontSize: "28px" }}>{proj.icon}</span>
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: "bold", color: ct.primary }}>{proj.name}</h4>
                  <span style={{ fontSize: "10px", color: ct.secondary, opacity: 0.8 }}>{proj.lang}</span>
                </div>
              </div>
              <p style={{ fontSize: "12px", color: ct.text, opacity: 0.75, lineHeight: 1.6, marginBottom: "14px", flex: 1 }}>{proj.description}</p>
              <ul style={{ marginBottom: "14px", listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
                {proj.features.map((f, i) => (
                  <li key={i} style={{ fontSize: "11px", color: ct.text, opacity: 0.65, display: "flex", gap: "6px" }}>
                    <span style={{ color: ct.primary }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
                {proj.tags.map(t => (
                  <span key={t} style={{ padding: "2px 7px", backgroundColor: ct.secondary + "15", color: ct.secondary, border: "1px solid " + ct.secondary + "30", borderRadius: "3px", fontSize: "10px" }}>#{t}</span>
                ))}
              </div>
              <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: ct.primary, textDecoration: "none", fontSize: "12px", fontWeight: "bold" }}>
                <Code size={13} /> Voir le repo <ExternalLink size={11} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
