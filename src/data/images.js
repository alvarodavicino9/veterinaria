// Real photos from Unsplash (free to use under the Unsplash License —
// https://unsplash.com/license — no attribution required, commercial use ok).
// Swap any of these for the vet's own photography whenever it's available;
// each entry below is just a plain https URL so replacing one is a one-line change.
function unsplash(id, w) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const IMAGES = {
  hero: unsplash("photo-1450778869180-41d0601e046e", 1200), // gray cat & white dog together
  about: unsplash("photo-1623387641168-d9803ddd3f35", 1400), // dog and cat laying in the grass

  categories: {
    alimento: unsplash("photo-1714068691210-073dc52c6c1d", 800), // dog eating from a bowl
    ropa: unsplash("photo-1654895716780-b4664497420d", 800), // dog wearing a polka dot shirt
    accesorios: unsplash("photo-1682642542651-7e1c4457de3e", 800), // small dog wearing a harness
    higiene: unsplash("photo-1647002380358-fc70ed2f04e0", 800), // dog in a bathtub
    juguetes: unsplash("photo-1758543535539-325abf59ef48", 800), // golden retriever with a ball
    salud: unsplash("photo-1664786908163-85ca46f85138", 800), // medicine bottle
  },

  services: {
    consulta: unsplash("photo-1770836037793-95bdbf190f71", 1000), // vet examining a dachshund
    peluqueria: unsplash("photo-1672426637959-49f39230ad7e", 1000), // dog next to a bathtub
    cirugia: unsplash("photo-1770836037275-38b44e4b101f", 1000), // vet giving an injection
  },
};
