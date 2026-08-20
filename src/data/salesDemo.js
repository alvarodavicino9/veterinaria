// Placeholder data so the "Ventas e ingresos" charts in the panel have
// something realistic to show before there's a real backend aggregating
// orders. Numbers are made up but follow real patterns for this business
// (closed Sundays, slower Saturdays, weekday peaks). Once orders/turnos are
// stored in a real database, swap this file for a query like
// `SELECT date, SUM(total) FROM orders GROUP BY date ORDER BY date`.

export const SALES_TREND = [
  { date: "2026-08-07", label: "Vie", revenue: 74200, orders: 3, turnos: 5 },
  { date: "2026-08-08", label: "Sáb", revenue: 51300, orders: 2, turnos: 4 },
  { date: "2026-08-09", label: "Dom", revenue: 0, orders: 0, turnos: 0 },
  { date: "2026-08-10", label: "Lun", revenue: 63800, orders: 3, turnos: 6 },
  { date: "2026-08-11", label: "Mar", revenue: 88900, orders: 4, turnos: 7 },
  { date: "2026-08-12", label: "Mié", revenue: 45600, orders: 2, turnos: 5 },
  { date: "2026-08-13", label: "Jue", revenue: 97400, orders: 4, turnos: 8 },
  { date: "2026-08-14", label: "Vie", revenue: 112300, orders: 5, turnos: 9 },
  { date: "2026-08-15", label: "Sáb", revenue: 58700, orders: 3, turnos: 5 },
  { date: "2026-08-16", label: "Dom", revenue: 0, orders: 0, turnos: 0 },
  { date: "2026-08-17", label: "Lun", revenue: 71200, orders: 3, turnos: 6 },
  { date: "2026-08-18", label: "Mar", revenue: 94500, orders: 4, turnos: 7 },
  { date: "2026-08-19", label: "Mié", revenue: 68300, orders: 3, turnos: 6 },
  { date: "2026-08-20", label: "Jue", revenue: 103800, orders: 5, turnos: 8 },
];

// Fixed order matches CATEGORIES in data/products.js — identity axis, so
// color stays constant per category regardless of sort/filter.
export const CATEGORY_SALES = [
  { category: "alimento", label: "Alimento", units: 342 },
  { category: "ropa", label: "Ropa", units: 71 },
  { category: "accesorios", label: "Accesorios", units: 198 },
  { category: "higiene", label: "Higiene", units: 156 },
  { category: "juguetes", label: "Juguetes", units: 143 },
  { category: "salud", label: "Salud", units: 97 },
];
