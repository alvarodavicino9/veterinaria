import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS as SEED_PRODUCTS } from "../data/products";

const seeded = SEED_PRODUCTS.map((p) => ({ active: true, ...p }));

export const LOW_STOCK_THRESHOLD = 6;

export const useProductsStore = create(
  persist(
    (set, get) => ({
      products: seeded,

      getProduct: (id) => get().products.find((p) => p.id === id),

      setStock: (id, stock) =>
        set({
          products: get().products.map((p) => (p.id === id ? { ...p, stock: Math.max(0, Number(stock) || 0) } : p)),
        }),

      adjustStock: (id, delta) =>
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
          ),
        }),

      setPrice: (id, price) =>
        set({
          products: get().products.map((p) => (p.id === id ? { ...p, price: Math.max(0, Number(price) || 0) } : p)),
        }),

      toggleActive: (id) =>
        set({
          products: get().products.map((p) => (p.id === id ? { ...p, active: !p.active } : p)),
        }),

      // Decrements stock for a batch of purchased items, e.g. [{ id, qty }]. Used at checkout.
      decrementForOrder: (items) =>
        set({
          products: get().products.map((p) => {
            const line = items.find((i) => i.id === p.id);
            return line ? { ...p, stock: Math.max(0, p.stock - line.qty) } : p;
          }),
        }),
    }),
    { name: "dsvet-products" }
  )
);

// NOTE: don't add a `selectActiveProducts` selector that returns `.filter(...)` here —
// zustand (useSyncExternalStore) requires selector results to be referentially stable
// across calls when the underlying state hasn't changed. A selector that returns a
// freshly-filtered array every render breaks that and causes an infinite update loop.
// Select the raw `products` array instead and filter it with `useMemo` in the component.
