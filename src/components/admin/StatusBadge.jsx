const STYLES = {
  pendiente: "bg-amber-100 text-amber-700",
  confirmado: "bg-lime-100 text-lime-700",
  cancelado: "bg-red-100 text-red-600",
  nuevo: "bg-blue-100 text-blue-700",
  preparando: "bg-amber-100 text-amber-700",
  listo: "bg-lime-100 text-lime-700",
  entregado: "bg-brand-100 text-brand-700",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-display font-bold capitalize ${STYLES[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}
