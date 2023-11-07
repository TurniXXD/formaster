import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import Navigation from "@/components/Navigation";
import { ERoutesPaths } from "@/types";
import mockRouter from "next-router-mock";
import { defaultLocale } from "@/constants";
import renderWithProviders from "@/lib/tests";

describe("Navigation Component", () => {
  it("renders links", () => {
    renderWithProviders(<Navigation />);

    expect(screen.getByTestId(ERoutesPaths.root)).toBeInTheDocument();
    expect(screen.getByTestId(ERoutesPaths.formTester)).toBeInTheDocument();
    expect(screen.getByTestId(ERoutesPaths.formBuilder)).toBeInTheDocument();
  });

  it("redirects to desired routes", () => {
    renderWithProviders(<Navigation />);

    const rootLink = screen.getByTestId(ERoutesPaths.root);
    const formTesterLink = screen.getByTestId(ERoutesPaths.formTester);
    const formBuilderLink = screen.getByTestId(ERoutesPaths.formBuilder);

    fireEvent.click(rootLink);
    expect(mockRouter.asPath.replace(defaultLocale, "")).toEqual(
      ERoutesPaths.root
    );

    fireEvent.click(formTesterLink);
    expect(mockRouter.asPath.replace(`/${defaultLocale}`, "") + "/").toEqual(
      ERoutesPaths.formTester
    );

    fireEvent.click(formBuilderLink);
    expect(mockRouter.asPath.replace(`/${defaultLocale}`, "") + "/").toEqual(
      ERoutesPaths.formBuilder
    );
  });
});
