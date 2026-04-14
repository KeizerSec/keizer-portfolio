import { useState, useEffect, useRef } from "react";

const IS_TOUCH = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

export default function CustomCursor({ ct }) {
  const [pos, setPos]       = useState({ x: -200, y: -200 });
  const [trail, setTrail]   = useState({ x: -200, y: -200 });
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible]   = useState(false);
  const posRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    if (IS_TOUCH) return;
    const onMove  = (e) => { posRef.current = { x: e.clientX, y: e.clientY }; setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown",    onDown);
    window.addEventListener("mouseup",      onUp);
    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown",    onDown);
      window.removeEventListener("mouseup",      onUp);
    };
  }, []);

  useEffect(() => {
    if (IS_TOUCH) return;
    let frame;
    const animate = () => {
      setTrail(prev => ({
        x: prev.x + (posRef.current.x - prev.x) * 0.12,
        y: prev.y + (posRef.current.y - prev.y) * 0.12,
      }));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (IS_TOUCH) return null;

  const opacity = visible ? 1 : 0;

  return (
    <>
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 99998,
        width: clicking ? "28px" : "22px", height: clicking ? "28px" : "22px",
        borderRadius: "50%", border: "1px solid " + ct.primary + "77",
        transform: "translate(-50%, -50%)",
        left: trail.x, top: trail.y, opacity,
        transition: "width 0.15s, height 0.15s, opacity 0.2s",
        boxShadow: "0 0 8px " + ct.primary + "33",
      }} />
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 99999,
        width: clicking ? "5px" : "7px", height: clicking ? "5px" : "7px",
        borderRadius: "50%", backgroundColor: ct.primary,
        transform: "translate(-50%, -50%)",
        left: pos.x, top: pos.y, opacity,
        boxShadow: "0 0 6px " + ct.primary,
        transition: "width 0.1s, height 0.1s, opacity 0.2s",
      }} />
    </>
  );
}
