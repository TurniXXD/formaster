import React from "react";
import { render, screen } from "@testing-library/react";
import Navigation from "@/components/Navigation";
import { ELangs } from "@/types";
import { NextIntlClientProvider } from "next-intl";

describe("Navigation Component", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");
  const locale = ELangs.cs;
  const messages = require(`./../src/translations/${locale}.json`);

  useRouter.mockImplementationOnce(() => ({
    query: { locale },
  }));

  it("renders links", () => {
    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Navigation />
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId("/")).toBeInTheDocument();
    expect(screen.getByTestId("/form-tester/")).toBeInTheDocument();
    expect(screen.getByTestId("/form-builder/")).toBeInTheDocument();
  });
});
