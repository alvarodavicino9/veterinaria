// Single source of truth for contact info & brand constants.
// Swap these for the real values whenever they're available.
export const BUSINESS = {
  name: "DS Vet & Petshop",
  legalPhone: "+54 9 351 000-0000",
  whatsapp: "5493510000000", // digits only, country + area code, for wa.me links
  email: "hola@dsvet.com",
  instagram: "#",
  facebook: "#",
  mapsUrl: "https://maps.app.goo.gl/UGvAeEfhSknT9j4q6",
  addressLabel: "Córdoba, Argentina",
};

export const WHATSAPP_GREETING =
  "¡Hola! 👋 ¿En qué podemos ayudarte? Elegí una opción o escribinos directo.";

export const WHATSAPP_DEFAULT_MESSAGE = "¡Hola! Quiero hacer una consulta 🐾";

export const WHATSAPP_QUICK_OPTIONS = [
  {
    label: "Quiero reservar un turno",
    message: "¡Hola! Quiero reservar un turno para mi mascota 🐾",
  },
  {
    label: "Consulta sobre mi pedido",
    message: "¡Hola! Tengo una consulta sobre un pedido que hice en la tienda.",
  },
  {
    label: "Productos y precios",
    message: "¡Hola! Quiero consultar por productos y precios.",
  },
  {
    label: "Es una urgencia con mi mascota",
    message: "¡Hola! Necesito ayuda urgente con mi mascota 🚨",
  },
];
