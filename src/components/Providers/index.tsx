"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

export default function Providers({
  session,
  locale,
  children,
  translations,
}: {
  session: Session | null;
  locale: string;
  children: ReactNode;
  translations: any;
}) {
  return (
    <SessionProvider session={session}>
      <NextIntlClientProvider locale={locale} messages={translations}>
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  );
}