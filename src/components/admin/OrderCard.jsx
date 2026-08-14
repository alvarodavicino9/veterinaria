import { motion } from "framer-motion";
import { Phone, Mail, Store, Truck, CreditCard } from "lucide-react";
import { useAdminDataStore } from "../../store/adminDataStore";
import { formatPrice } from "../shop/ProductCard";
import { shortCode } from "../../lib/codes";
import StatusBadge from "./StatusBadge";

const STATUS_OPTIONS = ["nuevo", "preparando", "listo", "entregado"];

export default function OrderCard({ order, index = 0 }) {
  const setStatus = useAdminDataStore((s) => s.setOrderStatus);
  const FulfillIcon = order.fulfillment === "envío a domicilio" ? Truck : Store;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
      className="bg-white rounded-2xl p-5 shadow-soft grid sm:grid-cols-[1fr_auto] gap-4"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-display font-bold text-brand-900">#{shortCode(order.id)}</p>
          <StatusBadge status={order.status} />
          <span className="flex items-center gap-1 text-xs text-ink/50 ml-auto sm:ml-0">
            <FulfillIcon size={13} /> {order.fulfillment}
          </span>
        </div>

        <p className="text-sm font-semibold text-brand-700 mt-2">{order.customerName}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-1 text-xs text-ink/60">
          <span className="flex items-center gap-1"><Phone size={13} /> {order.customerPhone}</span>
          <span className="flex items-center gap-1"><Mail size={13} /> {order.customerEmail}</span>
          <span className="flex items-center gap-1"><CreditCard size={13} /> {order.paymentMethod}</span>
        </div>
        {order.address && <p className="text-xs text-ink/50 mt-1">Dirección: {order.address}</p>}

        <div className="mt-3 space-y-1 border-t border-brand-50 pt-3">
          {order.items.map((i) => (
            <div key={i.id} className="flex justify-between text-xs text-ink/60">
              <span>{i.qty}x {i.name}</span>
              <span className="font-semibold">{formatPrice(i.qty * i.price)}</span>
            </div>
          ))}
        </div>
        <p className="text-right font-display font-extrabold text-brand-800 mt-2">{formatPrice(order.total)}</p>
      </div>

      <select
        value={order.status}
        onChange={(e) => setStatus(order.id, e.target.value)}
        className="h-fit justify-self-start sm:justify-self-end text-xs font-display font-semibold border border-brand-100 rounded-full px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 capitalize"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </motion.div>
  );
}
