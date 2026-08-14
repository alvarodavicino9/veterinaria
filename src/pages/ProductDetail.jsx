import { useParams, Link, Navigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Star, Minus, Plus, ShoppingBag, ChevronLeft, Truck, ShieldCheck } from "lucide-react";
import ProductThumb from "../components/shop/ProductThumb";
import ProductCard, { formatPrice } from "../components/shop/ProductCard";
import Button from "../components/ui/Button";
import { useCartStore } from "../store/cartStore";
import { useProductsStore, LOW_STOCK_THRESHOLD } from "../store/productsStore";

export default function ProductDetail() {
  const { id } = useParams();
  const allProducts = useProductsStore((s) => s.products);
  const products = useMemo(() => allProducts.filter((p) => p.active), [allProducts]);
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) return <Navigate to="/tienda" replace />;

  const outOfStock = product.stock === 0;
  const lowStock = !outOfStock && product.stock <= LOW_STOCK_THRESHOLD;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <Link to="/tienda" className="inline-flex items-center gap-1 text-brand-600 font-display font-semibold text-sm mb-8 hover:gap-2 transition-all">
        <ChevronLeft size={16} /> Volver a la tienda
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <ProductThumb category={product.category} className="w-full aspect-square" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          {product.badge && (
            <span className="inline-block bg-lime-400 text-brand-900 text-xs font-bold font-display px-3 py-1 rounded-full mb-3">
              {product.badge}
            </span>
          )}
          <h1 className="font-display font-extrabold text-3xl text-brand-900">{product.name}</h1>

          <div className="flex items-center gap-1 mt-3 text-amber-500">
            <Star size={15} fill="currentColor" strokeWidth={0} />
            <span className="text-sm text-ink/60 font-medium">{product.rating} de 5</span>
          </div>

          <p className="font-display font-extrabold text-3xl text-brand-700 mt-6">
            {formatPrice(product.price)}
          </p>

          {outOfStock ? (
            <p className="inline-flex items-center gap-1.5 mt-3 text-sm font-display font-bold text-ink/50 bg-gray-100 px-3 py-1.5 rounded-full">
              Sin stock por el momento
            </p>
          ) : lowStock ? (
            <p className="inline-flex items-center gap-1.5 mt-3 text-sm font-display font-bold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-full">
              ¡Últimas {product.stock} unidades!
            </p>
          ) : null}

          <p className="text-ink/60 mt-5 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center gap-3 bg-white border border-brand-100 rounded-full px-2 py-1.5 shadow-soft">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={outOfStock}
                className="w-8 h-8 rounded-full bg-brand-50 hover:bg-brand-100 flex items-center justify-center text-brand-700 disabled:opacity-40"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center font-display font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))}
                disabled={outOfStock}
                className="w-8 h-8 rounded-full bg-brand-50 hover:bg-brand-100 flex items-center justify-center text-brand-700 disabled:opacity-40"
              >
                <Plus size={14} />
              </button>
            </div>

            <Button
              variant="primary"
              icon={ShoppingBag}
              iconPosition="left"
              onClick={() => addItem(product, qty)}
              disabled={outOfStock}
              className="flex-1"
            >
              {outOfStock ? "Sin stock" : "Agregar al carrito"}
            </Button>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4 text-sm text-ink/60">
            <div className="flex items-center gap-2">
              <Truck size={17} className="text-brand-500" /> Envío a domicilio o retiro en el local
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-brand-500" /> Recomendado por nuestro equipo veterinario
            </div>
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display font-bold text-2xl text-brand-900 mb-6">También te puede interesar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
