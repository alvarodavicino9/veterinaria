import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, accent = "brand" }) {
  const accents = {
    brand: "bg-brand-50 text-brand-600",
    lime: "bg-lime-100 text-lime-600",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 shadow-soft flex items-center gap-4"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accents[accent]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-display font-extrabold text-brand-900 leading-none">{value}</p>
        <p className="text-xs text-ink/50 mt-1">{label}</p>
      </div>
    </motion.div>
  );
}
