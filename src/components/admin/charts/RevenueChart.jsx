import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { formatPrice } from "../../shop/ProductCard";

const W = 640;
const H = 220;
const PAD_L = 8;
const PAD_R = 8;
const PAD_T = 16;
const PAD_B = 28;

// Single-series area+line chart for "ingresos por día". One hue (brand
// coral), thin 2px line, recessive gridlines, hover crosshair + tooltip,
// one direct label on the last point only (selective labeling, not every
// point).
export default function RevenueChart({ data }) {
  const [hover, setHover] = useState(null); // index or null

  const { points, maxY, plotW, plotH } = useMemo(() => {
    const plotW = W - PAD_L - PAD_R;
    const plotH = H - PAD_T - PAD_B;
    const maxY = Math.max(1, ...data.map((d) => d.revenue)) * 1.15;
    const stepX = data.length > 1 ? plotW / (data.length - 1) : 0;
    const points = data.map((d, i) => ({
      ...d,
      x: PAD_L + i * stepX,
      y: PAD_T + plotH * (1 - d.revenue / maxY),
    }));
    return { points, maxY, plotW, plotH };
  }, [data]);

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${(PAD_T + plotH).toFixed(1)} L ${points[0].x.toFixed(1)} ${(PAD_T + plotH).toFixed(1)} Z`;

  const gridLines = [0, 0.5, 1];
  const total = data.reduce((s, d) => s + d.revenue, 0);
  const last = points[points.length - 1];
  const active = hover != null ? points[hover] : null;

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let best = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p.x - relX);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setHover(nearest);
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <p className="text-xs text-ink/50">Ingresos últimos 14 días</p>
          <p className="font-display font-extrabold text-2xl text-brand-900">{formatPrice(total)}</p>
        </div>
        <span className="text-[10px] font-semibold text-ink/40 bg-ink/5 px-2.5 py-1 rounded-full">
          Datos de ejemplo
        </span>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto touch-none"
          onMouseMove={handleMove}
          onMouseLeave={() => setHover(null)}
        >
          {gridLines.map((g) => {
            const y = PAD_T + plotH * g;
            return (
              <line
                key={g}
                x1={PAD_L}
                x2={W - PAD_R}
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-ink/10"
              />
            );
          })}

          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-brand-400)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--color-brand-400)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <motion.path
            d={areaPath}
            fill="url(#revenueFill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="var(--color-brand-500)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* selective direct label: only the last point */}
          <circle cx={last.x} cy={last.y} r="4" fill="var(--color-brand-500)" />
          <text
            x={last.x - 6}
            y={last.y - 10}
            textAnchor="end"
            className="fill-brand-700 text-[11px] font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {formatPrice(last.revenue)}
          </text>

          {active && (
            <>
              <line
                x1={active.x}
                x2={active.x}
                y1={PAD_T}
                y2={PAD_T + plotH}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 3"
                className="text-brand-400"
              />
              <circle cx={active.x} cy={active.y} r="5" fill="var(--color-brand-600)" stroke="white" strokeWidth="2" />
            </>
          )}

          {/* x-axis day labels */}
          {points.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={H - 8}
              textAnchor="middle"
              className="fill-ink/40 text-[9px]"
            >
              {i % 2 === 0 || points.length <= 8 ? p.label : ""}
            </text>
          ))}
        </svg>

        {active && (
          <div
            className="absolute -translate-x-1/2 -translate-y-full bg-brand-900 text-white text-xs rounded-xl px-3 py-2 shadow-lg pointer-events-none"
            style={{ left: `${(active.x / W) * 100}%`, top: `${(active.y / H) * 100 - 4}%` }}
          >
            <p className="font-display font-bold">{formatPrice(active.revenue)}</p>
            <p className="text-white/60 text-[10px]">{active.label} · {active.orders} pedido{active.orders === 1 ? "" : "s"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
