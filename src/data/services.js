export const SERVICES = [
  {
    id: "consulta",
    label: "Consulta veterinaria",
    icon: "Stethoscope",
    duration: 30,
    description: "Consulta general, control de rutina, vacunación y desparasitación.",
    subServices: [
      "Consulta general",
      "Control / seguimiento",
      "Vacunación",
      "Desparasitación",
    ],
  },
  {
    id: "peluqueria",
    label: "Peluquería / Baño y corte",
    icon: "Scissors",
    duration: 60,
    description: "Baño, corte de pelo e higiene con técnicas cat friendly y dog friendly.",
    subServices: ["Baño", "Baño + corte", "Corte de uñas", "Deslanado"],
  },
  {
    id: "cirugia",
    label: "Cirugías / Estudios",
    icon: "Syringe",
    duration: 90,
    description: "Procedimientos quirúrgicos y estudios de diagnóstico avanzado (requieren evaluación previa).",
    subServices: ["Castración / esterilización", "Estudio de diagnóstico por imagen", "Análisis de laboratorio", "Otro procedimiento"],
  },
];

export function getServiceById(id) {
  return SERVICES.find((s) => s.id === id);
}
