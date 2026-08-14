import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-6 py-32 text-center">
      <PawPrint size={48} className="mx-auto text-brand-300 mb-6" />
      <h1 className="font-display font-extrabold text-3xl text-brand-900">Página no encontrada</h1>
      <p className="text-ink/60 mt-3">Parece que esta huella se perdió en el camino.</p>
      <Link to="/" className="inline-block mt-8">
        <Button variant="primary">Volver al inicio</Button>
      </Link>
    </div>
  );
}
