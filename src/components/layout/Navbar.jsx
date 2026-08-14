import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, CalendarHeart } from "lucide-react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { useCartStore, selectTotalItems } from "../../store/cartStore";

const LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/tienda", label: "Tienda" },
  { to: "/servicios", label: "Servicios" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore(selectTotalItems);
  const toggleCart = useCartStore((s) => s.toggleCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-all ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <Logo size="md" animated />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-display font-semibold text-sm transition-colors ${
                  isActive ? "bg-brand-600 text-white" : "text-brand-800 hover:bg-brand-50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/turnos" className="hidden sm:block">
            <Button variant="lime" size="sm" icon={CalendarHeart} iconPosition="left">
              Reservar turno
            </Button>
          </Link>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleCart}
            className="relative p-2.5 rounded-full hover:bg-brand-50 text-brand-800"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={22} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-lime-400 text-brand-900 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button
            className="lg:hidden p-2.5 rounded-full hover:bg-brand-50 text-brand-800"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white border-t border-brand-100"
          >
            <div className="flex flex-col p-4 gap-1">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-display font-semibold text-sm ${
                      isActive ? "bg-brand-600 text-white" : "text-brand-800 hover:bg-brand-50"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/turnos" onClick={() => setMobileOpen(false)} className="mt-2">
                <Button variant="lime" className="w-full" icon={CalendarHeart} iconPosition="left">
                  Reservar turno
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
