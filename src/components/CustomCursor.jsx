import { useState, useEffect } from "react";

export default function CustomCursor({ ct }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  useEffect(() => {
    let frame;
    const animate = () => {
      setTrail(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [pos]);

  return (
    <>
      {/* Traîne */}
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 99998,
        width: clicking ? "28px" : "22px", height: clicking ? "28px" : "22px",
        borderRadius: "50%", border: "1px solid " + ct.primary + "66",
        transform: "translate(-50%, -50%)",
        left: trail.x, top: trail.y,
        transition: "width 0.15s, height 0.15s",
        boxShadow: "0 0 8px " + ct.primary + "33",
      }} />
      {/* Point principal */}
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 99999,
        width: clicking ? "6px" : "8px", height: clicking ? "6px" : "8px",
        borderRadius: "50%", backgroundColor: ct.primary,
        transform: "translate(-50%, -50%)",
        left: pos.x, top: pos.y,
        boxShadow: "0 0 6px " + ct.primary,
        transition: "width 0.1s, height 0.1s",
      }} />
    </>
  );
}
