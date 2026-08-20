import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // { id, name, price, qty, category }
      isOpen: false,

      addItem: (product, qty = 1) => {
        const items = [...get().items];
        const idx = items.findIndex((i) => i.id === product.id);
        if (idx >= 0) {
          items[idx] = { ...items[idx], qty: items[idx].qty + qty };
        } else {
          items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            qty,
          });
        }
        set({ items, isOpen: true });
      },

      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

      setQty: (id, qty) => {
        if (qty <= 0) return get().removeItem(id);
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
        });
      },

      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      get totalItems() {
        return get().items.reduce((sum, i) => sum + i.qty, 0);
      },
      get totalPrice() {
        return get().items.reduce((sum, i) => sum + i.qty * i.price, 0);
      },
    }),
    { name: "dsvet-cart" }
  )
);

export const selectTotalItems = (s) => s.items.reduce((sum, i) => sum + i.qty, 0);
export const selectTotalPrice = (s) => s.items.reduce((sum, i) => sum + i.qty * i.price, 0);
