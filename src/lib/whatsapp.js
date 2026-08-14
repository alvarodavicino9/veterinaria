import { BUSINESS } from "../data/business";

export function waLink(message) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message) {
  window.open(waLink(message), "_blank", "noopener,noreferrer");
}
