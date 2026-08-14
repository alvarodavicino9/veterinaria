import { Link } from "react-router-dom";
import { CalendarHeart, Cat, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

const paws = [
  { top: "18%", left: "8%", size: 20, duration: 6, delay: 0 },
  { top: "70%", left: "14%", size: 14, duration: 5, delay: 0.8 },
  { top: "22%", left: "90%", size: 16, duration: 5.5, delay: 0.4 },
  { top: "72%", left: "88%", size: 22, duration: 6.5, delay: 1.2 },
];

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 to-brand-800 text-white px-8 py-16 sm:px-16 text-center">
        <motion.div
          animate={{ rotate: [0, 6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -right-10 w-48 h-48 bg-lime-400/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ rotate: [0, -8, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-14 -left-10 w-56 h-56 bg-brand-400/20 rounded-full blur-2xl"
        />
        {paws.map((p, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10 hidden sm:block"
            style={{ top: p.top, left: p.left }}
            animate={{ y: [0, -14, 0], rotate: [0, 14, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cat size={p.size} />
          </motion.div>
        ))}

        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-semibold mb-4"
        >
          <Sparkles size={14} className="text-lime-300" /> Turnos online 24/7
        </motion.span>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl relative">
          ¿Tu mascota necesita un chequeo?
        </h2>
        <p className="mt-4 text-brand-100 max-w-lg mx-auto relative">
          Reservá tu turno online en menos de un minuto. Elegí el servicio, el día y el horario
          que más te convenga.
        </p>
        <div className="mt-8 relative">
          <Link to="/turnos">
            <Button variant="lime" size="lg" icon={CalendarHeart} iconPosition="left">
              Reservar turno ahora
            </Button>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
