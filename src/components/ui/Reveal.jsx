import { motion } from "framer-motion";

// Scroll-triggered fade + rise + subtle 3D tilt reveal wrapper used across the site.
// The slight rotateX gives sections a bit of depth as they settle into place,
// without being distracting — keep `tilt` small (default 6deg).
export default function Reveal({ children, delay = 0, y = 24, tilt = 6, className = "", as = "div" }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y, rotateX: tilt }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 800 }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
