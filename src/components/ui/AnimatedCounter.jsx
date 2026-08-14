import { useRef, useState } from "react";
import { motion } from "framer-motion";

// Counts up from 0 to `value` once it scrolls into view.
export default function AnimatedCounter({ value, duration = 1.4, prefix = "", suffix = "", className = "" }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <motion.span onViewportEnter={start} viewport={{ once: true, margin: "-10px" }} className={className}>
      {prefix}
      {display.toLocaleString("es-AR")}
      {suffix}
    </motion.span>
  );
}
