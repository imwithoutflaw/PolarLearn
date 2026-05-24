import React, { createContext, useContext, useState } from "react";
import { translations } from "../i18n/translations.js";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "sk";
  });

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "sk" ? "en" : "sk";
      localStorage.setItem("language", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}