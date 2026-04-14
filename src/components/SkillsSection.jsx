import { useEffect, useRef, useState } from "react";
import { Cpu } from "lucide-react";
import { skills } from "../data/skills";
import SectionTitle from "./SectionTitle";

export default function SkillsSection({ ct, mono }) {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimated(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} style={{ padding: "60px 20px", backgroundColor: ct.primary + "08" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <SectionTitle icon={<Cpu size={24} />} text="ARSENAL TECHNIQUE" ct={ct} mono={mono} />
        {Object.entries(skills).map(([category, list]) => (
          <div key={category} style={{ marginBottom: "40px" }}>
            <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "18px", color: ct.secondary, textTransform: "uppercase", letterSpacing: "2px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "4px", height: "16px", backgroundColor: ct.secondary, display: "inline-block", borderRadius: "2px" }} />
              {category}
            </h4>
            <div style={{ display: "grid", gap: "12px" }}>
              {list.map((skill, idx) => (
                <div key={skill.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <span style={{ fontSize: "13px", fontWeight: "600" }}>{skill.name}</span>
                    <span style={{ color: ct.primary, fontWeight: "bold", fontSize: "12px" }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: "8px", backgroundColor: ct.primary + "15", borderRadius: "5px", overflow: "hidden", border: "1px solid " + ct.primary + "25" }}>
                    <div style={{
                      height: "100%", borderRadius: "5px", backgroundColor: ct.primary,
                      boxShadow: "0 0 10px " + ct.primary + "66",
                      width: animated ? skill.level + "%" : "0%",
                      transition: "width 1s ease-out " + (idx * 0.08) + "s",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
