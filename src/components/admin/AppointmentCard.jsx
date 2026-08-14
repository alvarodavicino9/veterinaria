import { motion } from "framer-motion";
import { Phone, Mail, Cat, Dog, PawPrint, Calendar, Clock, StickyNote } from "lucide-react";
import { getServiceById } from "../../data/services";
import { useAdminDataStore } from "../../store/adminDataStore";
import { shortCode } from "../../lib/codes";
import StatusBadge from "./StatusBadge";

const PET_ICONS = { Perro: Dog, Gato: Cat, Otro: PawPrint };
const STATUS_OPTIONS = ["pendiente", "confirmado", "cancelado"];

export default function AppointmentCard({ appt, index = 0 }) {
  const service = getServiceById(appt.service);
  const setStatus = useAdminDataStore((s) => s.setAppointmentStatus);
  const PetIcon = PET_ICONS[appt.petType] || PawPrint;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
      className="bg-white rounded-2xl p-5 shadow-soft grid sm:grid-cols-[auto_1fr_auto] gap-4 items-start"
    >
      <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
        <PetIcon size={22} />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-display font-bold text-brand-900">
            {appt.petName} <span className="text-ink/40 font-normal">· {appt.petType}</span>
          </p>
          <StatusBadge status={appt.status} />
          <span className="text-[10px] font-mono font-bold text-brand-400 bg-brand-50 px-2 py-0.5 rounded-full">
            #{shortCode(appt.id)}
          </span>
        </div>
        <p className="text-sm text-brand-700 font-semibold mt-1">
          {service?.label} — {appt.subService}
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-xs text-ink/60">
          <span className="flex items-center gap-1">
            <Calendar size={13} /> {new Date(appt.date + "T00:00:00").toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} /> {appt.time}hs
          </span>
          <span className="flex items-center gap-1">
            <Phone size={13} /> {appt.ownerPhone}
          </span>
          <span className="flex items-center gap-1">
            <Mail size={13} /> {appt.ownerEmail}
          </span>
        </div>

        <p className="text-xs text-ink/50 mt-2">
          <span className="font-semibold text-ink/70">Dueño/a:</span> {appt.ownerName}
        </p>

        {appt.notes && (
          <p className="flex items-start gap-1.5 text-xs text-ink/50 mt-2 bg-brand-50/60 rounded-lg p-2">
            <StickyNote size={13} className="mt-0.5 shrink-0" /> {appt.notes}
          </p>
        )}
      </div>

      <select
        value={appt.status}
        onChange={(e) => setStatus(appt.id, e.target.value)}
        className="justify-self-start sm:justify-self-end text-xs font-display font-semibold border border-brand-100 rounded-full px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 capitalize"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </motion.div>
  );
}
