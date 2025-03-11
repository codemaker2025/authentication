import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import { useAtomValue } from "jotai";
import { localeAtom } from "./atoms/localeAtom";

const messages = {
  en,
  fr,
};

export default function IntlProvider({ children }) {
  const locale = useAtomValue(localeAtom) || "en"; // Ensure default locale is passed

  return (
    <ReactIntlProvider locale={locale} messages={messages[locale] || messages['en']}>
      {children}
    </ReactIntlProvider>
  );
}
