import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "../ui/Logo";
import { InstagramIcon, FacebookIcon } from "../ui/SocialIcons";
import { formatHoursLine } from "../../lib/hours";
import { BUSINESS } from "../../data/business";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100 mt-24 relative overflow-hidden">
      <div className="absolute inset-0 paw-bg text-white/5" />
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 relative">
        <div>
          <Logo size="md" light />
          <p className="mt-4 text-sm text-brand-200 leading-relaxed max-w-xs">
            Veterinaria y petshop especializados en atención personalizada y diagnósticos
            avanzados. Excelente manejo de felinos y técnicas cat friendly.
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href={BUSINESS.instagram}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-lime-400 hover:text-brand-900 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href={BUSINESS.facebook}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-lime-400 hover:text-brand-900 transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tienda" className="hover:text-lime-300 transition-colors">Tienda</Link></li>
            <li><Link to="/servicios" className="hover:text-lime-300 transition-colors">Servicios</Link></li>
            <li><Link to="/turnos" className="hover:text-lime-300 transition-colors">Reservar turno</Link></li>
            <li><Link to="/turnos/gestionar" className="hover:text-lime-300 transition-colors">Gestionar mi turno</Link></li>
            <li><Link to="/nosotros" className="hover:text-lime-300 transition-colors">Nosotros</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">Contacto</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2 items-start">
              <MapPin size={16} className="mt-0.5 shrink-0 text-lime-400" />
              <a href={BUSINESS.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-lime-300 transition-colors">
                Ver ubicación en Google Maps
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <Phone size={16} className="shrink-0 text-lime-400" />
              <span>{BUSINESS.legalPhone}</span>
            </li>
            <li className="flex gap-2 items-center">
              <Mail size={16} className="shrink-0 text-lime-400" />
              <span>{BUSINESS.email}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4 flex items-center gap-2">
            <Clock size={16} className="text-lime-400" /> Horarios
          </h4>
          <ul className="space-y-2 text-sm">
            {formatHoursLine().map((h) => (
              <li key={h.label} className="flex justify-between gap-4">
                <span className="text-brand-300">{h.label}</span>
                <span className="font-semibold">{h.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-brand-300 relative">
        © {new Date().getFullYear()} DS Vet & Petshop · Todos los derechos reservados
      </div>
    </footer>
  );
}
