export default function SectionTitle({ icon, text, ct, mono }) {
  return (
    <h3 style={{
      fontSize: "clamp(24px, 5vw, 36px)", fontWeight: "bold", marginBottom: "40px",
      textAlign: "center", color: ct.primary, display: "flex",
      alignItems: "center", justifyContent: "center", gap: "10px", fontFamily: mono,
    }}>
      {icon} {text}
    </h3>
  );
}
