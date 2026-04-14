import { Award } from "lucide-react";
import { achievements } from "../data/achievements";
import SectionTitle from "./SectionTitle";

export default function AchievementsSection({ ct, mono }) {
  return (
    <section style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <SectionTitle icon={<Award size={24} />} text="ACHIEVEMENTS" ct={ct} mono={mono} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          {achievements.map((a, idx) => (
            <div key={idx} style={{
              padding: "24px", backgroundColor: ct.bg + "ee",
              border: "2px solid " + ct.primary + "22", borderRadius: "10px",
              textAlign: "center", transition: "all 0.3s", cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ct.primary; e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 20px " + ct.primary + "33"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ct.primary + "22"; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: "36px", marginBottom: "10px" }}>{a.icon}</div>
              <h4 style={{ fontSize: "14px", fontWeight: "bold", color: ct.primary, marginBottom: "6px" }}>{a.title}</h4>
              <p style={{ fontSize: "11px", color: ct.text, opacity: 0.7 }}>{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
