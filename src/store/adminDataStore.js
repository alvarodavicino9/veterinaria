import { create } from "zustand";
import { persist } from "zustand/middleware";

function id(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

const seedAppointments = [
  {
    id: "apt_seed_1",
    service: "consulta",
    subService: "Control / seguimiento",
    petName: "Simba",
    petType: "Gato",
    ownerName: "María López",
    ownerPhone: "+54 9 351 555-0142",
    ownerEmail: "maria.lopez@mail.com",
    date: "2026-08-14",
    time: "11:00",
    notes: "Control post operatorio.",
    status: "confirmado",
    createdAt: "2026-08-10T14:22:00-03:00",
  },
  {
    id: "apt_seed_2",
    service: "peluqueria",
    subService: "Baño + corte",
    petName: "Rocco",
    petType: "Perro",
    ownerName: "Facundo Ibáñez",
    ownerPhone: "+54 9 351 555-0198",
    ownerEmail: "facu.ib@mail.com",
    date: "2026-08-14",
    time: "16:00",
    notes: "",
    status: "pendiente",
    createdAt: "2026-08-11T09:05:00-03:00",
  },
  {
    id: "apt_seed_3",
    service: "cirugia",
    subService: "Castración / esterilización",
    petName: "Luna",
    petType: "Gata",
    ownerName: "Carla Medina",
    ownerPhone: "+54 9 351 555-0177",
    ownerEmail: "carla.medina@mail.com",
    date: "2026-08-17",
    time: "10:30",
    notes: "Requiere ayuno de 8hs previas.",
    status: "confirmado",
    createdAt: "2026-08-09T18:40:00-03:00",
  },
];

const seedOrders = [
  {
    id: "ord_seed_1",
    items: [
      { id: "p1", name: "Alimento Premium Adulto Perro 15kg", qty: 1, price: 48500 },
      { id: "p6", name: "Pechera Arnés Antitirón", qty: 1, price: 13400 },
    ],
    total: 61900,
    customerName: "Julieta Rossi",
    customerPhone: "+54 9 351 555-0211",
    customerEmail: "juli.rossi@mail.com",
    fulfillment: "retiro en local",
    paymentMethod: "Mercado Pago",
    status: "listo",
    createdAt: "2026-08-12T10:15:00-03:00",
  },
  {
    id: "ord_seed_2",
    items: [{ id: "p11", name: "Toallitas Húmedas Cat Friendly x40", qty: 2, price: 4500 }],
    total: 9000,
    customerName: "Nahuel Torres",
    customerPhone: "+54 9 351 555-0233",
    customerEmail: "nahuel.t@mail.com",
    fulfillment: "envío a domicilio",
    paymentMethod: "Mercado Pago",
    status: "nuevo",
    createdAt: "2026-08-13T08:50:00-03:00",
  },
];

export const useAdminDataStore = create(
  persist(
    (set, get) => ({
      appointments: seedAppointments,
      orders: seedOrders,

      addAppointment: (appt) => {
        const newAppt = {
          id: id("apt"),
          status: "pendiente",
          createdAt: new Date().toISOString(),
          ...appt,
        };
        set({ appointments: [newAppt, ...get().appointments] });
        return newAppt;
      },

      addOrder: (order) => {
        const newOrder = {
          id: id("ord"),
          status: "nuevo",
          createdAt: new Date().toISOString(),
          ...order,
        };
        set({ orders: [newOrder, ...get().orders] });
        return newOrder;
      },

      setAppointmentStatus: (apptId, status) =>
        set({
          appointments: get().appointments.map((a) => (a.id === apptId ? { ...a, status } : a)),
        }),

      updateAppointment: (apptId, patch) =>
        set({
          appointments: get().appointments.map((a) => (a.id === apptId ? { ...a, ...patch } : a)),
        }),

      setOrderStatus: (orderId, status) =>
        set({
          orders: get().orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        }),
    }),
    { name: "dsvet-admin-data" }
  )
);
