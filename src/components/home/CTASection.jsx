import { Link } from "react-router-dom";
import { CalendarHeart } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 to-brand-800 text-white px-8 py-16 sm:px-16 text-center">
        <motion.div
          animate={{ rotate: [0, 6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -right-10 w-48 h-48 bg-lime-400/20 rounded-full blur-2xl"
        />
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
