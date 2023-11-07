import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { ERoutesPaths } from "@/types";
import mockRouter from "next-router-mock";
import FormTesterList from ".";
import { testForms } from "@/mock";
import { formatDateTime } from "@/lib";
import renderWithProviders from "@/lib/tests";

jest.mock("../../lib/hooks");

describe("FormTesterList Component", () => {
  require("../../lib/hooks").useLocalStorage.mockReturnValue({
    value: testForms,
  });

  it("renders forms list", () => {
    renderWithProviders(<FormTesterList />);

    testForms.forEach((form) => {
      expect(screen.getByTestId(form.id)).toBeInTheDocument();
      expect(screen.getByTestId(`${form.id}-fields-count`)).toHaveTextContent(
        form.fields.length.toString()
      );
      expect(screen.getByTestId(`${form.id}-created-at`)).toHaveTextContent(
        formatDateTime(form.createdAt)
      );
      expect(screen.getByTestId(`${form.id}-updated-at`)).toHaveTextContent(
        formatDateTime(form.updatedAt)
      );
    });
  });

  it("redirects to form tester with specific form open", () => {
    renderWithProviders(<FormTesterList />);

    testForms.forEach((form) => {
      const formItem = screen.getByTestId(form.id);

      fireEvent.click(formItem);

      expect(mockRouter.asPath).toEqual(ERoutesPaths.formTester + form.id);
    });
  });
});
