import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { WhatsAppIcon } from "./SocialIcons";
import Logo from "./Logo";
import {
  BUSINESS,
  WHATSAPP_GREETING,
  WHATSAPP_DEFAULT_MESSAGE,
  WHATSAPP_QUICK_OPTIONS,
} from "../../data/business";
import { waLink } from "../../lib/whatsapp";
import { isOpenNow } from "../../lib/hours";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const online = isOpenNow();

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-5 sm:right-6 z-40 w-[calc(100vw-2.5rem)] max-w-[320px] bg-white rounded-3xl shadow-2xl overflow-hidden origin-bottom-right"
          >
            <div className="bg-[#25D366] px-4 pt-4 pb-5 relative">
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="absolute top-3 right-3 text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Logo mark size="sm" />
                </div>
                <div>
                  <p className="font-display font-bold text-white leading-none">{BUSINESS.name}</p>
                  <p className="flex items-center gap-1.5 text-white/90 text-xs mt-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${online ? "bg-lime-300 animate-pulse" : "bg-white/50"}`} />
                    {online ? "Disponible ahora" : "Te respondemos más tarde"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-brand-50/60 px-4 py-4">
              <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm text-sm text-ink/80 leading-relaxed max-w-[85%]">
                {WHATSAPP_GREETING}
              </div>

              <div className="flex flex-col gap-2 mt-4">
                {WHATSAPP_QUICK_OPTIONS.map((opt) => (
                  <a
                    key={opt.label}
                    href={waLink(opt.message)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-left px-4 py-2.5 rounded-full border border-[#25D366]/40 text-[#128C4A] text-xs font-display font-bold hover:bg-[#25D366]/10 transition-colors"
                  >
                    {opt.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href={waLink(WHATSAPP_DEFAULT_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-sm py-3.5 transition-colors"
            >
              <WhatsAppIcon size={17} /> Abrir WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 right-5 sm:right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center"
      >
        {!open && (
          <motion.span
            animate={{ scale: [1, 1.7, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-[#25D366]"
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="relative">
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
              <WhatsAppIcon size={26} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
