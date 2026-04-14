# KeizerSec — Cybersecurity Portfolio

Portfolio personnel de **Kacime Benkhelifa (KeizerSec)**, SOC Analyst / Threat Intelligence Junior.  
Construit avec React + Vite. Terminal interactif, thèmes dynamiques, effet Matrix canvas.

## Stack

- React 19 + Vite 8
- Lucide React (icônes)
- Styling 100% inline (CSS-in-JS)
- ESLint 9

## Fonctionnalités

- **3 thèmes** : Cyber (vert), Matrix (matrix green), Hacker (bleu GitHub)
- **Terminal interactif** : commandes `help`, `about`, `skills`, `projects`, `writeups`, `litm`, `thm`, `contact`, `matrix`, `hack`, `whoami`
- **Effet Matrix** : canvas rain activable via le terminal ou le bouton
- **Konami code** : ↑↑↓↓←→←→BA
- **Sections** : Hero / Certifications / Skills / Research (LitM) / Expérience / Projets GitHub / Write-ups / Achievements / Contact

## Structure du projet

```
src/
├── App.jsx                   # Orchestrateur principal
├── data/
│   ├── themes.js             # Palettes de couleurs
│   ├── skills.js             # Compétences techniques
│   ├── projects.js           # Projets GitHub
│   ├── writeups.js           # Write-ups & CTF
│   ├── achievements.js       # Achievements TryHackMe
│   └── certifications.js     # Certifications + stats
└── components/
    ├── Header.jsx
    ├── Terminal.jsx
    ├── HeroSection.jsx
    ├── SkillsSection.jsx
    ├── ResearchSection.jsx
    ├── ExperienceSection.jsx
    ├── ProjectsSection.jsx
    ├── WriteupsSection.jsx
    ├── AchievementsSection.jsx
    ├── ContactSection.jsx
    ├── Footer.jsx
    └── SectionTitle.jsx
```

## Lancer en local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Contact

- Email : keizer.cybersec@protonmail.com
- GitHub : [KeizerSec](https://github.com/KeizerSec)
- TryHackMe : [Keizer](https://tryhackme.com/p/Keizer) — Top 2% mondial [0xD][LEGEND]
- LinkedIn : [Kacime Benkhelifa](https://www.linkedin.com/in/kacime-benkhelifa)
