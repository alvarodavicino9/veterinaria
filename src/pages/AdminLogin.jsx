import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, ChevronLeft, Info } from "lucide-react";
import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import { useAuthStore, DEMO_CREDENTIALS } from "../store/authStore";

export default function AdminLogin() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) return <Navigate to="/panel" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/panel");
    } else {
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-800 to-brand-900 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 paw-bg text-white/5" />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-sm"
      >
        <Link to="/" className="inline-flex items-center gap-1 text-brand-500 text-xs font-semibold mb-6 hover:gap-1.5 transition-all">
          <ChevronLeft size={14} /> Volver al sitio
        </Link>

        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>
        <h1 className="font-display font-bold text-xl text-brand-900 text-center">Panel de vendedores</h1>
        <p className="text-ink/50 text-sm text-center mt-1">Ingresá para ver turnos y pedidos</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
            />
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <Button variant="primary" className="w-full" icon={ArrowRight} type="submit">
            Ingresar
          </Button>
        </form>

        <div className="mt-6 flex items-start gap-2 bg-brand-50 rounded-xl p-3 text-xs text-brand-700">
          <Info size={14} className="mt-0.5 shrink-0" />
          <span>
            Demo: <span className="font-mono font-semibold">{DEMO_CREDENTIALS.user}</span> /{" "}
            <span className="font-mono font-semibold">{DEMO_CREDENTIALS.pass}</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
