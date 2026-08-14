import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore, selectTotalPrice } from "../../store/cartStore";
import { formatPrice } from "./ProductCard";
import Button from "../ui/Button";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const closeCart = useCartStore((s) => s.closeCart);
  const setQty = useCartStore((s) => s.setQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartStore(selectTotalPrice);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-brand-900/50 backdrop-blur-sm z-40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-cream z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-brand-100 bg-white">
              <h2 className="font-display font-bold text-lg text-brand-800 flex items-center gap-2">
                <ShoppingBag size={20} /> Tu carrito
              </h2>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-brand-50 text-brand-700"
                aria-label="Cerrar carrito"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 && (
                <div className="text-center py-16 text-ink/50">
                  <ShoppingBag size={40} className="mx-auto mb-3 opacity-40" />
                  <p className="font-medium">Todavía no agregaste productos</p>
                </div>
              )}
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-3 bg-white rounded-2xl p-3 shadow-soft"
                >
                  <div className="w-16 h-16 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                    <ShoppingBag size={22} className="text-brand-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm text-brand-900 line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-brand-600 font-bold text-sm mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => setQty(item.id, item.qty - 1)}
                        className="w-7 h-7 rounded-full bg-brand-50 hover:bg-brand-100 flex items-center justify-center text-brand-700"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        onClick={() => setQty(item.id, item.qty + 1)}
                        className="w-7 h-7 rounded-full bg-brand-50 hover:bg-brand-100 flex items-center justify-center text-brand-700"
                      >
                        <Plus size={13} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-ink/30 hover:text-red-500 transition-colors"
                        aria-label="Quitar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="border-t border-brand-100 bg-white px-5 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold text-ink/70">Total</span>
                  <span className="font-display font-extrabold text-xl text-brand-700">
                    {formatPrice(total)}
                  </span>
                </div>
                <Link to="/tienda/checkout" onClick={closeCart}>
                  <Button variant="primary" className="w-full">
                    Finalizar compra
                  </Button>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
