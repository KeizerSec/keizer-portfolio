import { useState, useEffect, useRef } from "react";
import {
   Shield, Monitor,
  ChevronRight, Award, Calendar, BookOpen,
  Mail, Zap, Cpu, Target, Search, X, Briefcase,
  FileText, ExternalLink, Terminal as TerminalIcon,
  Lock, Eye, Brain, Code, Server, AlertTriangle
} from "lucide-react";

const themes = {
  cyber: { bg: "#0a0e27", primary: "#00ff9d", secondary: "#00d4ff", accent: "#ff006e", text: "#e0e0e0" },
  matrix: { bg: "#000000", primary: "#00ff41", secondary: "#008f11", accent: "#00ff41", text: "#00ff41" },
  hacker: { bg: "#0d1117", primary: "#58a6ff", secondary: "#1f6feb", accent: "#f85149", text: "#c9d1d9" },
};

const skills = {
  "SOC & Détection": [
    { name: "Analyse logs Windows / Active Directory", level: 88 },
    { name: "Wireshark / PCAP Analysis", level: 82 },
    { name: "MITRE ATT&CK Framework", level: 85 },
    { name: "Triage alertes SIEM", level: 78 },
    { name: "Investigation forensic", level: 75 },
  ],
  "Threat Intelligence": [
    { name: "Veille scène underground (forums, Telegram)", level: 85 },
    { name: "OSINT & monitoring sources CTI", level: 80 },
    { name: "Analyse TTPs & threat actors", level: 82 },
    { name: "Suivi ransomware & post-compromission", level: 78 },
  ],
  "Sécurité IA / LLM": [
    { name: "Prompt Injection & alignement LLM", level: 88 },
    { name: "Architectures multi-modèles (LitM/LLM-in-the-Middle)", level: 90 },
    { name: "Recherche indépendante AI Security", level: 85 },
  ],
  "Tests de sécurité": [
    { name: "Burp Suite / Web Security", level: 82 },
    { name: "Metasploit / Exploitation", level: 80 },
    { name: "Active Directory Attack (Kerberoasting, DCSync)", level: 84 },
    { name: "Analyse post-compromission / EDR", level: 76 },
  ],
  "Infrastructure & Dev": [
    { name: "Active Directory (250+ utilisateurs)", level: 88 },
    { name: "Python (sécurité, log parsing, AST)", level: 85 },
    { name: "Azure AD / O365 / VPN", level: 80 },
    { name: "Bash & PowerShell", level: 78 },
  ],
};

const projects = [
  {
    id: 1,
    name: "LitM-Whitepaper",
    icon: "🧠",
    description: "Research paper sur les limites de l'alignement sémantique des LLMs face aux architectures multi-modèles distribuées. Ancré dans les sciences cognitives (Vygotsky, Bartlett, Sweller, Reber).",
    tags: ["AI Safety", "LLM Security", "Alignment", "Cognitive Science", "Research"],
    lang: "Markdown",
    url: "https://github.com/KeizerSec/LitM-Whitepaper",
    features: ["Formalisation du concept LLM-in-the-Middle", "Zone Proximale de Développement Distribuée (ZPD-D)", "Scaffolding cognitif distribué", "Licence CC BY-NC-SA 4.0"],
  },
  {
    id: 2,
    name: "Research-Exploratory",
    icon: "🔬",
    description: "Recherche exploratoire en cybersécurité et sécurité de l'IA. Notes, analyses et expérimentations dans un cadre éducatif.",
    tags: ["Research", "AI Security", "Cybersecurity", "Exploratory"],
    lang: "Markdown",
    url: "https://github.com/KeizerSec/Research-Exploratory",
    features: ["Recherche exploratoire", "Sécurité IA", "Analyses théoriques", "Documentation"],
  },
  {
    id: 3,
    name: "scan-vuln-ultime-pro",
    icon: "🔐",
    description: "Scanner de vulnérabilités automatisé avec interface web Flask, cache LRU, rate-limiting et export HTML stylisé. Containerisé Docker.",
    tags: ["Python", "Flask", "Docker", "Nmap", "REST API"],
    lang: "Python",
    url: "https://github.com/KeizerSec/scan-vuln-ultime-pro",
    features: ["Export HTML avec CSS élégant", "Cache LRU anti-rescan", "Rate limiting 5 scans/min/IP", "API REST JSON"],
  },
  {
    id: 4,
    name: "Offensive-Research",
    icon: "🧬",
    description: "Notes avancées sur la recherche offensive : analyse mémoire, syscalls, hooking, création de payloads. Cadre purement éducatif et éthique.",
    tags: ["C/C++", "Assembly", "Syscalls", "Hooking", "Memory"],
    lang: "Markdown",
    url: "https://github.com/KeizerSec/Offensive-Research",
    features: ["Low-level notes syscall/hooking", "Analyse mémoire", "Payloads éducatifs", "Windows internals"],
  },
  {
    id: 5,
    name: "Cybersec-Lab",
    icon: "🧠",
    description: "Scripts et write-ups documentant ma progression en cybersécurité : TryHackMe rooms (EternalBlue, Samba, Sudo escalation), log parser Python, reverse shell cheatsheet.",
    tags: ["Python", "Shell", "TryHackMe", "Write-ups", "Nmap"],
    lang: "Python / Shell",
    url: "https://github.com/KeizerSec/Cybersec-Lab",
    features: ["Write-ups TryHackMe (Kenobi, Blue, RootMe)", "log_parser.py - détection SSH", "Reverse shell cheatsheet", "Nmap scan templates"],
  },
  {
    id: 6,
    name: "keizer-portfolio",
    icon: "⚡",
    description: "Ce portfolio cybersécurité en React — terminal interactif, thèmes cyber/matrix/hacker, mode matrix canvas, easter eggs. Publié sous KeizerSec.",
    tags: ["React", "JavaScript", "CSS", "Terminal"],
    lang: "JavaScript",
    url: "https://github.com/KeizerSec",
    features: ["Terminal interactif", "3 thèmes (cyber/matrix/hacker)", "Canvas matrix rain", "Easter eggs Konami"],
  },
];

