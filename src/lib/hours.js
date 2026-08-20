// Business hours for DS Vet & Petshop
// 0 = domingo ... 6 = sábado
export const BUSINESS_HOURS = {
  0: null, // domingo cerrado
  1: { open: 10, close: 20 },
  2: { open: 10, close: 20 },
  3: { open: 10, close: 20 },
  4: { open: 10, close: 20 },
  5: { open: 10, close: 20 },
  6: { open: 10, close: 15 },
};

export const DAY_LABELS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export function hoursForDay(dateOrDay) {
  const day = typeof dateOrDay === "number" ? dateOrDay : dateOrDay.getDay();
  return BUSINESS_HOURS[day];
}

export function isOpenOn(date) {
  return hoursForDay(date) !== null;
}

// Checks whether the business is open right now (day + time of day).
export function isOpenNow(date = new Date()) {
  const hours = hoursForDay(date);
  if (!hours) return false;
  const minutesNow = date.getHours() * 60 + date.getMinutes();
  return minutesNow >= hours.open * 60 && minutesNow < hours.close * 60;
}

// Generates HH:mm slots for a given date at a fixed interval (minutes),
// leaving room so the last slot + duration fits before closing.
export function slotsForDate(date, { interval = 30, durationMin = 30 } = {}) {
  const hours = hoursForDay(date);
  if (!hours) return [];
  const slots = [];
  const totalOpenMinutes = (hours.close - hours.open) * 60;
  for (let m = 0; m + durationMin <= totalOpenMinutes; m += interval) {
    const h = hours.open + Math.floor(m / 60);
    const mm = m % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
  }
  return slots;
}

export function nextOpenDays(count = 14, from = new Date()) {
  const days = [];
  const cursor = new Date(from);
  cursor.setHours(0, 0, 0, 0);
  while (days.length < count) {
    if (isOpenOn(cursor)) days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export function formatHoursLine() {
  return [
    { label: "Lunes a Viernes", value: "10:00 – 20:00" },
    { label: "Sábados", value: "10:00 – 15:00" },
    { label: "Domingos", value: "Cerrado" },
  ];
}
