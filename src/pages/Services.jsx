import { Link } from "react-router-dom";
import { Stethoscope, Scissors, Syringe, CalendarHeart, Check } from "lucide-react";
import { SERVICES } from "../data/services";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";

const ICONS = { Stethoscope, Scissors, Syringe };

export default function Services() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <Reveal className="text-center max-w-xl mx-auto mb-14">
        <span className="text-brand-500 font-display font-bold text-sm uppercase tracking-wide">
          Servicios
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
              <div className="bg-white rounded-3xl p-8 shadow-soft grid sm:grid-cols-[auto_1fr_auto] gap-6 items-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <Icon size={28} />
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
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