const writeups = [
  {
    id: 1,
    title: "EternalBlue — MS17-010 (Blue)",
    category: "network",
    difficulty: "medium",
    date: "2024-10",
    description: "Exploitation de la vulnérabilité EternalBlue sur Windows (MS17-010) via Metasploit — scan Nmap, identification du service, RCE et post-exploitation.",
    tags: ["Windows", "SMB", "Metasploit", "RCE"],
    link: "https://github.com/KeizerSec/Cybersec-Lab/blob/main/blue.md",
    views: 892,
  },
  {
    id: 2,
    title: "Kenobi — Samba + Path Variable Injection",
    category: "linux",
    difficulty: "medium",
    date: "2024-10",
    description: "Exploitation d'une machine Linux via ProFTPD + Samba (NFS), accès fichier SSH, puis escalade de privilèges par manipulation de la variable PATH.",
    tags: ["Linux", "Samba", "FTP", "PrivEsc"],
    link: "https://github.com/KeizerSec/Cybersec-Lab/blob/main/kenobi.md",
    views: 743,
  },
  {
    id: 3,
    title: "Vulnversity — File Upload + Reverse Shell",
    category: "web",
    difficulty: "easy",
    date: "2024-09",
    description: "Reconnaissance Nmap, enumération web avec gobuster, exploitation upload bypass (extension .phtml), reverse shell Netcat puis sudo escalation.",
    tags: ["Web", "Upload", "Reverse Shell", "sudo"],
    link: "https://github.com/KeizerSec/Cybersec-Lab/blob/main/vulnversity.md",
    views: 612,
  },
  {
    id: 4,
    title: "RootMe — Web Injection + sudo Root",
    category: "web",
    difficulty: "easy",
    date: "2024-09",
    description: "Injection web, upload de reverse shell PHP, stabilisation du shell puis escalade sudo vers root via binaire SUID.",
    tags: ["Web", "PHP", "SUID", "Root"],
    link: "https://github.com/KeizerSec/Cybersec-Lab/blob/main/rootme.md",
    views: 534,
  },
  {
    id: 5,
    title: "Active Directory Lab — Kerberoasting & DCSync",
    category: "network",
    difficulty: "hard",
    date: "2025-02",
    description: "Lab personnel : simulation de scénarios de compromission AD en environnement virtualisé — Kerberoasting, DCSync, analyse Event IDs critiques, mapping MITRE ATT&CK.",
    tags: ["Active Directory", "Kerberos", "DCSync", "MITRE"],
    link: "#",
    views: 1204,
  },
  {
    id: 6,
    title: "Kernel Rootkit Analysis — TryHackMe Advanced",
    category: "reversing",
    difficulty: "hard",
    date: "2025-04",
    description: "Analyse de rootkit kernel via CTF TryHackMe avancé — techniques de persistence, hooking syscall, détection et analyse comportementale.",
    tags: ["Kernel", "Rootkit", "Hooking", "Linux"],
    link: "#",
    views: 1567,
  },
  {
    id: 7,
    title: "Next.js RCE — CVE-2025-55182",
    category: "web",
    difficulty: "hard",
    date: "2025-06",
    description: "Exploitation de la CVE-2025-55182 sur Next.js — analyse de la chaîne d'attaque, conditions de reproduction et recommandations de remédiation.",
    tags: ["Next.js", "RCE", "CVE-2025", "Web"],
    link: "#",
    views: 2341,
  },
  {
    id: 8,
    title: "Prompt Injection LLM — CTF",
    category: "ai-security",
    difficulty: "medium",
    date: "2025-03",
    description: "CTF sur l'injection de prompts LLM — bypass de garde-fous, escalade de contexte, exfiltration d'instructions système via architectures multi-modèles.",
    tags: ["LLM", "Prompt Injection", "AI Security", "CTF"],
    link: "#",
    views: 1893,
  },
];

