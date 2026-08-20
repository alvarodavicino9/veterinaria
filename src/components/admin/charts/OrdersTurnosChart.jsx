import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const W = 640;
const H = 220;
const PAD_L = 8;
const PAD_R = 8;
const PAD_T = 16;
const PAD_B = 28;
const GROUP_GAP = 10;
const BAR_GAP = 2;

// Grouped bar chart: pedidos (coral) vs turnos (mint) per day. Both series
// share one count axis (same unit), so this isn't a dual-axis chart — just
// two categorical series on a shared scale. Fixed hue order: pedidos first
// (brand), turnos second (lime). Legend since there are 2 series.
export default function OrdersTurnosChart({ data }) {
  const [hover, setHover] = useState(null); // { i, series } | null

  const { groups, maxY, plotW, plotH, groupW, barW } = useMemo(() => {
    const plotW = W - PAD_L - PAD_R;
    const plotH = H - PAD_T - PAD_B;
    const maxY = Math.max(1, ...data.map((d) => Math.max(d.orders, d.turnos))) * 1.25;
    const groupW = plotW / data.length;
    const barW = (groupW - GROUP_GAP - BAR_GAP) / 2;
    const groups = data.map((d, i) => {
      const gx = PAD_L + i * groupW + GROUP_GAP / 2;
      const ordersH = plotH * (d.orders / maxY);
      const turnosH = plotH * (d.turnos / maxY);
      return {
        ...d,
        i,
        ordersX: gx,
        turnosX: gx + barW + BAR_GAP,
        ordersY: PAD_T + plotH - ordersH,
        turnosY: PAD_T + plotH - turnosH,
        ordersH,
        turnosH,
      };
    });
    return { groups, maxY, plotW, plotH, groupW, barW };
  }, [data]);

  const totalOrders = data.reduce((s, d) => s + d.orders, 0);
  const totalTurnos = data.reduce((s, d) => s + d.turnos, 0);

  return (
    <div>
      <div className="flex items-start justify-between mb-3 gap-3">
        <div>
          <p className="text-xs text-ink/50">Pedidos y turnos por día</p>
          <div className="flex items-center gap-4 mt-1">
            <span className="inline-flex items-center gap-1.5 text-sm font-display font-bold text-brand-700">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500" /> {totalOrders} pedidos
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-display font-bold text-lime-700">
              <span className="w-2.5 h-2.5 rounded-full bg-lime-500" /> {totalTurnos} turnos
            </span>
          </div>
        </div>
        <span className="text-[10px] font-semibold text-ink/40 bg-ink/5 px-2.5 py-1 rounded-full shrink-0">
          Datos de ejemplo
        </span>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {[0, 0.5, 1].map((g) => (
            <line
              key={g}
              x1={PAD_L}
              x2={W - PAD_R}
              y1={PAD_T + plotH * g}
              y2={PAD_T + plotH * g}
              stroke="currentColor"
              strokeWidth="1"
              className="text-ink/10"
            />
          ))}

          {groups.map((g) => (
            <g key={g.i} onMouseLeave={() => setHover(null)}>
              <motion.rect
                x={g.ordersX}
                width={Math.max(barW, 2)}
                initial={{ y: PAD_T + plotH, height: 0 }}
                whileInView={{ y: g.ordersY, height: g.ordersH }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: g.i * 0.03 }}
                rx="4"
                fill="var(--color-brand-500)"
                opacity={hover && hover.i === g.i && hover.series !== "orders" ? 0.5 : 1}
                onMouseEnter={() => setHover({ i: g.i, series: "orders" })}
                className="cursor-pointer"
              />
              <motion.rect
                x={g.turnosX}
                width={Math.max(barW, 2)}
                initial={{ y: PAD_T + plotH, height: 0 }}
                whileInView={{ y: g.turnosY, height: g.turnosH }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: g.i * 0.03 + 0.05 }}
                rx="4"
                fill="var(--color-lime-500)"
                opacity={hover && hover.i === g.i && hover.series !== "turnos" ? 0.5 : 1}
                onMouseEnter={() => setHover({ i: g.i, series: "turnos" })}
                className="cursor-pointer"
              />
              <text
                x={g.ordersX + barW + BAR_GAP / 2}
                y={H - 8}
                textAnchor="middle"
                className="fill-ink/40 text-[9px]"
              >
                {g.label}
              </text>
            </g>
          ))}
        </svg>

        {hover && (
          <div
            className="absolute -translate-x-1/2 -translate-y-full bg-brand-900 text-white text-xs rounded-xl px-3 py-2 shadow-lg pointer-events-none"
            style={{
              left: `${((hover.series === "orders" ? groups[hover.i].ordersX + barW / 2 : groups[hover.i].turnosX + barW / 2) / W) * 100}%`,
              top: `${((hover.series === "orders" ? groups[hover.i].ordersY : groups[hover.i].turnosY) / H) * 100 - 4}%`,
            }}
          >
            <p className="font-display font-bold">
              {hover.series === "orders" ? groups[hover.i].orders : groups[hover.i].turnos}{" "}
              {hover.series === "orders" ? "pedido(s)" : "turno(s)"}
            </p>
            <p className="text-white/60 text-[10px]">{groups[hover.i].label}</p>
          </div>
        )}
      </div>
    </div>
  );
}
