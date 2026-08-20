import { Cat, HeartHandshake, Microscope, Sparkles } from "lucide-react";
import { IMAGES } from "../data/images";
import Reveal from "../components/ui/Reveal";

const VALUES = [
  { icon: Cat, title: "Manejo cat friendly", text: "Técnicas de contención suave y ambientes de baja tensión para felinos." },
  { icon: Microscope, title: "Diagnóstico avanzado", text: "Equipamiento y estudios que nos permiten llegar antes al diagnóstico correcto." },
  { icon: HeartHandshake, title: "Atención personalizada", text: "Cada mascota y familia recibe seguimiento cercano, no una consulta genérica." },
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
        <div className="rounded-3xl overflow-hidden shadow-2xl h-72 sm:h-96">
          <img src={IMAGES.about} alt="Perro y gato cuidados en DS Vet & Petshop" className="w-full h-full object-cover" />
        </div>
      </Reveal>

      <section className="max-w-6xl mx-auto px-6 py-20 grid sm:grid-cols-3 gap-6">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.1} className="bg-white rounded-3xl p-7 shadow-soft text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
              <v.icon size={26} />
            </div>
            <h3 className="font-display font-bold text-lg text-brand-900 mt-5">{v.title}</h3>
            <p className="text-ink/60 text-sm mt-2 leading-relaxed">{v.text}</p>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