const achievements = [
  { icon: "🏆", title: "Top 2% TryHackMe", description: "Rang #27960 mondial — niveau [0xD][LEGEND]" },
  { icon: "🎯", title: "178 Rooms complétées", description: "1000h+ de pratique active sur TryHackMe" },
  { icon: "🏅", title: "28 Badges TryHackMe", description: "SOC Level 1 · Offensive Pentesting · et plus" },
  { icon: "🧠", title: "Research Paper LitM", description: "Auteur indépendant — LLM-in-the-Middle (2025–2026)" },
  { icon: "🔬", title: "Lab AD Personnel", description: "Simulation attaques AD, ransomware, mapping ATT&CK" },
  { icon: "📡", title: "Veille CTI Active", description: "Forums underground, Telegram, OSINT continu" },
];

const certifications = [
  { name: "SOC Level 1", issuer: "TryHackMe", color: "#00ff9d", icon: "🛡️" },
  { name: "Offensive Pentesting", issuer: "TryHackMe", color: "#00d4ff", icon: "⚔️" },
  { name: "Pre-Security", issuer: "TryHackMe", color: "#ff9500", icon: "🔐" },
];

const statsData = { repos: 6, rooms: 178, badges: 28, hours: 1000 };

export default function KeizerPortfolio() {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "output", text: "KeizerSec Terminal v3.0.0 — SOC / CTI Edition" },
    { type: "output", text: 'Type "help" for available commands' },
    { type: "prompt", text: "root@keizersec:~$" },
  ]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [theme, setTheme] = useState("cyber");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [easterEgg, setEasterEgg] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState(false);
  const [activeTab, setActiveTab] = useState("writeups");
  const terminalRef = useRef(null);
  const canvasRef = useRef(null);
  const konamiRef = useRef([]);
  const matrixRef = useRef(false);

  const ct = themes[theme];
  const mono = "'Courier New', 'Lucida Console', monospace";

  useEffect(() => {
    const t = setTimeout(() => setAnimatedSkills(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { matrixRef.current = matrixMode; }, [matrixMode]);

  const handleTerminalCommand = (e) => {
    if (e.key !== "Enter") return;
    const cmd = terminalInput.trim().toLowerCase();
    const hist = [...terminalHistory];
    hist.push({ type: "input", text: "root@keizersec:~$ " + terminalInput });

    const cmds = {
      help: [
        "Available commands:",
        "  about       - Who is KeizerSec",
        "  skills      - Technical skillset",
        "  projects    - GitHub projects",
        "  writeups    - Write-ups & research",
        "  litm        - LLM-in-the-Middle paper",
        "  certs       - Certifications",
        "  contact     - Contact information",
        "  socials     - Social media links",
        "  thm         - TryHackMe stats",
        "  matrix      - Toggle Matrix rain",
        "  clear       - Clear terminal",
        "  hack        - Try to hack the mainframe",
        "  whoami      - Display identity",
      ],
      whoami: [
        "Kacime BENKHELIFA — alias KeizerSec",
        "SOC Analyst / Threat Intelligence Junior",
        "Lyon (69) — Disponible sous 2 mois",
        "keizer.cybersec@protonmail.com",
        "github.com/KeizerSec",
      ],
      about: [
        "KeizerSec — Cybersecurity | SOC & CTI", "",
        "Technicien IT avec spécialisation active en cybersécurité.",
        "Orienté détection et analyse de menaces.",
        "Top 2% mondial TryHackMe — niveau [0xD][LEGEND]",
        "178 rooms | 28 badges | 1000h+ de pratique", "",
        "Auteur d'un research paper sur les limites de l'alignement",
        "des LLMs face aux architectures multi-modèles (LitM).", "",
        "Recherche un premier poste SOC ou Threat Intelligence.",
        "Location: Lyon (69) | Mobilité: Lyon, Paris, Remote",
      ],
      skills: [
        "Technical Skills:", "",
        "  SOC & Détection",
        "  - Logs Windows/AD, Wireshark, MITRE ATT&CK, SIEM", "",
        "  Threat Intelligence",
        "  - Veille underground, OSINT, TTPs, ransomware tracking", "",
        "  Sécurité IA / LLM",
        "  - Prompt injection, alignement, architectures multi-modèles", "",
        "  Tests offensifs",
        "  - Burp Suite, Metasploit, AD (Kerberoasting, DCSync)", "",
        "  Infrastructure & Dev",
        "  - Active Directory 250+ users, Python, Azure AD, PowerShell",
      ],
      projects: [
        "GitHub Projects (github.com/KeizerSec):", "",
        "1. LitM-Whitepaper",
        "   Research paper — LLM-in-the-Middle (CC BY-NC-SA 4.0)",
        "   > github.com/KeizerSec/LitM-Whitepaper", "",
        "2. Research-Exploratory",
        "   Recherche exploratoire cybersécurité & IA",
        "   > github.com/KeizerSec/Research-Exploratory", "",
        "3. scan-vuln-ultime-pro",
        "   Flask scanner + Docker + LRU cache + export HTML",
        "   > github.com/KeizerSec/scan-vuln-ultime-pro", "",
        "4. Offensive-Research",
        "   Syscalls, hooking, memory analysis (éducatif)",
        "   > github.com/KeizerSec/Offensive-Research", "",
        "5. Cybersec-Lab",
        "   Write-ups TryHackMe + scripts Python/Bash",
        "   > github.com/KeizerSec/Cybersec-Lab", "",
        "6. keizer-portfolio",
        "   Ce portfolio (React, terminal interactif)",
        "   > github.com/KeizerSec",
      ],
      litm: [
        "Research Paper: LLM-in-the-Middle (LitM)", "",
        "Auteur: Kacime Benkhelifa (KeizerSec)",
        "Période: 2025-2026 | Licence: CC BY-NC-SA 4.0", "",
        "Sujet:",
        "  Recherche indépendante sur les limites de l'alignement",
        "  sémantique des LLMs face aux architectures multi-modèles.", "",
        "Contributions:",
        "  - Modélisation du scaffolding cognitif distribué",
        "  - Zone Proximale de Développement Distribuée (ZPD-D)",
        "  - Analyse des vecteurs de bypass via orchestration LLM", "",
        "Publié sur GitHub (KeizerSec)",
      ],
      certs: [
        "Certifications & Validations:", "",
        "  [✓] SOC Level 1          — TryHackMe",
        "  [✓] Offensive Pentesting — TryHackMe",
        "  [✓] Pre-Security         — TryHackMe", "",
        "TryHackMe Highlights:",
        "  Rang: #27960 | Top 2% mondial",
        "  Niveau: [0xD][LEGEND]",
        "  Rooms: 178 | Badges: 28",
      ],
      writeups: [
        "Write-ups & Research:", "",
        "- EternalBlue MS17-010 (Blue)           [medium]",
        "- Kenobi — Samba + Path Variable        [medium]",
        "- Vulnversity — File Upload + RShell    [easy]",
        "- RootMe — Web Injection + sudo         [easy]",
        "- AD Lab — Kerberoasting & DCSync       [hard]",
        "- Kernel Rootkit Analysis (THM)         [hard]",
        "- Next.js RCE CVE-2025-55182            [hard]",
        "- Prompt Injection LLM CTF              [medium]",
      ],
      thm: [
        "TryHackMe Statistics:", "",
        "  Username : Keizer",
        "  Rank     : #27960",
        "  Level    : [0xD][LEGEND]",
        "  Top      : 2% mondial",
        "  Rooms    : 178 completed",
        "  Badges   : 28",
        "  Hours    : 1000+", "",
        "Profile: tryhackme.com/p/Keizer",
      ],
      contact: [
        "Contact:", "",
        "Email    : keizer.cybersec@protonmail.com",
        "GitHub   : github.com/KeizerSec",
        "LinkedIn : linkedin.com/in/kacime-benkhelifa",
        "TryHackMe: tryhackme.com/p/Keizer",
      ],
      socials: [
        "Social Media:",
        "> GitHub   : KeizerSec",
        "> LinkedIn : Kacime Benkhelifa",
        "> TryHackMe: Keizer",
      ],
      hack: [
        "Initiating hack sequence...",
        "[====================] 100%", "",
        "Access denied. Nice try!",
        "The mainframe is secure.", "",
        "Tip: Real threat hunters don't hack portfolios.",
        "They monitor, detect and respond. 🛡️",
      ],
    };

    if (cmd === "clear") { setTerminalHistory([{ type: "prompt", text: "root@keizersec:~$" }]); setTerminalInput(""); return; }
    if (cmd === "matrix") { const next = !matrixRef.current; setMatrixMode(next); hist.push({ type: "output", text: "Matrix mode " + (next ? "enabled" : "disabled") }); }
    else if (cmd === "konami") { setEasterEgg(true); setTimeout(() => setEasterEgg(false), 3000); hist.push({ type: "output", text: "KONAMI CODE ACTIVATED!" }); hist.push({ type: "output", text: "You found the easter egg!" }); }
    else if (cmds[cmd]) { cmds[cmd].forEach((l) => hist.push({ type: "output", text: l })); }
    else if (cmd) { hist.push({ type: "error", text: "Command not found: " + cmd + ". Type 'help'." }); }

    hist.push({ type: "prompt", text: "root@keizersec:~$" });
    setTerminalHistory(hist);
    setTerminalInput("");
    setTimeout(() => { if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight; }, 20);
  };

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

  // Konami
  useEffect(() => {
    const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    const onKey = (e) => {
      konamiRef.current = [...konamiRef.current, e.key].slice(-code.length);
      if (konamiRef.current.length === code.length && konamiRef.current.every((k, i) => k === code[i])) {
        setEasterEgg(true); setTimeout(() => setEasterEgg(false), 3000); konamiRef.current = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filteredWriteups = writeups.filter((w) => {
    const s = w.title.toLowerCase().includes(searchTerm.toLowerCase()) || w.description.toLowerCase().includes(searchTerm.toLowerCase()) || w.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return s && (selectedCategory === "all" || w.category === selectedCategory);
  });
  const categories = ["all", ...new Set(writeups.map((w) => w.category))];
  const diffColor = (d) => (d === "hard" ? "#ff0055" : d === "medium" ? "#ff9500" : "#00ff9d");

  const SectionTitle = ({ icon, text }) => (
    <h3 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: "bold", marginBottom: "40px", textAlign: "center", color: ct.primary, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
      {icon} {text}
    </h3>
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: ct.bg, color: ct.text, fontFamily: mono, position: "relative", overflowX: "hidden" }}>
      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateX(100px); } to { opacity:1; transform:translateX(0); } }
        @keyframes glitch { 0%{transform:translate(0)} 20%{transform:translate(-2px,2px)} 40%{transform:translate(-2px,-2px)} 60%{transform:translate(2px,2px)} 80%{transform:translate(2px,-2px)} 100%{transform:translate(0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        *{margin:0;padding:0;box-sizing:border-box}
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#111} ::-webkit-scrollbar-thumb{background:var(--primary,#00ff9d)}
      `}</style>

      {matrixMode && <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.25, pointerEvents: "none" }} />}

      {easterEgg && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.92)", animation: "glitch 0.3s infinite" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: ct.primary, marginBottom: "12px" }}>KONAMI CODE!</div>
            <div style={{ fontSize: "24px", color: ct.secondary }}>You are a true hacker!</div>
          </div>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* === HEADER === */}
        <header style={{ padding: "14px 20px", borderBottom: "2px solid " + ct.primary, backgroundColor: ct.bg + "ee", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(10px)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Shield style={{ width: 22, height: 22, color: ct.primary }} />
              <span style={{ fontSize: "20px", fontWeight: "bold", letterSpacing: "2px" }}>
                <span style={{ color: ct.primary }}>KEIZER</span><span style={{ color: ct.accent }}>SEC</span>
              </span>
              <span style={{ fontSize: "10px", color: ct.primary, opacity: 0.6, border: "1px solid " + ct.primary + "44", padding: "2px 7px", borderRadius: "10px", display: "none" }}>SOC / CTI</span>
            </div>
            <nav style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
              {["about", "skills", "research", "projects", "writeups", "contact"].map((s) => (
                <button key={s} onClick={() => { const el = document.getElementById(s); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                  style={{ padding: "4px 10px", color: ct.text, opacity: 0.7, background: "none", border: "none", cursor: "pointer", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", transition: "all 0.2s", fontFamily: mono }}
                  onMouseEnter={e => { e.currentTarget.style.color = ct.primary; e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = ct.text; e.currentTarget.style.opacity = "0.7"; }}
                >{s}</button>
              ))}
              <div style={{ display: "flex", gap: "4px", marginLeft: "8px" }}>
                {["cyber", "matrix", "hacker"].map((t) => (
                  <button key={t} onClick={() => setTheme(t)} style={{
                    padding: "4px 10px", backgroundColor: theme === t ? ct.primary : "transparent",
                    color: theme === t ? ct.bg : ct.text, border: "1px solid " + ct.primary,
                    borderRadius: "4px", cursor: "pointer", fontSize: "10px", fontWeight: "bold",
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

        {/* === TERMINAL === */}
        {showTerminal && (
          <div style={{
            position: "fixed", top: "72px", right: "20px", width: "580px", maxWidth: "92vw", height: "400px",
            backgroundColor: "#050810", border: "2px solid " + ct.primary, borderRadius: "8px",
            zIndex: 1000, display: "flex", flexDirection: "column",
            boxShadow: "0 0 40px " + ct.primary + "44", animation: "slideIn 0.3s ease-out",
          }}>
            <div style={{ padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: ct.primary, color: ct.bg, borderRadius: "6px 6px 0 0" }}>
              <span style={{ fontWeight: "bold", fontSize: "12px", fontFamily: mono }}>root@keizersec:~ [SOC/CTI]</span>
              <button onClick={() => setShowTerminal(false)} style={{ background: "none", border: "none", color: ct.bg, cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
                <X size={16} />
              </button>
            </div>
            <div ref={terminalRef} style={{ flex: 1, padding: "10px", overflowY: "auto", fontFamily: mono, fontSize: "12px", color: ct.primary }}>
              {terminalHistory.map((item, idx) => (
                <div key={idx} style={{
                  marginBottom: "3px", whiteSpace: "pre-wrap", wordBreak: "break-word",
                  color: item.type === "error" ? "#ff0055" : item.type === "input" ? "#ffffff" : item.type === "prompt" ? ct.primary : ct.text,
                }}>{item.text}</div>
              ))}
            </div>
            <div style={{ padding: "8px 10px", borderTop: "1px solid " + ct.primary + "44", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: ct.primary, fontSize: "12px" }}>$</span>
              <input type="text" value={terminalInput} onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleTerminalCommand} placeholder="Type 'help' for commands..." autoFocus
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#ffffff", fontFamily: mono, fontSize: "12px" }}
              />
            </div>
          </div>
        )}

        {/* === HERO === */}
        <section id="about" style={{ padding: "80px 20px 60px", textAlign: "center", animation: "fadeUp 0.5s ease-out" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 16px", backgroundColor: ct.primary + "15",
              border: "1px solid " + ct.primary + "44", borderRadius: "20px", marginBottom: "20px",
              fontSize: "11px", color: ct.primary, fontWeight: "bold",
            }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: ct.primary, display: "inline-block", animation: "pulse 2s infinite" }} />
              OPEN TO WORK — SOC Analyst / Threat Intelligence Junior
            </div>
            <h1 style={{ fontSize: "clamp(36px, 9vw, 68px)", fontWeight: "bold", marginBottom: "14px", lineHeight: 1.1 }}>
              <span style={{ color: ct.primary }}>KEIZER</span><span style={{ color: ct.accent }}>SEC</span>
            </h1>
            <p style={{ fontSize: "clamp(12px, 1.8vw, 15px)", color: ct.secondary, marginBottom: "10px", letterSpacing: "1px" }}>
              SOC Analyst · Threat Intelligence · LLM Security Research
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "44px", flexWrap: "wrap" }}>
              {[
                { label: "[0xD][LEGEND]", color: ct.primary },
                { label: "Top 2% TryHackMe", color: "#ffd700" },
                { label: "Professional", color: ct.secondary },
                { label: "CC BY-NC-SA 4.0 — LitM Author", color: ct.accent },
              ].map((badge, i) => (
                <span key={i} style={{ padding: "4px 12px", border: "1px solid " + badge.color + "66", borderRadius: "12px", fontSize: "11px", color: badge.color, backgroundColor: badge.color + "11" }}>
                  {badge.label}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: "14px" }}>
              {[
                { label: "GitHub Repos", value: statsData.repos, icon: <Code size={20} />, sub: "KeizerSec" },
                { label: "THM Rooms", value: statsData.rooms, icon: <Target size={20} />, sub: "Completed" },
                { label: "Badges THM", value: statsData.badges, icon: <Award size={20} />, sub: "Earned" },
                { label: "Hours Practice", value: statsData.hours + "+", icon: <Zap size={20} />, sub: "TryHackMe" },
              ].map((stat, idx) => (
                <div key={idx} style={{
                  padding: "20px 14px", backgroundColor: ct.bg + "dd", border: "2px solid " + ct.primary + "22",
                  borderRadius: "10px", transition: "all 0.3s", cursor: "default",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = ct.primary; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px " + ct.primary + "33"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = ct.primary + "22"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
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

        {/* === CERTIFICATIONS === */}
        <section style={{ padding: "20px 20px 40px" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              {certifications.map((cert, i) => (
                <div key={i} style={{
                  padding: "14px 20px", backgroundColor: ct.bg + "ee", border: "2px solid " + cert.color + "44",
                  borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px", transition: "all 0.3s",
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

        {/* === SKILLS === */}
        <section id="skills" style={{ padding: "60px 20px", backgroundColor: ct.primary + "08" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <SectionTitle icon={<Cpu size={24} />} text="ARSENAL TECHNIQUE" />
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
                          width: animatedSkills ? skill.level + "%" : "0%",
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

        {/* === RESEARCH PAPER LitM === */}
        <section id="research" style={{ padding: "60px 20px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <SectionTitle icon={<Brain size={24} />} text="RESEARCH — LLM-IN-THE-MIDDLE" />
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
                      { label: "Sujet principal", value: "Alignement LLM multi-modèles" },
                      { label: "Modèle théorique", value: "Scaffolding cognitif distribué" },
                      { label: "Concept clé", value: "Zone Proximale Distribuée (ZPD-D)" },
                      { label: "Application", value: "Vecteurs d'attaque architectures LLM" },
                    ].map((item, i) => (
                      <div key={i} style={{ padding: "10px 14px", backgroundColor: ct.bg + "aa", border: "1px solid " + ct.accent + "22", borderRadius: "8px" }}>
                        <div style={{ fontSize: "10px", color: ct.accent, opacity: 0.7, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>{item.label}</div>
                        <div style={{ fontSize: "12px", color: ct.text }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <a href="https://github.com/KeizerSec" target="_blank" rel="noopener noreferrer" style={{
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

        {/* === EXPERIENCE === */}
        <section style={{ padding: "60px 20px", backgroundColor: ct.primary + "05" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <SectionTitle icon={<Briefcase size={24} />} text="EXPÉRIENCE" />
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                {
                  role: "Technicien Support IT",
                  company: "SPIE ICS — Bron",
                  period: "Mars 2023 — Présent",
                  color: ct.primary,
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
                  color: ct.secondary,
                  points: [
                    "Management d'équipes de 15 à 20 personnes en environnement haute pression",
                    "Gestion de crise opérationnelle, observation comportementale, prise de décision rapide",
                    "Compétences transférables : analyse comportementale, communication sous pression, leadership",
                  ],
                },
              ].map((exp, i) => (
                <div key={i} style={{
                  padding: "26px", backgroundColor: ct.bg + "ee", border: "2px solid " + exp.color + "22",
                  borderRadius: "12px", transition: "all 0.3s", borderLeft: "4px solid " + exp.color,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = exp.color; e.currentTarget.style.boxShadow = "0 6px 24px " + exp.color + "22"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = exp.color + "22"; e.currentTarget.style.borderLeftColor = exp.color; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
                    <div>
                      <h4 style={{ fontSize: "17px", fontWeight: "bold", color: exp.color, marginBottom: "3px" }}>{exp.role}</h4>
                      <p style={{ fontSize: "13px", color: ct.text, opacity: 0.8 }}>{exp.company}</p>
                    </div>
                    <span style={{ padding: "4px 12px", border: "1px solid " + exp.color + "44", borderRadius: "8px", fontSize: "11px", color: exp.color, height: "fit-content" }}>
                      {exp.period}
                    </span>
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {exp.points.map((p, j) => (
                      <li key={j} style={{ display: "flex", gap: "8px", fontSize: "13px", color: ct.text, opacity: 0.8 }}>
                        <span style={{ color: exp.color, marginTop: "2px", flexShrink: 0 }}>›</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === PROJECTS === */}
        <section id="projects" style={{ padding: "60px 20px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <SectionTitle icon={<Code size={24} />} text="PROJETS GITHUB" />
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

        {/* === WRITE-UPS === */}
        <section id="writeups" style={{ padding: "60px 20px", backgroundColor: ct.primary + "06" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <SectionTitle icon={<BookOpen size={24} />} text="WRITE-UPS & LAB RESEARCH" />
            <p style={{ textAlign: "center", fontSize: "13px", color: ct.text, opacity: 0.65, marginBottom: "36px" }}>
              Documentation de mes recherches, CTF TryHackMe, et expérimentations en lab personnel
            </p>

            <div style={{ display: "flex", gap: "14px", marginBottom: "28px", flexWrap: "wrap", justifyContent: "center" }}>
              <div style={{ position: "relative", flex: "1 1 260px", maxWidth: "400px" }}>
                <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: ct.primary, pointerEvents: "none" }} size={15} />
                <input type="text" placeholder="Rechercher..." value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "100%", padding: "10px 10px 10px 36px", backgroundColor: ct.bg + "ee", border: "2px solid " + ct.primary + "30", borderRadius: "6px", color: ct.text, fontSize: "13px", outline: "none", fontFamily: mono, transition: "border-color 0.3s" }}
                  onFocus={e => e.currentTarget.style.borderColor = ct.primary}
                  onBlur={e => e.currentTarget.style.borderColor = ct.primary + "30"}
                />
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
                    padding: "9px 16px", backgroundColor: selectedCategory === cat ? ct.primary : "transparent",
                    color: selectedCategory === cat ? ct.bg : ct.text, border: "2px solid " + ct.primary,
                    borderRadius: "6px", cursor: "pointer", fontSize: "10px", fontWeight: "bold",
                    textTransform: "uppercase", fontFamily: mono, transition: "all 0.3s",
                  }}>{cat}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
              {filteredWriteups.map((wu) => (
                <div key={wu.id} style={{
                  backgroundColor: ct.bg + "ee", border: "2px solid " + ct.primary + "22",
                  borderRadius: "10px", padding: "22px", transition: "all 0.3s", cursor: "pointer", position: "relative", overflow: "hidden",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = ct.primary; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 10px 28px " + ct.primary + "33"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = ct.primary + "22"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ position: "absolute", top: "12px", right: "12px", padding: "3px 9px", backgroundColor: diffColor(wu.difficulty), color: "#000", borderRadius: "4px", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" }}>{wu.difficulty}</div>
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
                  <a href={wu.link} target={wu.link !== "#" ? "_blank" : undefined} rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: ct.primary, textDecoration: "none", fontWeight: "bold", fontSize: "12px" }}>
                    {wu.link !== "#" ? <><ExternalLink size={12} /> Voir le write-up</> : <><Lock size={12} /> Lab personnel</>}
                  </a>
                </div>
              ))}
            </div>
            {filteredWriteups.length === 0 && (
              <div style={{ textAlign: "center", padding: "44px 20px", color: ct.text, opacity: 0.45 }}>
                <Search size={36} style={{ marginBottom: "14px", opacity: 0.4 }} />
                <p style={{ fontSize: "15px" }}>Aucun write-up trouvé</p>
              </div>
            )}
          </div>
        </section>

        {/* === ACHIEVEMENTS === */}
        <section style={{ padding: "60px 20px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <SectionTitle icon={<Award size={24} />} text="ACHIEVEMENTS" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              {achievements.map((a, idx) => (
                <div key={idx} style={{
                  padding: "24px", backgroundColor: ct.bg + "ee", border: "2px solid " + ct.primary + "22",
                  borderRadius: "10px", textAlign: "center", transition: "all 0.3s", cursor: "default",
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

        {/* === CONTACT === */}
        <section id="contact" style={{ padding: "60px 20px", backgroundColor: ct.primary + "06" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
            <SectionTitle icon={<Mail size={24} />} text="CONTACT" />
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
                { icon: <Code size={20} />, name: "GitHub", url: "https://github.com/KeizerSec", sub: "KeizerSec" },
                { icon: <Shield size={20} />, name: "TryHackMe", url: "https://tryhackme.com/p/Keizer", sub: "Top 2% LEGEND" },
                { icon: <Briefcase size={20} />, name: "LinkedIn", url: "https://www.linkedin.com/in/kacime-benkhelifa", sub: "Kacime Benkhelifa" },
              ].map((s, idx) => (
                <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                  padding: "18px 16px", backgroundColor: ct.bg + "ee", border: "2px solid " + ct.primary + "22",
                  borderRadius: "10px", textDecoration: "none", color: ct.text, transition: "all 0.3s", minWidth: "110px",
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

        {/* === FOOTER === */}
        <footer style={{ padding: "28px 20px", borderTop: "2px solid " + ct.primary, textAlign: "center", backgroundColor: ct.primary + "06" }}>
          <p style={{ fontSize: "12px", color: ct.text, opacity: 0.5, marginBottom: "4px" }}>2026 KeizerSec | SOC / Threat Intelligence | Lyon</p>
          <p style={{ fontSize: "11px", color: ct.primary, fontFamily: mono, marginBottom: "4px" }}>
            <span style={{ opacity: 0.4 }}>$</span> echo "Detect. Analyze. Respond." <span style={{ opacity: 0.4 }}>|</span> lolcat
          </p>
          <p style={{ fontSize: "10px", color: ct.text, opacity: 0.3 }}>
            ↑↑↓↓←→←→BA — Try the Konami code 😉
          </p>
        </footer>
      </div>
    </div>
  );
}
