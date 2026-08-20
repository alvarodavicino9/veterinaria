import { motion } from "framer-motion";

// Horizontal bar chart, one series (units vendidos por categoría). Category
// is the identity axis (already labeled), so a single hue is used for every
// bar instead of a different color per bar — no legend needed.
export default function CategorySalesChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.units));
  const totalUnits = data.reduce((s, d) => s + d.units, 0);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <p className="text-xs text-ink/50">Ventas por categoría</p>
          <p className="font-display font-extrabold text-2xl text-brand-900">{totalUnits} unidades</p>
        </div>
        <span className="text-[10px] font-semibold text-ink/40 bg-ink/5 px-2.5 py-1 rounded-full">
          Datos de ejemplo
        </span>
      </div>

      <div className="space-y-3">
        {data.map((d, i) => (
          <div key={d.category}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-ink/70">{d.label}</span>
              <span className="font-display font-bold text-brand-700">{d.units}</span>
            </div>
            <div className="h-2.5 rounded-full bg-brand-50 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-brand-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${(d.units / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
