import { Cat, HeartHandshake, Microscope, Sparkles, Stethoscope, Users, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import { IMAGES } from "../data/images";
import Reveal from "../components/ui/Reveal";
import TiltCard from "../components/ui/TiltCard";
import AnimatedCounter from "../components/ui/AnimatedCounter";

const VALUES = [
  { icon: Cat, title: "Manejo cat friendly", text: "Técnicas de contención suave y ambientes de baja tensión para felinos." },
  { icon: Microscope, title: "Diagnóstico avanzado", text: "Equipamiento y estudios que nos permiten llegar antes al diagnóstico correcto." },
  { icon: HeartHandshake, title: "Atención personalizada", text: "Cada mascota y familia recibe seguimiento cercano, no una consulta genérica." },
];

const STATS = [
  { icon: Cat, value: 5000, prefix: "+", suffix: "", label: "Mascotas atendidas" },
  { icon: Stethoscope, value: 8, prefix: "+", suffix: "", label: "Años de trayectoria" },
  { icon: Users, value: 98, prefix: "", suffix: "%", label: "Familias que vuelven" },
  { icon: Clock3, value: 20, prefix: "", suffix: "hs", label: "Atención de lunes a sábado" },
];

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-700 to-brand-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              <Sparkles size={14} className="text-lime-300" /> Nuestra historia
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl">Somos DS Vet & Petshop</h1>
            <p className="mt-5 text-brand-100 text-lg leading-relaxed">
              Veterinaria y petshop especializados en atención personalizada y diagnósticos
              avanzados, con excelente manejo de felinos y técnicas cat friendly. Acompañamos a
              cada familia con el mismo cuidado que le daríamos a nuestras propias mascotas.
            </p>
          </Reveal>
        </div>
      </section>

      <Reveal className="max-w-5xl mx-auto px-6 -mt-10 relative">
        <div className="rounded-3xl overflow-hidden shadow-2xl h-72 sm:h-96 ring-4 ring-white">
          <img src={IMAGES.about} alt="Nuestro equipo veterinario atendiendo a una mascota" className="w-full h-full object-cover" />
        </div>
      </Reveal>

      <section className="relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-0 w-96 h-96 bg-lime-100/60 rounded-full blur-3xl -z-10"
        />
        <div className="max-w-6xl mx-auto px-6 pt-20 grid sm:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <TiltCard max={5} className="bg-white rounded-3xl p-7 shadow-soft hover:shadow-xl transition-shadow text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center mx-auto shadow-soft">
                  <v.icon size={26} />
                </div>
                <h3 className="font-display font-bold text-lg text-brand-900 mt-5">{v.title}</h3>
                <p className="text-ink/60 text-sm mt-2 leading-relaxed">{v.text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-br from-brand-700 to-brand-900 text-white rounded-[2.5rem] p-8 sm:p-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <s.icon size={22} className="mx-auto text-lime-300 mb-2" />
                <p className="font-display font-extrabold text-2xl sm:text-3xl">
                  <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="text-brand-200 text-xs sm:text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
