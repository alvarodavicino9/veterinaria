import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { formatHoursLine } from "../lib/hours";
import Reveal from "../components/ui/Reveal";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "../components/ui/SocialIcons";
import { BUSINESS, WHATSAPP_DEFAULT_MESSAGE } from "../data/business";
import { waLink } from "../lib/whatsapp";

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <Reveal className="text-center max-w-xl mx-auto mb-14">
        <span className="text-brand-500 font-display font-bold text-sm uppercase tracking-wide">
          Contacto
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-900 mt-2">
          Hablemos
        </h1>
        <p className="text-ink/60 mt-3">
          Escribinos por WhatsApp, mail o visitanos en el local — también podés reservar tu turno online.
        </p>
      </Reveal>

      <div className="grid lg:grid-cols-2 gap-8">
        <Reveal className="rounded-3xl overflow-hidden bg-brand-100 relative min-h-[360px] flex items-center justify-center">
          <div className="absolute inset-0 paw-bg text-brand-300/40" />
          <div className="relative text-center px-6">
            <MapPin size={36} className="mx-auto text-brand-600 mb-3" />
            <p className="font-display font-bold text-brand-800">{BUSINESS.name} · {BUSINESS.addressLabel}</p>
            <p className="text-brand-600 text-sm mt-1">Reemplazar por mapa embebido de Google Maps</p>
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-brand-700 font-display font-semibold underline"
            >
              Abrir en Google Maps
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-4">
          <a
            href={waLink(WHATSAPP_DEFAULT_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            className="bg-white rounded-3xl p-6 shadow-soft flex items-center gap-4 hover:bg-green-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
              <WhatsAppIcon size={20} />
            </div>
            <div>
              <p className="font-display font-bold text-brand-900">Teléfono / WhatsApp</p>
              <p className="text-ink/60 text-sm">{BUSINESS.legalPhone}</p>
            </div>
          </a>

          <div className="bg-white rounded-3xl p-6 shadow-soft flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <p className="font-display font-bold text-brand-900">Email</p>
              <p className="text-ink/60 text-sm">{BUSINESS.email}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-soft">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <p className="font-display font-bold text-brand-900">Horarios</p>
            </div>
            <ul className="space-y-2 pl-1">
              {formatHoursLine().map((h) => (
                <li key={h.label} className="flex justify-between text-sm">
                  <span className="text-ink/60">{h.label}</span>
                  <span className="font-semibold text-brand-800">{h.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <a href={BUSINESS.instagram} className="flex-1 bg-white rounded-2xl p-4 shadow-soft flex items-center justify-center gap-2 font-display font-semibold text-brand-700 hover:bg-brand-50 transition-colors">
              <InstagramIcon size={18} /> Instagram
            </a>
            <a href={BUSINESS.facebook} className="flex-1 bg-white rounded-2xl p-4 shadow-soft flex items-center justify-center gap-2 font-display font-semibold text-brand-700 hover:bg-brand-50 transition-colors">
              <FacebookIcon size={18} /> Facebook
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
