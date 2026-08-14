import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Store, Truck, CreditCard, PartyPopper } from "lucide-react";
import { useCartStore, selectTotalPrice } from "../store/cartStore";
import { useAdminDataStore } from "../store/adminDataStore";
import { useProductsStore } from "../store/productsStore";
import { formatPrice } from "../components/shop/ProductCard";
import Button from "../components/ui/Button";
import { WhatsAppIcon } from "../components/ui/SocialIcons";
import { waLink } from "../lib/whatsapp";
import { shortCode } from "../lib/codes";

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore(selectTotalPrice);
  const clear = useCartStore((s) => s.clear);
  const addOrder = useAdminDataStore((s) => s.addOrder);
  const decrementForOrder = useProductsStore((s) => s.decrementForOrder);

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    fulfillment: "retiro en local",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [processing, setProcessing] = useState(false);

  if (items.length === 0 && !confirmedOrder) {
    return <Navigate to="/tienda" replace />;
  }

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.customerName.trim()) errs.customerName = "Ingresá tu nombre";
    if (!/^[\d+()\s-]{6,}$/.test(form.customerPhone)) errs.customerPhone = "Ingresá un teléfono válido";
    if (!/^\S+@\S+\.\S+$/.test(form.customerEmail)) errs.customerEmail = "Ingresá un email válido";
    if (form.fulfillment === "envío a domicilio" && !form.address.trim())
      errs.address = "Ingresá tu dirección de envío";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setProcessing(true);
    // Simulated Mercado Pago checkout — swap for real MP Checkout Pro/API integration.
    setTimeout(() => {
      const order = addOrder({
        items: items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
        total,
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        customerEmail: form.customerEmail,
        fulfillment: form.fulfillment,
        address: form.fulfillment === "envío a domicilio" ? form.address : null,
        paymentMethod: "Mercado Pago",
      });
      decrementForOrder(items.map((i) => ({ id: i.id, qty: i.qty })));
      setConfirmedOrder(order);
      clear();
      setProcessing(false);
    }, 1100);
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="w-20 h-20 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={40} />
        </motion.div>
        <h1 className="font-display font-extrabold text-3xl text-brand-900 flex items-center justify-center gap-2">
          ¡Pedido confirmado! <PartyPopper className="text-lime-500" size={26} />
        </h1>
        <p className="text-ink/60 mt-3">
          Tu pedido <span className="font-mono font-semibold text-brand-700">#{shortCode(confirmedOrder.id)}</span> fue
          registrado. Te enviamos la confirmación a {confirmedOrder.customerEmail}.
        </p>
        <div className="mt-8 bg-white rounded-3xl p-6 shadow-soft text-left">
          <p className="font-display font-bold text-brand-900 mb-3">Resumen</p>
          {confirmedOrder.items.map((i) => (
            <div key={i.id} className="flex justify-between text-sm py-1.5">
              <span className="text-ink/60">{i.qty}x {i.name}</span>
              <span className="font-semibold">{formatPrice(i.qty * i.price)}</span>
            </div>
          ))}
          <div className="border-t border-brand-50 mt-3 pt-3 flex justify-between font-display font-bold text-brand-800">
            <span>Total</span>
            <span>{formatPrice(confirmedOrder.total)}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <a
            href={waLink(
              `¡Hola! Quiero avisar que hice el pedido #${shortCode(confirmedOrder.id)} (${confirmedOrder.fulfillment}) por un total de ${formatPrice(confirmedOrder.total)}.`
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-sm px-5 py-3 rounded-full shadow-soft transition-colors"
          >
            <WhatsAppIcon size={16} /> Avisar por WhatsApp
          </a>
          <Link to="/tienda">
            <Button variant="outline">Seguir comprando</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-14 grid lg:grid-cols-2 gap-10">
      <div>
        <h1 className="font-display font-extrabold text-3xl text-brand-900 mb-8">Finalizar compra</h1>

        <form onSubmit={handlePay} className="space-y-5">
          <div>
            <label className="block text-sm font-display font-semibold text-brand-800 mb-1.5">Nombre completo</label>
            <input
              value={form.customerName}
              onChange={update("customerName")}
              className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
              placeholder="Tu nombre"
            />
            {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-display font-semibold text-brand-800 mb-1.5">Teléfono</label>
              <input
                value={form.customerPhone}
                onChange={update("customerPhone")}
                className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
                placeholder="+54 9 ..."
              />
              {errors.customerPhone && <p className="text-red-500 text-xs mt-1">{errors.customerPhone}</p>}
            </div>
            <div>
              <label className="block text-sm font-display font-semibold text-brand-800 mb-1.5">Email</label>
              <input
                value={form.customerEmail}
                onChange={update("customerEmail")}
                className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
                placeholder="tu@email.com"
              />
              {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-display font-semibold text-brand-800 mb-2">Entrega</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "retiro en local", label: "Retiro en local", icon: Store },
                { id: "envío a domicilio", label: "Envío a domicilio", icon: Truck },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setForm((f) => ({ ...f, fulfillment: opt.id }))}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-display font-semibold text-sm transition-colors ${
                    form.fulfillment === opt.id
                      ? "border-brand-600 bg-brand-50 text-brand-800"
                      : "border-brand-100 text-ink/60 hover:border-brand-200"
                  }`}
                >
                  <opt.icon size={16} /> {opt.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {form.fulfillment === "envío a domicilio" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-display font-semibold text-brand-800 mb-1.5">Dirección</label>
                <input
                  value={form.address}
                  onChange={update("address")}
                  className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  placeholder="Calle, número, barrio"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </motion.div>
            )}
          </AnimatePresence>

          <Button variant="primary" size="lg" className="w-full mt-4" icon={CreditCard} iconPosition="left" type="submit">
            {processing ? "Procesando..." : "Pagar con Mercado Pago"}
          </Button>
          <p className="text-xs text-ink/40 text-center">
            Checkout simulado para este prototipo — se integra con Mercado Pago Checkout Pro en la versión final.
          </p>
        </form>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-soft h-fit sticky top-24">
        <h2 className="font-display font-bold text-lg text-brand-900 mb-4">Tu pedido</h2>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {items.map((i) => (
            <div key={i.id} className="flex justify-between text-sm py-1.5 border-b border-brand-50 last:border-0">
              <span className="text-ink/60">{i.qty}x {i.name}</span>
              <span className="font-semibold shrink-0 ml-2">{formatPrice(i.qty * i.price)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-brand-100 mt-4 pt-4 flex justify-between font-display font-extrabold text-brand-800 text-lg">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
