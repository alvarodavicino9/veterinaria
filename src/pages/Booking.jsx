import { useLocation } from "react-router-dom";
import BookingWizard from "../components/booking/BookingWizard";
import Reveal from "../components/ui/Reveal";

export default function Booking() {
  const location = useLocation();
  const preselect = location.state?.preselect;

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <Reveal className="text-center max-w-xl mx-auto mb-12">
        <span className="text-brand-500 font-display font-bold text-sm uppercase tracking-wide">
          Turnos online
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-900 mt-2">
          Reservá tu turno en 3 pasos
        </h1>
        <p className="text-ink/60 mt-3">
          Elegí el servicio, el día y horario que más te convenga. Recibimos el detalle completo
          al instante en nuestro panel.
        </p>
      </Reveal>

      <BookingWizard preselect={preselect} />
    </div>
  );
}
