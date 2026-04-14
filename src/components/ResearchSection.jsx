import { Brain, Code } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function ResearchSection({ ct, mono }) {
  return (
    <section id="research" style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <SectionTitle icon={<Brain size={24} />} text="RESEARCH — LLM-IN-THE-MIDDLE" ct={ct} mono={mono} />
        <div style={{
          border: "2px solid " + ct.accent + "55", borderRadius: "14px", padding: "36px",
          backgroundColor: ct.accent + "08", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, right: 0, padding: "6px 16px", backgroundColor: ct.accent, color: "#fff", fontSize: "11px", fontWeight: "bold", borderRadius: "0 12px 0 12px" }}>
            CC BY-NC-SA 4.0
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ fontSize: "48px" }}>🧠</div>
            <div style={{ flex: 1, minWidth: "260px" }}>
              <h4 style={{ fontSize: "22px", fontWeight: "bold", color: ct.accent, marginBottom: "8px" }}>
                LLM-in-the-Middle (LitM)
              </h4>
              <p style={{ fontSize: "13px", color: ct.text, opacity: 0.7, marginBottom: "4px" }}>
                Research paper indépendant · 2025–2026 · Publié sur GitHub (KeizerSec)
              </p>
              <div style={{ width: "60px", height: "2px", backgroundColor: ct.accent, marginBottom: "16px" }} />
              <p style={{ fontSize: "14px", color: ct.text, lineHeight: 1.7, marginBottom: "20px" }}>
                Recherche indépendante sur les <strong style={{ color: ct.accent }}>limites de l'alignement sémantique des LLMs</strong> face aux architectures multi-modèles. Modélisation théorique du <em>scaffolding cognitif distribué</em> et de la <em>Zone Proximale de Développement Distribuée (ZPD-D)</em>.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "24px" }}>
                {[
                  { label: "Sujet principal",  value: "Alignement LLM multi-modèles" },
                  { label: "Modèle théorique", value: "Scaffolding cognitif distribué" },
                  { label: "Concept clé",      value: "Zone Proximale Distribuée (ZPD-D)" },
                  { label: "Application",      value: "Vecteurs d'attaque architectures LLM" },
                ].map((item, i) => (
                  <div key={i} style={{ padding: "10px 14px", backgroundColor: ct.bg + "aa", border: "1px solid " + ct.accent + "22", borderRadius: "8px" }}>
                    <div style={{ fontSize: "10px", color: ct.accent, opacity: 0.7, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>{item.label}</div>
                    <div style={{ fontSize: "12px", color: ct.text }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a href="https://github.com/KeizerSec/LitM-Whitepaper" target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 18px",
                  backgroundColor: ct.accent, color: "#fff", borderRadius: "6px", textDecoration: "none",
                  fontWeight: "bold", fontSize: "12px", transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px " + ct.accent + "55"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <Code size={15} /> Voir sur GitHub
                </a>
                {["Prompt Injection", "LLM Security", "AI Alignment", "Multi-model", "ZPD-D"].map(t => (
                  <span key={t} style={{ padding: "8px 12px", border: "1px solid " + ct.accent + "44", borderRadius: "6px", fontSize: "11px", color: ct.accent, backgroundColor: ct.accent + "11" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
