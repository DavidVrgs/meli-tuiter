import type { JSX } from "react";
import { AuthProvider, I18nProvider, NotificationProvider } from "../contexts";
import type { LOCALE } from "../contexts/i18n/i18n";

interface AppProviderProp {
  lang: LOCALE;
  children: JSX.Element;
}

export default function AppProvider({
  lang,
  children,
}: Readonly<AppProviderProp>): JSX.Element {
  return (
    <AuthProvider>
      <I18nProvider lang={lang}>
        <NotificationProvider>{children}</NotificationProvider>
      </I18nProvider>
    </AuthProvider>
  );
}
