import React, { ReactNode } from "react";
import { render as rtlRender } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { ELangs } from "@/types";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

const renderWithProviders = (component: ReactNode, localeOverride?: ELangs) => {
  const locale = ELangs.cs || localeOverride;
  const messages = require(`./../translations/${locale}.json`);

  return rtlRender(
    <NextIntlClientProvider messages={messages} locale={locale}>
      {component}
    </NextIntlClientProvider>,
    { wrapper: MemoryRouterProvider }
  );
};

export default renderWithProviders;
