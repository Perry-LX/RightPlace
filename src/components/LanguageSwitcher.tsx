import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { Translate } from "@phosphor-icons/react";
import { useTranslation } from "../i18n/LanguageProvider";

const LANGUAGES = [
  { code: "en" as const, label: "English" },
  { code: "zh" as const, label: "中文" },
];

export default function LanguageSwitcher() {
  const { lang, setLanguage, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (btnRef.current?.contains(el)) return;
      if (el.closest('[data-lang-dropdown="true"]')) return;
      setOpen(false);
    };
    // Use capture phase to beat any re-render race
    document.addEventListener("mousedown", handler, true);
    return () => document.removeEventListener("mousedown", handler, true);
  }, [open]);

  const handleClick = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
    }
    setOpen((v) => !v);
  };

  const current = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleClick}
        className="flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-800 bg-white/60 hover:bg-white border border-zinc-200/70 rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer"
        aria-label={t("language.switchTo")}
      >
        <Translate size={14} weight="bold" />
        <span>{current.label}</span>
      </button>

      {open &&
        createPortal(
          <motion.div
            data-lang-dropdown="true"
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="fixed w-32 bg-white border border-zinc-200 rounded-xl shadow-lg z-[9999] overflow-hidden"
            style={{ top: pos.top, right: pos.right }}
          >
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLanguage(l.code);
                  setOpen(false);
                }}
                className={`
                  w-full text-left px-3.5 py-2 text-sm transition-colors cursor-pointer
                  ${l.code === lang
                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                    : "text-zinc-600 hover:bg-zinc-50"
                  }
                `}
              >
                {l.label}
              </button>
            ))}
          </motion.div>,
          document.body
        )}
    </>
  );
}
