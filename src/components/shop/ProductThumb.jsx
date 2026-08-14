import {
  Bone,
  Shirt,
  PawPrint,
  Droplets,
  Gamepad2,
  HeartPulse,
} from "lucide-react";
import { motion } from "framer-motion";
import { IMAGES } from "../../data/images";

const ICONS = {
  alimento: Bone,
  ropa: Shirt,
  accesorios: PawPrint,
  higiene: Droplets,
  juguetes: Gamepad2,
  salud: HeartPulse,
};

export default function ProductThumb({ category, className = "" }) {
  const Icon = ICONS[category] || PawPrint;
  const photo = IMAGES.categories[category];

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-brand-100 ${className}`}>
      {photo && (
        <motion.img
          src={photo}
          alt=""
          loading="lazy"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/25 via-transparent to-transparent" />
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-soft">
        <Icon size={14} strokeWidth={2} className="text-brand-700" />
      </div>
    </div>
  );
}
