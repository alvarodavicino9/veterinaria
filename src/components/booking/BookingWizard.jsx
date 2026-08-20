import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Scissors,
  Syringe,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  PawPrint,
  Cat,
  Dog,
  CalendarPlus,
  KeyRound,
} from "lucide-react";
import { SERVICES } from "../../data/services";
import { nextOpenDays, slotsForDate } from "../../lib/hours";
import { useAdminDataStore } from "../../store/adminDataStore";
import Button from "../ui/Button";
import { WhatsAppIcon } from "../ui/SocialIcons";
import { waLink } from "../../lib/whatsapp";
import { googleCalendarLink } from "../../lib/calendar";
import { shortCode } from "../../lib/codes";

const ICONS = { Stethoscope, Scissors, Syringe };

const STEPS = ["Servicio", "Fecha y hora", "Tus datos", "Confirmación"];

const dateLabel = (d) =>
  d.toLocaleDateString("es-AR", { weekday: "short", day: "2-digit", month: "short" });

export default function BookingWizard({ preselect }) {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(preselect || "");
  const [subService, setSubService] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [details, setDetails] = useState({
    petName: "",
    petType: "Perro",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(null);

  const addAppointment = useAdminDataStore((s) => s.addAppointment);
  const service = SERVICES.find((s) => s.id === serviceId);
  const openDays = useMemo(() => nextOpenDays(14), []);
  const slots = useMemo(() => (date ? slotsForDate(date, { durationMin: service?.duration || 30 }) : []), [date, service]);

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const canGoStep1 = !!serviceId;
  const canGoStep2 = !!date && !!time;

  const validateDetails = () => {
    const errs = {};
    if (!details.petName.trim()) errs.petName = "Ingresá el nombre de tu mascota";
    if (!details.ownerName.trim()) errs.ownerName = "Ingresá tu nombre";
    if (!/^[\d+()\s-]{6,}$/.test(details.ownerPhone)) errs.ownerPhone = "Ingresá un teléfono válido";
    if (!/^\S+@\S+\.\S+$/.test(details.ownerEmail)) errs.ownerEmail = "Ingresá un email válido";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirm = () => {
    if (!validateDetails()) return;
    const appt = addAppointment({
      service: serviceId,
      subService: subService || service.subServices[0],
      petName: details.petName,
      petType: details.petType,
      ownerName: details.ownerName,
      ownerPhone: details.ownerPhone,
      ownerEmail: details.ownerEmail,
      notes: details.notes,
      date: date.toISOString().slice(0, 10),
      time,
    });
    setConfirmed(appt);
    goNext();
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!confirmed && (
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.slice(0, 3).map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold transition-colors ${
                  i <= step ? "bg-brand-600 text-white" : "bg-brand-100 text-brand-400"
                }`}
              >
                {i + 1}
              </div>
              {i < 2 && <div className={`w-8 h-0.5 ${i < step ? "bg-brand-600" : "bg-brand-100"}`} />}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display font-bold text-2xl text-brand-900 text-center mb-8">
              ¿Qué necesita tu mascota?
            </h2>
            <div className="grid gap-4">
              {SERVICES.map((s) => {
                const Icon = ICONS[s.icon];
                const active = serviceId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setServiceId(s.id);
                      setSubService("");
                    }}
                    className={`flex items-center gap-4 text-left p-5 rounded-2xl border-2 transition-colors ${
                      active ? "border-brand-600 bg-brand-50" : "border-brand-100 bg-white hover:border-brand-200"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${active ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-600"}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-brand-900">{s.label}</p>
                      <p className="text-ink/50 text-sm mt-0.5">{s.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {service && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <p className="font-display font-semibold text-sm text-brand-800 mb-2">Detalle del servicio</p>
                  <div className="flex flex-wrap gap-2">
                    {service.subServices.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSubService(sub)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                          (subService || service.subServices[0]) === sub
                            ? "bg-lime-400 border-lime-400 text-brand-900"
                            : "bg-white border-brand-200 text-brand-700"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-end mt-8">
              <Button variant="primary" icon={ChevronRight} disabled={!canGoStep1} onClick={goNext}>
                Continuar
              </Button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display font-bold text-2xl text-brand-900 text-center mb-8 flex items-center justify-center gap-2">
              <Calendar size={22} className="text-brand-500" /> Elegí día y horario
            </h2>

            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
              {openDays.map((d) => {
                const active = date && d.toDateString() === date.toDateString();
                return (
                  <button
                    key={d.toISOString()}
                    onClick={() => {
                      setDate(d);
                      setTime("");
                    }}
                    className={`shrink-0 flex flex-col items-center px-4 py-3 rounded-2xl border-2 font-display transition-colors ${
                      active ? "border-brand-600 bg-brand-600 text-white" : "border-brand-100 bg-white text-brand-800 hover:border-brand-300"
                    }`}
                  >
                    <span className="text-xs opacity-70 capitalize">{dateLabel(d).split(" ")[0]}</span>
                    <span className="text-lg font-bold">{d.getDate()}</span>
                    <span className="text-[10px] uppercase opacity-70">{dateLabel(d).split(" ")[2]}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {date && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
                  <p className="font-display font-semibold text-sm text-brand-800 mb-3 flex items-center gap-1.5">
                    <Clock size={15} /> Horarios disponibles
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setTime(slot)}
                        className={`py-2 rounded-xl text-sm font-semibold border-2 transition-colors ${
                          time === slot ? "border-lime-400 bg-lime-400 text-brand-900" : "border-brand-100 bg-white text-brand-700 hover:border-brand-300"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <Button variant="ghost" icon={ChevronLeft} iconPosition="left" onClick={goBack}>
                Volver
              </Button>
              <Button variant="primary" icon={ChevronRight} disabled={!canGoStep2} onClick={goNext}>
                Continuar
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display font-bold text-2xl text-brand-900 text-center mb-8">
              Contanos sobre tu mascota
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-display font-semibold text-brand-800 mb-1.5">Nombre de la mascota</label>
                <input
                  value={details.petName}
                  onChange={(e) => setDetails((d) => ({ ...d, petName: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  placeholder="Ej: Simba"
                />
                {errors.petName && <p className="text-red-500 text-xs mt-1">{errors.petName}</p>}
              </div>
              <div>
                <label className="block text-sm font-display font-semibold text-brand-800 mb-1.5">Tipo</label>
                <div className="flex gap-2">
                  {[
                    { id: "Perro", icon: Dog },
                    { id: "Gato", icon: Cat },
                    { id: "Otro", icon: PawPrint },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDetails((d) => ({ ...d, petType: opt.id }))}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 text-sm font-semibold transition-colors ${
                        details.petType === opt.id ? "border-brand-600 bg-brand-50 text-brand-800" : "border-brand-100 text-ink/50"
                      }`}
                    >
                      <opt.icon size={15} /> {opt.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-display font-semibold text-brand-800 mb-1.5">Tu nombre</label>
                <input
                  value={details.ownerName}
                  onChange={(e) => setDetails((d) => ({ ...d, ownerName: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  placeholder="Nombre y apellido"
                />
                {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
              </div>
              <div>
                <label className="block text-sm font-display font-semibold text-brand-800 mb-1.5">Teléfono</label>
                <input
                  value={details.ownerPhone}
                  onChange={(e) => setDetails((d) => ({ ...d, ownerPhone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  placeholder="+54 9 ..."
                />
                {errors.ownerPhone && <p className="text-red-500 text-xs mt-1">{errors.ownerPhone}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-display font-semibold text-brand-800 mb-1.5">Email</label>
              <input
                value={details.ownerEmail}
                onChange={(e) => setDetails((d) => ({ ...d, ownerEmail: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
                placeholder="tu@email.com"
              />
              {errors.ownerEmail && <p className="text-red-500 text-xs mt-1">{errors.ownerEmail}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-display font-semibold text-brand-800 mb-1.5">Notas (opcional)</label>
              <textarea
                value={details.notes}
                onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
                placeholder="Algo que debamos saber antes del turno"
              />
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="ghost" icon={ChevronLeft} iconPosition="left" onClick={goBack}>
                Volver
              </Button>
              <Button variant="primary" icon={CheckCircle2} onClick={handleConfirm}>
                Confirmar turno
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && confirmed && (
          <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="w-20 h-20 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 size={40} />
            </motion.div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-900">¡Turno reservado!</h2>
            <p className="text-ink/60 mt-3">
              Le enviamos la confirmación a {confirmed.ownerEmail}. En el panel de la veterinaria ya quedó
              registrado con todos los detalles.
            </p>

            <div className="mt-8 bg-white rounded-3xl p-6 shadow-soft text-left max-w-sm mx-auto space-y-2">
              <Row label="Servicio" value={service.label} />
              <Row label="Detalle" value={confirmed.subService} />
              <Row label="Mascota" value={`${confirmed.petName} (${confirmed.petType})`} />
              <Row label="Fecha" value={new Date(confirmed.date + "T00:00:00").toLocaleDateString("es-AR", { weekday: "long", day: "2-digit", month: "long" })} />
              <Row label="Hora" value={confirmed.time} />
            </div>

            <div className="mt-4 inline-flex items-center gap-2 bg-brand-50 text-brand-700 rounded-full px-4 py-2 text-sm font-display font-bold">
              <KeyRound size={15} /> Código de turno: {shortCode(confirmed.id)}
            </div>
            <p className="text-xs text-ink/40 mt-2 max-w-sm mx-auto">
              Guardá este código junto con el email que usaste — lo vas a necesitar si querés
              cancelar o reprogramar el turno más adelante.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a
                href={waLink(
                  `¡Hola! Quiero confirmar mi turno de ${service.label.toLowerCase()} (${confirmed.subService}) para ${confirmed.petName} el ${confirmed.date} a las ${confirmed.time}hs. Código: ${shortCode(confirmed.id)}.`
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-sm px-5 py-3 rounded-full shadow-soft transition-colors"
              >
                <WhatsAppIcon size={16} /> Confirmar por WhatsApp
              </a>
              <a
                href={googleCalendarLink({
                  title: `${service.label} · DS Vet & Petshop — ${confirmed.petName}`,
                  details: `Turno de ${confirmed.subService} para ${confirmed.petName}. Código: ${shortCode(confirmed.id)}`,
                  location: "DS Vet & Petshop",
                  date: confirmed.date,
                  time: confirmed.time,
                  durationMin: service.duration,
                })}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white border-2 border-brand-200 hover:border-brand-400 text-brand-700 font-display font-bold text-sm px-5 py-3 rounded-full transition-colors"
              >
                <CalendarPlus size={16} /> Agregar a Google Calendar
              </a>
            </div>

            <Link
              to="/turnos/gestionar"
              className="inline-block mt-6 text-brand-600 text-sm font-display font-semibold underline underline-offset-2 hover:text-brand-800"
            >
              ¿Necesitás cancelar o reprogramar? Gestioná tu turno acá
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm border-b border-brand-50 pb-2 last:border-0 last:pb-0">
      <span className="text-ink/50">{label}</span>
      <span className="font-display font-semibold text-brand-900 text-right ml-4 capitalize">{value}</span>
    </div>
  );
}
