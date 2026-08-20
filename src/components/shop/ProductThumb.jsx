import {
  Bone,
  Shirt,
  PawPrint,
  Droplets,
  Gamepad2,
  HeartPulse,
} from "lucide-react";
import { motion } from "framer-motion";
import { productImage } from "../../data/images";

const ICONS = {
  alimento: Bone,
  ropa: Shirt,
  accesorios: PawPrint,
  higiene: Droplets,
  juguetes: Gamepad2,
  salud: HeartPulse,
};

// Accepts a full `product` object so each item can show a distinct photo
// from its category's pair (see productImage() in data/images.js) — falls
// back to just `category` for spots that only need the icon/placeholder.
export default function ProductThumb({ product, category, className = "" }) {
  const cat = category || product?.category;
  const Icon = ICONS[cat] || PawPrint;
  const photo = product ? productImage(product) : null;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 ${className}`}>
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
