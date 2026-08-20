import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ProductThumb from "./ProductThumb";
import { useCartStore } from "../../store/cartStore";
import { LOW_STOCK_THRESHOLD } from "../../store/productsStore";

const formatPrice = (n) => `$${n.toLocaleString("es-AR")}`;

export default function ProductCard({ product, index = 0 }) {
  const addItem = useCartStore((s) => s.addItem);
  const outOfStock = product.stock === 0;
  const lowStock = !outOfStock && product.stock !== undefined && product.stock <= LOW_STOCK_THRESHOLD;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -6 }}
      className={`group bg-white rounded-3xl p-3 shadow-soft flex flex-col ${outOfStock ? "opacity-70" : ""}`}
    >
      <Link to={`/tienda/${product.id}`} className="block relative">
        <ProductThumb product={product} className="w-full aspect-square" />
        {outOfStock ? (
          <span className="absolute top-3 left-3 bg-ink/80 text-white text-xs font-bold font-display px-3 py-1 rounded-full shadow-soft">
            Sin stock
          </span>
        ) : (
          product.badge && (
            <span className="absolute top-3 left-3 bg-lime-400 text-brand-900 text-xs font-bold font-display px-3 py-1 rounded-full shadow-soft">
              {product.badge}
            </span>
          )
        )}
        {lowStock && (
          <span className="absolute top-3 right-3 bg-amber-400 text-brand-900 text-[10px] font-bold font-display px-2.5 py-1 rounded-full shadow-soft">
            ¡Últimas {product.stock}!
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 px-2 pt-3 pb-1">
        <Link to={`/tienda/${product.id}`}>
          <h3 className="font-display font-semibold text-brand-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem] hover:text-brand-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1 text-amber-500">
          <Star size={13} fill="currentColor" strokeWidth={0} />
          <span className="text-xs text-ink/60 font-medium">{product.rating}</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="font-display font-extrabold text-brand-700 text-lg">
            {formatPrice(product.price)}
          </span>
          <motion.button
            whileHover={outOfStock ? undefined : { scale: 1.1, rotate: 90 }}
            whileTap={outOfStock ? undefined : { scale: 0.9 }}
            onClick={() => !outOfStock && addItem(product, 1)}
            disabled={outOfStock}
            aria-label={outOfStock ? `${product.name} sin stock` : `Agregar ${product.name} al carrito`}
            className={`rounded-full p-2 shadow-soft ${
              outOfStock ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-brand-600 hover:bg-brand-700 text-white"
            }`}
          >
            <Plus size={18} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export { formatPrice };
