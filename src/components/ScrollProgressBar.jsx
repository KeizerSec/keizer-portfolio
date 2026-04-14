import { useState, useEffect } from "react";

export default function ScrollProgressBar({ ct }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "3px", zIndex: 9999, backgroundColor: ct.primary + "22" }}>
      <div style={{
        height: "100%", width: progress + "%", backgroundColor: ct.primary,
        boxShadow: "0 0 10px " + ct.primary + ", 0 0 20px " + ct.primary + "66",
        transition: "width 0.08s linear",
      }} />
    </div>
  );
}
