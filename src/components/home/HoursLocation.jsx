import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { formatHoursLine, isOpenNow } from "../../lib/hours";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { BUSINESS } from "../../data/business";

export default function HoursLocation() {
  const open = isOpenNow();
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-8">
      <Reveal className="rounded-3xl overflow-hidden bg-gradient-to-br from-brand-100 to-brand-50 relative min-h-[320px] flex items-center justify-center">
        <motion.div
          animate={{ backgroundPosition: ["0px 0px", "22px 22px"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 paw-bg text-brand-300/40"
        />
        <div className="relative text-center px-6">
          <div className="relative inline-flex items-center justify-center mb-3">
            <motion.span
              animate={{ scale: [1, 2.1], opacity: [0.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              className="absolute w-10 h-10 rounded-full bg-brand-400"
            />
            <motion.span
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
              className="absolute w-10 h-10 rounded-full bg-brand-400"
            />
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-14 h-14 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-lg"
            >
              <MapPin size={26} />
            </motion.div>
          </div>
          <p className="font-display font-bold text-brand-800">Encontranos en Córdoba</p>
          <p className="text-brand-600 text-sm mt-1">Reemplazar por mapa embebido de Google Maps</p>
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4"
          >
            <Button variant="primary" size="sm">Ver en Google Maps</Button>
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="bg-white rounded-3xl p-8 shadow-soft flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-lime-100 text-lime-600 flex items-center justify-center">
            <Clock size={20} />
          </div>
          <h3 className="font-display font-bold text-xl text-brand-900">Horarios de atención</h3>
          <span className={`ml-auto inline-flex items-center gap-1.5 text-xs font-display font-bold px-3 py-1 rounded-full ${open ? "bg-lime-100 text-lime-700" : "bg-gray-100 text-gray-500"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-lime-500 animate-pulse" : "bg-gray-400"}`} />
            {open ? "Abierto ahora" : "Cerrado ahora"}
          </span>
        </div>
        <ul className="space-y-3">
          {formatHoursLine().map((h) => (
            <li
              key={h.label}
              className="flex justify-between border-b border-brand-50 pb-3 last:border-0 last:pb-0"
            >
              <span className="text-ink/60">{h.label}</span>
              <span className="font-display font-bold text-brand-800">{h.value}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 mt-6 text-ink/60 text-sm">
          <Phone size={15} className="text-brand-500" /> {BUSINESS.legalPhone}
        </div>
      </Reveal>
    </section>
  );
}
