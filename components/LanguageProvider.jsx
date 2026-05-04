"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { copy } from "@/lib/i18n";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("lumine-lang");
    if (saved === "hi" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
    window.localStorage.setItem("lumine-lang", lang);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: copy[lang]
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return value;
}
