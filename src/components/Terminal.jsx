import { useState, useRef } from "react";
import { X } from "lucide-react";

const COMMANDS = {
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

const INITIAL_HISTORY = [
  { type: "output", text: "KeizerSec Terminal v3.0.0 — SOC / CTI Edition" },
  { type: "output", text: 'Type "help" for available commands' },
  { type: "prompt", text: "root@keizersec:~$" },
];

export default function Terminal({ ct, mono, matrixRef, setMatrixMode, setEasterEgg, onClose }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const terminalRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const cmd = input.trim().toLowerCase();
    const hist = [...history];
    hist.push({ type: "input", text: "root@keizersec:~$ " + input });

    if (cmd === "clear") {
      setHistory([{ type: "prompt", text: "root@keizersec:~$" }]);
      setInput("");
      return;
    }

    if (cmd === "matrix") {
      const next = !matrixRef.current;
      setMatrixMode(next);
      hist.push({ type: "output", text: "Matrix mode " + (next ? "enabled" : "disabled") });
    } else if (cmd === "konami") {
      setEasterEgg(true);
      setTimeout(() => setEasterEgg(false), 3000);
      hist.push({ type: "output", text: "KONAMI CODE ACTIVATED!" });
      hist.push({ type: "output", text: "You found the easter egg!" });
    } else if (COMMANDS[cmd]) {
      COMMANDS[cmd].forEach((l) => hist.push({ type: "output", text: l }));
    } else if (cmd) {
      hist.push({ type: "error", text: "Command not found: " + cmd + ". Type 'help'." });
    }

    hist.push({ type: "prompt", text: "root@keizersec:~$" });
    setHistory(hist);
    setInput("");
    setTimeout(() => { if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight; }, 20);
  };

  return (
    <div style={{
      position: "fixed", top: "72px", right: "20px", width: "580px", maxWidth: "92vw", height: "400px",
      backgroundColor: "#050810", border: "2px solid " + ct.primary, borderRadius: "8px",
      zIndex: 1000, display: "flex", flexDirection: "column",
      boxShadow: "0 0 40px " + ct.primary + "44", animation: "slideIn 0.3s ease-out",
    }}>
      <div style={{ padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: ct.primary, color: ct.bg, borderRadius: "6px 6px 0 0" }}>
        <span style={{ fontWeight: "bold", fontSize: "12px", fontFamily: mono }}>root@keizersec:~ [SOC/CTI]</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: ct.bg, cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
          <X size={16} />
        </button>
      </div>
      <div ref={terminalRef} style={{ flex: 1, padding: "10px", overflowY: "auto", fontFamily: mono, fontSize: "12px", color: ct.primary }}>
        {history.map((item, idx) => (
          <div key={idx} style={{
            marginBottom: "3px", whiteSpace: "pre-wrap", wordBreak: "break-word",
            color: item.type === "error" ? "#ff0055" : item.type === "input" ? "#ffffff" : item.type === "prompt" ? ct.primary : ct.text,
          }}>{item.text}</div>
        ))}
      </div>
      <div style={{ padding: "8px 10px", borderTop: "1px solid " + ct.primary + "44", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: ct.primary, fontSize: "12px" }}>$</span>
        <input
          type="text" value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help' for commands..."
          autoFocus
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#ffffff", fontFamily: mono, fontSize: "12px" }}
        />
      </div>
    </div>
  );
}
