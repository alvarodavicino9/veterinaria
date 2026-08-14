import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarHeart, ShoppingBag, Cat, Sparkles, Stethoscope } from "lucide-react";
import Button from "../ui/Button";
import AnimatedCounter from "../ui/AnimatedCounter";

const floatingPaws = [
  { top: "12%", left: "6%", size: 26, delay: 0, duration: 6 },
  { top: "68%", left: "10%", size: 18, delay: 1.2, duration: 7 },
  { top: "22%", left: "88%", size: 22, delay: 0.6, duration: 5.5 },
  { top: "78%", left: "84%", size: 30, delay: 1.8, duration: 6.5 },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yIllustration = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-brand-700 via-brand-700 to-brand-900 text-white pt-14 pb-28 sm:pt-20 sm:pb-36">
      {/* decorative blobs (parallax on scroll) */}
      <motion.div
        style={{ y: yBlob1 }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 w-96 h-96 bg-lime-400/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: yBlob2 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -left-20 w-96 h-96 bg-brand-400/30 rounded-full blur-3xl"
      />

      {floatingPaws.map((p, i) => (
        <motion.div
          key={i}
          className="absolute text-white/10 hidden sm:block"
          style={{ top: p.top, left: p.left }}
          animate={{ y: [0, -18, 0], rotate: [0, 15, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cat size={p.size} />
        </motion.div>
      ))}

      <motion.div style={{ y: yContent, opacity: fade }} className="max-w-7xl mx-auto px-6 relative grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-semibold mb-6"
          >
            <Sparkles size={15} className="text-lime-300" />
            Técnicas cat friendly · Diagnóstico avanzado
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05]"
          >
            Cuidamos a tu mejor amigo
            <span className="text-lime-400"> como se merece</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-brand-100 text-lg max-w-lg"
          >
            Veterinaria y petshop en un solo lugar: consultas, cirugías, peluquería,
            y todo lo que tu mascota necesita, con turnos online y envíos a domicilio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link to="/turnos">
              <Button variant="lime" size="lg" icon={CalendarHeart} iconPosition="left">
                Reservar turno
              </Button>
            </Link>
            <Link to="/tienda">
              <Button variant="white" size="lg" icon={ShoppingBag} iconPosition="left">
                Ir a la tienda
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-brand-200"
          >
            <div className="flex items-center gap-2">
              <Stethoscope size={16} className="text-lime-300" /> Diagnósticos avanzados
            </div>
            <div className="flex items-center gap-2">
              <Cat size={16} className="text-lime-300" /> Manejo cat friendly
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ y: yIllustration }}
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-lime-400/90 to-lime-300/80 flex items-center justify-center shadow-2xl">
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cat size={160} strokeWidth={1} className="text-brand-800" />
            </motion.div>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-6 -left-8 bg-white text-brand-800 rounded-2xl px-5 py-3 shadow-soft font-display font-bold text-sm"
          >
            <AnimatedCounter value={5000} prefix="+" suffix=" mascotas atendidas" />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-cream" />
    </section>
  );
}
