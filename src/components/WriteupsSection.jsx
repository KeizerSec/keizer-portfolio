import { useState } from "react";
import { BookOpen, Calendar, Search, ExternalLink, Lock } from "lucide-react";
import { writeups } from "../data/writeups";
import SectionTitle from "./SectionTitle";

const diffColor = (d) => d === "hard" ? "#ff0055" : d === "medium" ? "#ff9500" : "#00ff9d";

export default function WriteupsSection({ ct, mono }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(writeups.map((w) => w.category))];

  const filtered = writeups.filter((w) => {
    const matchSearch =
      w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchSearch && (selectedCategory === "all" || w.category === selectedCategory);
  });

  return (
    <section id="writeups" style={{ padding: "60px 20px", backgroundColor: ct.primary + "06" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionTitle icon={<BookOpen size={24} />} text="WRITE-UPS & LAB RESEARCH" ct={ct} mono={mono} />
        <p style={{ textAlign: "center", fontSize: "13px", color: ct.text, opacity: 0.65, marginBottom: "36px" }}>
          Documentation de mes recherches, CTF TryHackMe, et expérimentations en lab personnel
        </p>

        <div style={{ display: "flex", gap: "14px", marginBottom: "28px", flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ position: "relative", flex: "1 1 260px", maxWidth: "400px" }}>
            <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: ct.primary, pointerEvents: "none" }} size={15} />
            <input
              type="text" placeholder="Rechercher..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%", padding: "10px 10px 10px 36px", backgroundColor: ct.bg + "ee", border: "2px solid " + ct.primary + "30", borderRadius: "6px", color: ct.text, fontSize: "13px", outline: "none", fontFamily: mono, transition: "border-color 0.3s" }}
              onFocus={e => e.currentTarget.style.borderColor = ct.primary}
              onBlur={e => e.currentTarget.style.borderColor = ct.primary + "30"}
            />
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
                padding: "9px 16px",
                backgroundColor: selectedCategory === cat ? ct.primary : "transparent",
                color: selectedCategory === cat ? ct.bg : ct.text,
                border: "2px solid " + ct.primary, borderRadius: "6px",
                cursor: "pointer", fontSize: "10px", fontWeight: "bold",
                textTransform: "uppercase", fontFamily: mono, transition: "all 0.3s",
              }}>{cat}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {filtered.map((wu) => (
            <div key={wu.id} style={{
              backgroundColor: ct.bg + "ee", border: "2px solid " + ct.primary + "22",
              borderRadius: "10px", padding: "22px", transition: "all 0.3s", cursor: "pointer", position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ct.primary; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 10px 28px " + ct.primary + "33"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ct.primary + "22"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ position: "absolute", top: "12px", right: "12px", padding: "3px 9px", backgroundColor: diffColor(wu.difficulty), color: "#000", borderRadius: "4px", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" }}>
                {wu.difficulty}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px", color: ct.primary, fontSize: "11px" }}>
                <Calendar size={12} /> <span>{wu.date}</span>
                <span style={{ marginLeft: "auto", fontSize: "11px", opacity: 0.6 }}>{wu.views} views</span>
              </div>
              <h4 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: ct.primary, lineHeight: 1.3, paddingRight: "55px" }}>{wu.title}</h4>
              <p style={{ fontSize: "12px", color: ct.text, opacity: 0.7, marginBottom: "14px", lineHeight: 1.6 }}>{wu.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
                {wu.tags.map(tag => (
                  <span key={tag} style={{ padding: "2px 7px", backgroundColor: ct.secondary + "18", color: ct.secondary, border: "1px solid " + ct.secondary + "33", borderRadius: "3px", fontSize: "10px" }}>#{tag}</span>
                ))}
              </div>
              {wu.link ? (
                <a href={wu.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: ct.primary, textDecoration: "none", fontWeight: "bold", fontSize: "12px" }}>
                  <ExternalLink size={12} /> Voir le write-up
                </a>
              ) : (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 10px", border: "1px solid " + ct.secondary + "55", borderRadius: "4px", color: ct.secondary, fontSize: "11px", fontWeight: "bold", animation: "pulse 2.5s infinite" }}>
                  <Lock size={11} /> En préparation
                </span>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "44px 20px", color: ct.text, opacity: 0.45 }}>
            <Search size={36} style={{ marginBottom: "14px", opacity: 0.4 }} />
            <p style={{ fontSize: "15px" }}>Aucun write-up trouvé</p>
          </div>
        )}
      </div>
    </section>
  );
}
