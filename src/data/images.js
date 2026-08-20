// Real photos from Unsplash (free to use under the Unsplash License —
// https://unsplash.com/license — no attribution required, commercial use ok),
// plus a few photos provided directly and bundled locally in ./photos.
// Swap any of these for the vet's own photography whenever it's available.
import vetUltrasoundSolo from "../assets/photos/vet-ultrasound-solo.jpg";
import catNailTrim from "../assets/photos/cat-nail-trim.jpg";
import vetTeamUltrasound from "../assets/photos/vet-team-ultrasound.jpg";

function unsplash(id, w) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const IMAGES = {
  hero: unsplash("photo-1450778869180-41d0601e046e", 1200), // gray cat & white dog together
  about: vetTeamUltrasound, // vet team with a dog at the ultrasound station

  // Each category has 2 photos now so products in the same category don't
  // all show the exact same image — see `productImage()` below.
  categories: {
    alimento: [
      unsplash("photo-1714068691210-073dc52c6c1d", 800), // dog eating from a bowl
      unsplash("photo-1764249453850-faace6e57444", 800), // close-up of dry kibble
    ],
    ropa: [
      unsplash("photo-1654895716780-b4664497420d", 800), // dog wearing a polka dot shirt
      unsplash("photo-1640299039832-f2312bcda139", 800), // poodle in a red sweater
    ],
    accesorios: [
      unsplash("photo-1682642542651-7e1c4457de3e", 800), // small dog wearing a harness
      unsplash("photo-1568560967304-ea3448165ebd", 800), // cat with a leash
    ],
    higiene: [
      unsplash("photo-1647002380358-fc70ed2f04e0", 800), // dog in a bathtub
      unsplash("photo-1719464454959-9cf304ef4774", 800), // small dog being groomed with scissors
    ],
    juguetes: [
      unsplash("photo-1758543535539-325abf59ef48", 800), // golden retriever with a ball
      unsplash("photo-1638826595775-e2eae86cda8e", 800), // cat playing with a toy
    ],
    salud: [
      unsplash("photo-1664786908163-85ca46f85138", 800), // medicine bottle
      unsplash("photo-1664216294573-b28282de564b", 800), // supplement pills bottle
    ],
  },

  services: {
    consulta: unsplash("photo-1770836037793-95bdbf190f71", 1000), // vet examining a dachshund
    peluqueria: catNailTrim, // cat getting its nails trimmed
    cirugia: vetUltrasoundSolo, // vet running an ultrasound / diagnostic study
  },
};

// Deterministically picks one of the category's photos per product (by id
// number), so items in the same category alternate between two real photos
// instead of all repeating one. Falls back gracefully if a category is
// ever configured with a single photo instead of an array.
export function productImage(product) {
  const photos = IMAGES.categories[product?.category];
  if (!photos) return null;
  if (!Array.isArray(photos)) return photos;
  const n = parseInt(String(product.id).replace(/\D/g, ""), 10) || 0;
  return photos[n % photos.length];
}
