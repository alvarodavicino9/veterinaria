import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  ShoppingBag,
  Clock3,
  DollarSign,
  LogOut,
  ExternalLink,
  Search,
  List,
  CalendarDays,
  PackageX,
} from "lucide-react";
import Logo from "../components/ui/Logo";
import StatCard from "../components/admin/StatCard";
import AppointmentCard from "../components/admin/AppointmentCard";
import AppointmentsCalendar from "../components/admin/AppointmentsCalendar";
import OrderCard from "../components/admin/OrderCard";
import ProductRow from "../components/admin/ProductRow";
import { useAdminDataStore } from "../store/adminDataStore";
import { useAuthStore } from "../store/authStore";
import { useProductsStore, LOW_STOCK_THRESHOLD } from "../store/productsStore";
import { formatPrice } from "../components/shop/ProductCard";

const today = () => new Date().toISOString().slice(0, 10);

export default function AdminDashboard() {
  const appointments = useAdminDataStore((s) => s.appointments);
  const orders = useAdminDataStore((s) => s.orders);
  const products = useProductsStore((s) => s.products);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [tab, setTab] = useState("turnos");
  const [turnosView, setTurnosView] = useState("lista");
  const [query, setQuery] = useState("");

  const stats = useMemo(() => {
    const todayStr = today();
    const turnosHoy = appointments.filter((a) => a.date === todayStr).length;
    const turnosPendientes = appointments.filter((a) => a.status === "pendiente").length;
    const pedidosNuevos = orders.filter((o) => o.status === "nuevo").length;
    const ingresosHoy = orders
      .filter((o) => o.createdAt.slice(0, 10) === todayStr)
      .reduce((sum, o) => sum + o.total, 0);
    const stockBajo = products.filter((p) => p.active && p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD).length;
    return { turnosHoy, turnosPendientes, pedidosNuevos, ingresosHoy, stockBajo };
  }, [appointments, orders, products]);

  const filteredAppointments = useMemo(() => {
    const q = query.toLowerCase();
    return appointments
      .filter((a) => `${a.petName} ${a.ownerName} ${a.subService}`.toLowerCase().includes(q))
      .sort((a, b) => (a.date + a.time > b.date + b.time ? 1 : -1));
  }, [appointments, query]);

  const filteredOrders = useMemo(() => {
    const q = query.toLowerCase();
    return orders
      .filter((o) => `${o.customerName} ${o.id}`.toLowerCase().includes(q))
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [orders, query]);

  const filteredProducts = useMemo(() => {
    const q = query.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, query]);

  const searchPlaceholder =
    tab === "turnos" ? "Buscar mascota o dueño..." : tab === "pedidos" ? "Buscar cliente o #pedido..." : "Buscar producto...";

  return (
    <div className="min-h-screen bg-brand-50/40">
      <header className="bg-white shadow-soft sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            <Link to="/" target="_blank" className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-800">
              Ver sitio público <ExternalLink size={13} />
            </Link>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-display font-bold text-brand-900">{user?.name}</p>
              <p className="text-xs text-ink/50">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-2.5 rounded-full hover:bg-brand-50 text-brand-700"
              aria-label="Cerrar sesión"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-900 mb-1">
          Panel de vendedores
        </h1>
        <p className="text-ink/50 text-sm mb-8">
          Acá te llegan, en detalle, todos los turnos reservados y pedidos hechos desde la web.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <StatCard icon={CalendarCheck} label="Turnos hoy" value={stats.turnosHoy} />
          <StatCard icon={Clock3} label="Turnos pendientes" value={stats.turnosPendientes} accent="lime" />
          <StatCard icon={ShoppingBag} label="Pedidos nuevos" value={stats.pedidosNuevos} />
          <StatCard icon={DollarSign} label="Ingresos de hoy" value={formatPrice(stats.ingresosHoy)} accent="lime" />
          <StatCard icon={PackageX} label="Productos con poco stock" value={stats.stockBajo} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-2 bg-white rounded-full p-1 shadow-soft">
            {[
              { id: "turnos", label: `Turnos (${appointments.length})` },
              { id: "pedidos", label: `Pedidos (${orders.length})` },
              { id: "productos", label: `Productos (${products.length})` },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2 rounded-full text-sm font-display font-bold transition-colors ${
                  tab === t.id ? "bg-brand-600 text-white" : "text-brand-700 hover:bg-brand-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {tab === "turnos" && (
              <div className="flex gap-1 bg-white rounded-full p-1 shadow-soft">
                <button
                  onClick={() => setTurnosView("lista")}
                  className={`p-2 rounded-full transition-colors ${turnosView === "lista" ? "bg-brand-600 text-white" : "text-brand-600 hover:bg-brand-50"}`}
                  aria-label="Vista lista"
                >
                  <List size={15} />
                </button>
                <button
                  onClick={() => setTurnosView("calendario")}
                  className={`p-2 rounded-full transition-colors ${turnosView === "calendario" ? "bg-brand-600 text-white" : "text-brand-600 hover:bg-brand-50"}`}
                  aria-label="Vista calendario"
                >
                  <CalendarDays size={15} />
                </button>
              </div>
            )}

            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="pl-9 pr-4 py-2.5 rounded-full bg-white shadow-soft border border-brand-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 w-64"
              />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tab === "turnos" ? (
            turnosView === "calendario" ? (
              <motion.div key="turnos-cal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AppointmentsCalendar appointments={filteredAppointments} />
              </motion.div>
            ) : (
              <motion.div key="turnos-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                {filteredAppointments.length === 0 && (
                  <p className="text-center text-ink/40 py-16">No hay turnos que coincidan con la búsqueda.</p>
                )}
                {filteredAppointments.map((a, i) => (
                  <AppointmentCard key={a.id} appt={a} index={i} />
                ))}
              </motion.div>
            )
          ) : tab === "pedidos" ? (
            <motion.div key="pedidos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              {filteredOrders.length === 0 && (
                <p className="text-center text-ink/40 py-16">No hay pedidos que coincidan con la búsqueda.</p>
              )}
              {filteredOrders.map((o, i) => (
                <OrderCard key={o.id} order={o} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div key="productos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
              {filteredProducts.length === 0 && (
                <p className="text-center text-ink/40 py-16">No hay productos que coincidan con la búsqueda.</p>
              )}
              {filteredProducts.map((p, i) => (
                <ProductRow key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
