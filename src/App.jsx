import { useState, useEffect, useRef } from "react";
import { themes } from "./data/themes";
import Header from "./components/Header";
import Terminal from "./components/Terminal";
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import ResearchSection from "./components/ResearchSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import WriteupsSection from "./components/WriteupsSection";
import AchievementsSection from "./components/AchievementsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ScrollProgressBar from "./components/ScrollProgressBar";
import BackToTop from "./components/BackToTop";
import CustomCursor from "./components/CustomCursor";
import SplashScreen from "./components/SplashScreen";

const MONO = "'Courier New', 'Lucida Console', monospace";

function RevealSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function KeizerPortfolio() {
  const [theme, setTheme] = useState(() => localStorage.getItem("ks-theme") || "cyber");
  const [splash, setSplash] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);

  const canvasRef = useRef(null);
  const konamiRef = useRef([]);
  const matrixRef = useRef(false);

  const ct = themes[theme];

  const handleSetTheme = (t) => {
    setTheme(t);
    localStorage.setItem("ks-theme", t);
  };

  useEffect(() => { matrixRef.current = matrixMode; }, [matrixMode]);

  // Matrix rain
  useEffect(() => {
    if (!matrixMode || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = theme === "matrix" ? "#00ff41" : "#00ff9d";
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 33);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, [matrixMode, theme]);

  // Konami code
  useEffect(() => {
    const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    const onKey = (e) => {
      konamiRef.current = [...konamiRef.current, e.key].slice(-code.length);
      if (konamiRef.current.length === code.length && konamiRef.current.every((k, i) => k === code[i])) {
        setEasterEgg(true);
        setTimeout(() => setEasterEgg(false), 3000);
        konamiRef.current = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: ct.bg, color: ct.text, fontFamily: MONO, position: "relative", overflowX: "hidden" }}>
      {splash && <SplashScreen ct={ct} mono={MONO} onDone={() => setSplash(false)} />}
      <CustomCursor ct={ct} />
      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateX(100px); } to { opacity:1; transform:translateX(0); } }
        @keyframes glitch {
          0%  { transform:translate(0); text-shadow: 2px 0 ${ct.primary}, -2px 0 ${ct.accent}; }
          20% { transform:translate(-2px,2px); text-shadow: -2px 0 ${ct.primary}, 2px 0 ${ct.accent}; }
          40% { transform:translate(-2px,-2px); }
          60% { transform:translate(2px,2px); text-shadow: 2px 0 ${ct.accent}, -2px 0 ${ct.primary}; }
          80% { transform:translate(2px,-2px); }
          100%{ transform:translate(0); text-shadow: 2px 0 ${ct.primary}, -2px 0 ${ct.accent}; }
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes scanline { 0%{background-position:0 -100%} 100%{background-position:0 100%} }
        *{margin:0;padding:0;box-sizing:border-box}
        @media (pointer: fine){*{cursor:none !important}}
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#111} ::-webkit-scrollbar-thumb{background:${ct.primary}}
      `}</style>

      <ScrollProgressBar ct={ct} />
      <BackToTop ct={ct} />

      {matrixMode && (
        <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.25, pointerEvents: "none" }} />
      )}

      {easterEgg && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.92)", animation: "glitch 0.3s infinite" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: ct.primary, marginBottom: "12px" }}>KONAMI CODE!</div>
            <div style={{ fontSize: "24px", color: ct.secondary }}>You are a true hacker!</div>
          </div>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        <Header
          ct={ct} mono={MONO}
          theme={theme} setTheme={handleSetTheme}
          showTerminal={showTerminal} setShowTerminal={setShowTerminal}
        />

        {showTerminal && (
          <Terminal
            ct={ct} mono={MONO}
            matrixRef={matrixRef}
            setMatrixMode={setMatrixMode}
            setEasterEgg={setEasterEgg}
            onClose={() => setShowTerminal(false)}
          />
        )}

        <HeroSection ct={ct} />
        <RevealSection><SkillsSection ct={ct} mono={MONO} /></RevealSection>
        <RevealSection delay={50}><ResearchSection ct={ct} mono={MONO} /></RevealSection>
        <RevealSection delay={50}><ExperienceSection ct={ct} mono={MONO} /></RevealSection>
        <RevealSection delay={50}><ProjectsSection ct={ct} mono={MONO} /></RevealSection>
        <RevealSection delay={50}><WriteupsSection ct={ct} mono={MONO} /></RevealSection>
        <RevealSection delay={50}><AchievementsSection ct={ct} mono={MONO} /></RevealSection>
        <RevealSection delay={50}><ContactSection ct={ct} mono={MONO} /></RevealSection>
        <Footer ct={ct} />
      </div>
    </div>
  );
}
