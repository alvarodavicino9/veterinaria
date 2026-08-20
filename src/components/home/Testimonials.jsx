import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Reveal from "../ui/Reveal";
import TiltCard from "../ui/TiltCard";

const TESTIMONIALS = [
  {
    name: "María López",
    pet: "Simba · Gato",
    text: "El manejo cat friendly se nota desde que entrás. Simba nunca había estado tan tranquilo en una consulta.",
  },
  {
    name: "Facundo Ibáñez",
    pet: "Rocco · Perro",
    text: "Pedí turno para peluquería desde la web en dos minutos y me llegó la confirmación al toque. Súper recomendable.",
  },
  {
    name: "Carla Medina",
    pet: "Luna · Gata",
    text: "La cirugía de Luna fue un momento difícil pero el equipo nos acompañó con muchísima info y calidez.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20 overflow-hidden">
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-10 right-0 w-80 h-80 bg-lime-100/70 rounded-full blur-3xl -z-10"
      />

      <Reveal className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-brand-500 font-display font-bold text-sm uppercase tracking-wide">
          Testimonios
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-900 mt-2">
          Familias que confían en nosotros
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <TiltCard
              max={5}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-3xl p-7 shadow-soft hover:shadow-xl transition-shadow relative h-full"
            >
              <motion.div
                animate={{ rotate: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              >
                <Quote className="text-lime-300 mb-3" size={28} />
              </motion.div>
              <div className="flex gap-0.5 text-amber-400 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-ink/70 text-sm leading-relaxed">{t.text}</p>
              <div className="mt-5 pt-4 border-t border-brand-50">
                <p className="font-display font-bold text-brand-900 text-sm">{t.name}</p>
                <p className="text-ink/50 text-xs">{t.pet}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
