import { motion } from "framer-motion";
import { Minus, Plus, EyeOff, Eye } from "lucide-react";
import { useProductsStore, LOW_STOCK_THRESHOLD } from "../../store/productsStore";
import { formatPrice } from "../shop/ProductCard";
import ProductThumb from "../shop/ProductThumb";

export default function ProductRow({ product, index = 0 }) {
  const setStock = useProductsStore((s) => s.setStock);
  const adjustStock = useProductsStore((s) => s.adjustStock);
  const setPrice = useProductsStore((s) => s.setPrice);
  const toggleActive = useProductsStore((s) => s.toggleActive);

  const outOfStock = product.stock === 0;
  const lowStock = !outOfStock && product.stock <= LOW_STOCK_THRESHOLD;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.3) }}
      className={`bg-white rounded-2xl p-4 shadow-soft grid sm:grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center ${
        !product.active ? "opacity-50" : ""
      }`}
    >
      <ProductThumb category={product.category} className="w-14 h-14 shrink-0" />

      <div className="min-w-0">
        <p className="font-display font-bold text-brand-900 text-sm line-clamp-1">{product.name}</p>
        <p className="text-xs text-ink/50 capitalize">{product.category}</p>
        {outOfStock && (
          <span className="inline-block mt-1 text-[10px] font-bold text-white bg-ink/70 px-2 py-0.5 rounded-full">
            Sin stock
          </span>
        )}
        {lowStock && (
          <span className="inline-block mt-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
            Stock bajo
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 justify-self-start sm:justify-self-center">
        <button
          onClick={() => adjustStock(product.id, -1)}
          className="w-7 h-7 rounded-full bg-brand-50 hover:bg-brand-100 flex items-center justify-center text-brand-700"
        >
          <Minus size={13} />
        </button>
        <input
          type="number"
          min="0"
          value={product.stock}
          onChange={(e) => setStock(product.id, e.target.value)}
          className="w-14 text-center text-sm font-display font-bold border border-brand-100 rounded-lg py-1"
        />
        <button
          onClick={() => adjustStock(product.id, 1)}
          className="w-7 h-7 rounded-full bg-brand-50 hover:bg-brand-100 flex items-center justify-center text-brand-700"
        >
          <Plus size={13} />
        </button>
      </div>

      <div className="flex items-center gap-1 justify-self-start sm:justify-self-center">
        <span className="text-ink/40 text-sm">$</span>
        <input
          type="number"
          min="0"
          value={product.price}
          onChange={(e) => setPrice(product.id, e.target.value)}
          className="w-24 text-sm font-display font-bold border border-brand-100 rounded-lg py-1 px-2"
        />
      </div>

      <button
        onClick={() => toggleActive(product.id)}
        className={`justify-self-start sm:justify-self-end flex items-center gap-1.5 text-xs font-display font-bold px-3 py-2 rounded-full transition-colors ${
          product.active ? "bg-lime-100 text-lime-700 hover:bg-lime-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
        }`}
      >
        {product.active ? <Eye size={13} /> : <EyeOff size={13} />}
        {product.active ? "Visible" : "Oculto"}
      </button>
    </motion.div>
  );
}
