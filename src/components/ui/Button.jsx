import { motion } from "framer-motion";
import clsx from "clsx";

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  lime: "bg-lime-400 text-brand-900 hover:bg-lime-300",
  outline: "bg-transparent border-2 border-brand-600 text-brand-700 hover:bg-brand-50",
  ghost: "bg-transparent text-brand-700 hover:bg-brand-50",
  white: "bg-white text-brand-700 hover:bg-brand-50",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  as: As = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  icon: Icon,
  iconPosition = "right",
  disabled = false,
  ...props
}) {
  return (
    <motion.div
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { y: 0, scale: 0.97 }}
      className="inline-block"
    >
      <As
        disabled={disabled}
        className={clsx(
          "font-display font-bold rounded-full inline-flex items-center gap-2 justify-center transition-colors shadow-soft select-none",
          disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon size={18} strokeWidth={2.5} />}
        {children}
        {Icon && iconPosition === "right" && <Icon size={18} strokeWidth={2.5} />}
      </As>
    </motion.div>
  );
}
