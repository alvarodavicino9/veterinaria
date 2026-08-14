import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProductsStore } from "../../store/productsStore";
import ProductCard from "../shop/ProductCard";
import Reveal from "../ui/Reveal";

export default function FeaturedProducts() {
  const products = useProductsStore((s) => s.products);
  const featured = useMemo(
    () => products.filter((p) => p.active && p.badge && p.stock > 0).slice(0, 4),
    [products]
  );

  return (
    <section className="bg-brand-50/60 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-brand-500 font-display font-bold text-sm uppercase tracking-wide">
              Petshop
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-900 mt-2">
              Lo más elegido
            </h2>
          </div>
          <Link
            to="/tienda"
            className="inline-flex items-center gap-1 text-brand-700 font-display font-semibold hover:gap-2 transition-all"
          >
            Ver toda la tienda <ArrowRight size={16} />
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
