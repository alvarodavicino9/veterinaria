import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Stethoscope, Scissors, Syringe, CalendarHeart, Check, Sparkles } from "lucide-react";
import { SERVICES } from "../data/services";
import { IMAGES } from "../data/images";
import Reveal from "../components/ui/Reveal";
import TiltCard from "../components/ui/TiltCard";
import Button from "../components/ui/Button";

const ICONS = { Stethoscope, Scissors, Syringe };

export default function Services() {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-brand-100/60 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-5xl mx-auto px-6 py-14">
        <Reveal className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 font-display font-bold text-sm px-4 py-1.5 rounded-full mb-3">
            <Sparkles size={14} /> Servicios
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-900 mt-2">
            Atención veterinaria integral
          </h1>
          <p className="text-ink/60 mt-3">
            Consultas, cirugías, estudios y peluquería con turno online — atención personalizada
            y técnicas cat friendly en cada paso.
          </p>
        </Reveal>

        <div className="space-y-6">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.id} delay={i * 0.1}>
                <TiltCard
                  max={3}
                  className="bg-white rounded-3xl p-4 sm:p-5 shadow-soft hover:shadow-xl transition-shadow border border-transparent hover:border-brand-100 grid sm:grid-cols-[10rem_1fr_auto] gap-5 items-center"
                >
                  <div className="relative w-full h-32 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-brand-50">
                    <img src={IMAGES.services[s.id]} alt={s.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/20 via-transparent to-transparent" />
                    <div className="absolute bottom-1.5 left-1.5 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-soft text-brand-600">
                      <Icon size={16} />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl text-brand-900">{s.label}</h2>
                    <p className="text-ink/60 text-sm mt-1">{s.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {s.subServices.map((sub) => (
                        <span key={sub} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
                          <Check size={12} /> {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link to="/turnos" state={{ preselect: s.id }} className="sm:justify-self-end">
                    <Button variant="lime" size="sm" icon={CalendarHeart} iconPosition="left">
                      Reservar
                    </Button>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
