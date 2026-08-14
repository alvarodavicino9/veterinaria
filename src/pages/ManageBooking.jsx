import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Cat,
  Dog,
  PawPrint,
  Calendar,
  Clock,
  XCircle,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  AlertTriangle,
} from "lucide-react";
import { useAdminDataStore } from "../store/adminDataStore";
import { getServiceById } from "../data/services";
import { nextOpenDays, slotsForDate } from "../lib/hours";
import { shortCode } from "../lib/codes";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";

const PET_ICONS = { Perro: Dog, Gato: Cat, Otro: PawPrint };

export default function ManageBooking() {
  const appointments = useAdminDataStore((s) => s.appointments);
  const setAppointmentStatus = useAdminDataStore((s) => s.setAppointmentStatus);
  const updateAppointment = useAdminDataStore((s) => s.updateAppointment);

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [foundId, setFoundId] = useState(null);
  const [mode, setMode] = useState("view"); // "view" | "reschedule"
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [rescheduled, setRescheduled] = useState(false);
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState("");

  const appointment = appointments.find((a) => a.id === foundId);
  const service = appointment ? getServiceById(appointment.service) : null;
  const openDays = useMemo(() => nextOpenDays(14), []);
  const slots = useMemo(
    () => (newDate ? slotsForDate(newDate, { durationMin: service?.duration || 30 }) : []),
    [newDate, service]
  );

  const handleLookup = (e) => {
    e.preventDefault();
    setError("");
    setCancelled(false);
    setRescheduled(false);
    setMode("view");
    const match = appointments.find(
      (a) =>
        shortCode(a.id) === code.trim().toUpperCase() &&
        a.ownerEmail.trim().toLowerCase() === email.trim().toLowerCase()
    );
    if (!match) {
      setError("No encontramos ningún turno con ese código y email. Revisá los datos e intentá de nuevo.");
      setFoundId(null);
      return;
    }
    setFoundId(match.id);
  };

  const handleCancel = () => {
    setAppointmentStatus(appointment.id, "cancelado");
    setConfirmingCancel(false);
    setCancelled(true);
  };

  const handleReschedule = () => {
    if (!newDate || !newTime) return;
    updateAppointment(appointment.id, {
      date: newDate.toISOString().slice(0, 10),
      time: newTime,
      status: "pendiente",
    });
    setMode("view");
    setRescheduled(true);
    setNewDate(null);
    setNewTime("");
  };

  const PetIcon = appointment ? PET_ICONS[appointment.petType] || PawPrint : PawPrint;

  return (
    <div className="max-w-xl mx-auto px-6 py-14">
      <Reveal className="text-center mb-10">
        <span className="text-brand-500 font-display font-bold text-sm uppercase tracking-wide">
          Gestionar turno
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-900 mt-2">
          Cancelá o reprogramá tu turno
        </h1>
        <p className="text-ink/60 mt-3">
          Ingresá el código que te dimos al reservar junto con tu email para encontrar tu turno.
        </p>
      </Reveal>

      {!appointment && (
        <form onSubmit={handleLookup} className="bg-white rounded-3xl p-6 shadow-soft space-y-4">
          <div>
            <label className="block text-sm font-display font-semibold text-brand-800 mb-1.5">
              Código de turno
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ej: A1B2C3"
              className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400 uppercase tracking-wider font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-display font-semibold text-brand-800 mb-1.5">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="El que usaste al reservar"
              className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
          {error && (
            <p className="flex items-start gap-2 text-red-500 text-sm bg-red-50 rounded-xl p-3">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" /> {error}
            </p>
          )}
          <Button variant="primary" icon={Search} iconPosition="left" type="submit" className="w-full">
            Buscar mi turno
          </Button>
          <Link
            to="/turnos"
            className="flex items-center justify-center gap-1 text-brand-600 text-sm font-display font-semibold hover:gap-1.5 transition-all"
          >
            <ChevronLeft size={14} /> Volver a reservar
          </Link>
        </form>
      )}

      <AnimatePresence mode="wait">
        {appointment && (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {(cancelled || rescheduled) && (
              <div className="flex items-center gap-2 bg-lime-100 text-lime-700 rounded-xl p-3 text-sm font-display font-semibold">
                <CheckCircle2 size={17} />
                {cancelled ? "Tu turno fue cancelado." : "Tu turno fue reprogramado con éxito."}
              </div>
            )}

            <div className="bg-white rounded-3xl p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <PetIcon size={22} />
                </div>
                <div>
                  <p className="font-display font-bold text-brand-900">
                    {appointment.petName} <span className="text-ink/40 font-normal">· {appointment.petType}</span>
                  </p>
                  <p className="text-sm text-brand-700 font-semibold">
                    {service?.label} — {appointment.subService}
                  </p>
                </div>
                <span
                  className={`ml-auto px-3 py-1 rounded-full text-xs font-display font-bold capitalize ${
                    appointment.status === "cancelado"
                      ? "bg-red-100 text-red-600"
                      : appointment.status === "confirmado"
                      ? "bg-lime-100 text-lime-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-1.5 mt-4 text-sm text-ink/60">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {new Date(appointment.date + "T00:00:00").toLocaleDateString("es-AR", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {appointment.time}hs
                </span>
              </div>
            </div>

            {appointment.status !== "cancelado" && mode === "view" && (
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  icon={CalendarClock}
                  iconPosition="left"
                  onClick={() => {
                    setMode("reschedule");
                    setNewDate(null);
                    setNewTime("");
                  }}
                >
                  Reprogramar
                </Button>
                {!confirmingCancel ? (
                  <Button variant="ghost" icon={XCircle} iconPosition="left" onClick={() => setConfirmingCancel(true)}>
                    Cancelar turno
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 bg-red-50 rounded-full pl-4 pr-1.5 py-1.5">
                    <span className="text-sm text-red-600 font-semibold">¿Seguro?</span>
                    <button
                      onClick={handleCancel}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full"
                    >
                      Sí, cancelar
                    </button>
                    <button
                      onClick={() => setConfirmingCancel(false)}
                      className="text-red-500 text-xs font-semibold px-2"
                    >
                      Volver
                    </button>
                  </div>
                )}
              </div>
            )}

            {mode === "reschedule" && (
              <div className="bg-white rounded-3xl p-6 shadow-soft">
                <p className="font-display font-bold text-brand-900 mb-4">Elegí el nuevo día y horario</p>
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
                  {openDays.map((d) => {
                    const active = newDate && d.toDateString() === newDate.toDateString();
                    return (
                      <button
                        key={d.toISOString()}
                        onClick={() => {
                          setNewDate(d);
                          setNewTime("");
                        }}
                        className={`shrink-0 flex flex-col items-center px-4 py-3 rounded-2xl border-2 font-display transition-colors ${
                          active ? "border-brand-600 bg-brand-600 text-white" : "border-brand-100 bg-white text-brand-800 hover:border-brand-300"
                        }`}
                      >
                        <span className="text-xs opacity-70 capitalize">
                          {d.toLocaleDateString("es-AR", { weekday: "short" })}
                        </span>
                        <span className="text-lg font-bold">{d.getDate()}</span>
                      </button>
                    );
                  })}
                </div>

                {newDate && (
                  <div className="mt-5">
                    <p className="font-display font-semibold text-sm text-brand-800 mb-3">Horarios disponibles</p>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setNewTime(slot)}
                          className={`py-2 rounded-xl text-sm font-semibold border-2 transition-colors ${
                            newTime === slot ? "border-lime-400 bg-lime-400 text-brand-900" : "border-brand-100 bg-white text-brand-700 hover:border-brand-300"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <Button variant="ghost" onClick={() => setMode("view")}>
                    Cancelar
                  </Button>
                  <Button variant="primary" icon={CheckCircle2} disabled={!newDate || !newTime} onClick={handleReschedule}>
                    Confirmar cambio
                  </Button>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setFoundId(null);
                setCode("");
                setEmail("");
              }}
              className="text-brand-500 text-sm font-display font-semibold underline underline-offset-2"
            >
              Buscar otro turno
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
