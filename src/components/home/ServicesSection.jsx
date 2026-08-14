import { Link } from "react-router-dom";
import { Stethoscope, Scissors, Syringe, ArrowRight } from "lucide-react";
import { SERVICES } from "../../data/services";
import Reveal from "../ui/Reveal";

const ICONS = { Stethoscope, Scissors, Syringe };

export default function ServicesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <Reveal className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-brand-500 font-display font-bold text-sm uppercase tracking-wide">
          Nuestros servicios
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-900 mt-2">
          Todo el cuidado que tu mascota necesita
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-6">
        {SERVICES.map((service, i) => {
          const Icon = ICONS[service.icon];
          return (
            <Reveal key={service.id} delay={i * 0.1}>
              <Link
                to="/turnos"
                state={{ preselect: service.id }}
                className="group block h-full bg-white rounded-3xl p-7 shadow-soft hover:shadow-lg transition-shadow border border-transparent hover:border-brand-200"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Icon size={26} />
                </div>
                <h3 className="font-display font-bold text-lg text-brand-900 mt-5">
                  {service.label}
                </h3>
                <p className="text-ink/60 text-sm mt-2 leading-relaxed">{service.description}</p>
                <span className="inline-flex items-center gap-1 text-brand-600 font-display font-semibold text-sm mt-5 group-hover:gap-2 transition-all">
                  Reservar turno <ArrowRight size={15} />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
