export default function Footer({ ct }) {
  return (
    <footer style={{ padding: "28px 20px", borderTop: "2px solid " + ct.primary, textAlign: "center", backgroundColor: ct.primary + "06" }}>
      <p style={{ fontSize: "12px", color: ct.text, opacity: 0.5, marginBottom: "4px" }}>
        2026 KeizerSec | SOC / Threat Intelligence | Lyon
      </p>
      <p style={{ fontSize: "11px", color: ct.primary, fontFamily: "'Courier New', monospace", marginBottom: "4px" }}>
        <span style={{ opacity: 0.4 }}>$</span> echo "Detect. Analyze. Respond." <span style={{ opacity: 0.4 }}>|</span> lolcat
      </p>
      <p style={{ fontSize: "10px", color: ct.text, opacity: 0.3 }}>
        ↑↑↓↓←→←→BA — Try the Konami code 😉
      </p>
    </footer>
  );
}
