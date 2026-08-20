import { motion } from "framer-motion";

/**
 * DS Vet & Petshop logo: coral paw badge with a mint heart accent + "DS vet" wordmark.
 * `mark` = show only the paw badge (for favicons/compact spots).
 * `light` = use on dark backgrounds (wordmark turns white+mint, badge gets ring).
 */
export default function Logo({ className = "", size = "md", mark = false, light = false, animated = false }) {
  const sizes = {
    sm: { badge: 32, text: "text-lg" },
    md: { badge: 44, text: "text-2xl" },
    lg: { badge: 64, text: "text-4xl" },
    xl: { badge: 96, text: "text-6xl" },
  };
  const s = sizes[size] || sizes.md;

  const Badge = (
    <motion.svg
      width={s.badge}
      height={s.badge}
      viewBox="0 0 100 100"
      whileHover={animated ? { rotate: -8, scale: 1.06 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 12 }}
      className="shrink-0 drop-shadow-sm"
    >
      <rect width="100" height="100" rx="26" fill="#D94A2C" />
      <g fill="#ffffff">
        <ellipse cx="34" cy="37" rx="9" ry="12" />
        <ellipse cx="50" cy="29" rx="9.5" ry="13" />
        <ellipse cx="66" cy="37" rx="9" ry="12" />
        <path d="M50 44c14 0 22 9 22 20 0 9-7 14-22 14s-22-5-22-14c0-11 8-20 22-20z" />
      </g>
      <path
        d="M72 14c-3-3-8-1-8 4 0 4 4 7 8 10 4-3 8-6 8-10 0-5-5-7-8-4z"
        fill="#3FC896"
      />
    </motion.svg>
  );

  if (mark) return <div className={className}>{Badge}</div>;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Badge}
      <span className={`font-display font-extrabold leading-none ${s.text}`}>
        <span className={light ? "text-white" : "text-brand-700"}>DS</span>
        <span className="text-lime-400"> vet</span>
      </span>
    </div>
  );
}
