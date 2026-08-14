import {
  Bone,
  Shirt,
  PawPrint,
  Droplets,
  Gamepad2,
  HeartPulse,
} from "lucide-react";
import { motion } from "framer-motion";

const ICONS = {
  alimento: Bone,
  ropa: Shirt,
  accesorios: PawPrint,
  higiene: Droplets,
  juguetes: Gamepad2,
  salud: HeartPulse,
};

const GRADIENTS = {
  alimento: "from-brand-500 to-brand-700",
  ropa: "from-lime-400 to-lime-600",
  accesorios: "from-brand-400 to-brand-600",
  higiene: "from-brand-300 to-brand-500",
  juguetes: "from-lime-300 to-lime-500",
  salud: "from-brand-600 to-brand-800",
};

export default function ProductThumb({ category, className = "" }) {
  const Icon = ICONS[category] || PawPrint;
  const gradient = GRADIENTS[category] || "from-brand-500 to-brand-700";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}
    >
      <div className="absolute inset-0 paw-bg text-white/10" />
      <motion.div
        whileHover={{ scale: 1.12, rotate: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 14 }}
        className="relative z-10 bg-white/15 backdrop-blur-sm rounded-full p-5"
      >
        <Icon size={38} strokeWidth={1.8} className="text-white" />
      </motion.div>
    </div>
  );
}
