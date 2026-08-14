import { motion } from "framer-motion";

/**
 * 27 Vet logo: purple paw badge with "27" + lime "vet" wordmark.
 * `mark` = show only the paw badge (for favicons/compact spots).
 * `light` = use on dark backgrounds (wordmark turns white+lime, badge gets ring).
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
      <rect width="100" height="100" rx="26" fill="#4a2673" />
      <g fill="#ffffff">
        <ellipse cx="34" cy="38" rx="9" ry="12" />
        <ellipse cx="50" cy="30" rx="9.5" ry="13" />
        <ellipse cx="66" cy="38" rx="9" ry="12" />
        <path d="M50 45c14 0 22 9 22 20 0 9-7 14-22 14s-22-5-22-14c0-11 8-20 22-20z" />
      </g>
      <text
        x="50"
        y="69"
        fontFamily="Baloo 2, sans-serif"
        fontWeight="700"
        fontSize="21"
        fill="#4a2673"
        textAnchor="middle"
      >
        27
      </text>
    </motion.svg>
  );

  if (mark) return <div className={className}>{Badge}</div>;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Badge}
      <span className={`font-display font-extrabold leading-none ${s.text}`}>
        <span className={light ? "text-white" : "text-brand-700"}>27</span>
        <span className="text-lime-400">vet</span>
      </span>
    </div>
  );
}
