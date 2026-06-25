import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import translations, { type Lang, type TranslationKey } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  setLanguage: (lang: Lang) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("rightplace-language");
  if (stored === "zh" || stored === "en") return stored;
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem("rightplace-language", lang);
  }, [lang]);

  const t: LanguageContextValue["t"] = (key, params) => {
    let text = translations[lang][key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, String(v));
      }
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage: setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
}
