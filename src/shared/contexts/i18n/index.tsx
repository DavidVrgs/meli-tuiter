import Polyglot from "node-polyglot";
import { useContext, useState, type JSX, createContext } from "react";
import i18n, { type LOCALE } from "./i18n";

interface I18nContextType {
  polyglot: Polyglot;
  locale: LOCALE;
  changeLanguage: (locale: LOCALE) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({
  lang,
  children,
}: {
  lang: LOCALE;
  children: JSX.Element;
}) => {
  const [polyglot, setPolyglot] = useState(new Polyglot(i18n));
  const [locale, setLocale] = useState(lang);

  const changeLanguage = (newLocale: LOCALE) => {
    polyglot.locale(newLocale);
    setLocale(newLocale);
    setPolyglot(polyglot);
  };

  return (
    <I18nContext.Provider value={{ polyglot, locale, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useTranslation(namespace?: string) {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }

  const { polyglot, locale, changeLanguage } = context;

  const translate = (
    key: string,
    options?: number | Polyglot.InterpolationOptions
  ) => {
    const translationKey = namespace
      ? `${locale}.${namespace}.${key}`
      : `${locale}.${key}`;
    return polyglot.t(translationKey, options);
  };

  return {
    t: translate,
    changeLanguage,
  };
}
