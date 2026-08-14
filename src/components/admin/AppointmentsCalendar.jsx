import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { getServiceById } from "../../data/services";

const DAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const STATUS_DOT = {
  pendiente: "bg-amber-400",
  confirmado: "bg-lime-500",
  cancelado: "bg-red-400",
};

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diffToMonday);
  d.setHours(0, 0, 0, 0);
  return d;
}

function toKey(date) {
  return date.toISOString().slice(0, 10);
}

export default function AppointmentsCalendar({ appointments, onSelectStatus }) {
  const [weekOffset, setWeekOffset] = useState(0);

  const days = useMemo(() => {
    const anchor = new Date();
    anchor.setDate(anchor.getDate() + weekOffset * 7);
    const monday = startOfWeek(anchor);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }, [weekOffset]);

  const byDay = useMemo(() => {
    const map = {};
    for (const a of appointments) {
      map[a.date] = map[a.date] || [];
      map[a.date].push(a);
    }
    Object.values(map).forEach((list) => list.sort((a, b) => (a.time > b.time ? 1 : -1)));
    return map;
  }, [appointments]);

  const rangeLabel = `${days[0].toLocaleDateString("es-AR", { day: "2-digit", month: "short" })} – ${days[6].toLocaleDateString("es-AR", { day: "2-digit", month: "short" })}`;
  const todayKey = toKey(new Date());

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekOffset((w) => w - 1)}
            className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center text-brand-700 hover:bg-brand-50"
            aria-label="Semana anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center text-brand-700 hover:bg-brand-50"
            aria-label="Semana siguiente"
          >
            <ChevronRight size={16} />
          </button>
          <span className="font-display font-bold text-brand-900 ml-2 capitalize">{rangeLabel}</span>
        </div>
        {weekOffset !== 0 && (
          <button
            onClick={() => setWeekOffset(0)}
            className="text-xs font-display font-bold text-brand-600 bg-brand-50 px-3 py-1.5 rounded-full hover:bg-brand-100"
          >
            Ir a hoy
          </button>
        )}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((d, i) => {
          const key = toKey(d);
          const isToday = key === todayKey;
          const dayAppts = byDay[key] || [];
          return (
            <div key={key} className={`rounded-2xl p-2 min-h-[160px] ${isToday ? "bg-brand-50 ring-2 ring-brand-300" : "bg-white shadow-soft"}`}>
              <p className={`text-center text-xs font-display font-bold mb-2 ${isToday ? "text-brand-700" : "text-ink/50"}`}>
                {DAY_LABELS[i]} <span className="block text-sm">{d.getDate()}</span>
              </p>
              <div className="space-y-1.5">
                {dayAppts.map((a) => {
                  const service = getServiceById(a.service);
                  return (
                    <motion.button
                      key={a.id}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => onSelectStatus?.(a)}
                      title={`${a.petName} · ${service?.label} · ${a.ownerName}`}
                      className="w-full text-left bg-brand-50/80 hover:bg-brand-100 rounded-lg px-2 py-1.5"
                    >
                      <span className="flex items-center gap-1 text-[10px] font-bold text-brand-700">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[a.status]}`} />
                        <Clock size={9} /> {a.time}
                      </span>
                      <span className="block text-[11px] font-display font-semibold text-brand-900 truncate">
                        {a.petName}
                      </span>
                    </motion.button>
                  );
                })}
                {dayAppts.length === 0 && <p className="text-center text-[10px] text-ink/30 mt-4">—</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
