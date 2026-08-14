import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bone, Shirt, PawPrint, Droplets, Gamepad2, HeartPulse, X } from "lucide-react";
import { CATEGORIES } from "../data/products";
import { useProductsStore } from "../store/productsStore";
import ProductCard from "../components/shop/ProductCard";
import Reveal from "../components/ui/Reveal";

const ICONS = { Bone, Shirt, PawPrint, Droplets, Gamepad2, HeartPulse };
const PETS = [
  { id: "todos", label: "Todos" },
  { id: "perro", label: "Perro" },
  { id: "gato", label: "Gato" },
];

export default function Shop() {
  const allProducts = useProductsStore((s) => s.products);
  const products = useMemo(() => allProducts.filter((p) => p.active), [allProducts]);
  const [category, setCategory] = useState("todos");
  const [pet, setPet] = useState("todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "todos" && p.category !== category) return false;
      if (pet !== "todos" && p.pet !== pet && p.pet !== "todos") return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [products, category, pet, query]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <Reveal className="mb-10 text-center max-w-2xl mx-auto">
        <span className="text-brand-500 font-display font-bold text-sm uppercase tracking-wide">
          Petshop
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-900 mt-2">
          Todo para tu mascota
        </h1>
        <p className="text-ink/60 mt-3">
          Alimento, ropa, accesorios, higiene, juguetes y salud — con envío a domicilio o retiro en el local.
        </p>
      </Reveal>

      <div className="relative max-w-md mx-auto mb-8">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full pl-11 pr-10 py-3 rounded-full bg-white shadow-soft border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium text-sm"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        {PETS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPet(p.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-display font-bold transition-colors ${
              pet === p.id ? "bg-brand-800 text-white" : "bg-white text-brand-700 border border-brand-100"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <button
          onClick={() => setCategory("todos")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-display font-semibold transition-colors ${
            category === "todos" ? "bg-lime-400 text-brand-900" : "bg-white text-brand-700 border border-brand-100 hover:border-brand-300"
          }`}
        >
          Todas las categorías
        </button>
        {CATEGORIES.map((c) => {
          const Icon = ICONS[c.icon];
          return (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-display font-semibold transition-colors ${
                category === c.id ? "bg-lime-400 text-brand-900" : "bg-white text-brand-700 border border-brand-100 hover:border-brand-300"
              }`}
            >
              <Icon size={15} /> {c.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={category + pet + query}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-ink/50"
          >
            No encontramos productos con esos filtros.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
