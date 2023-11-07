import '@testing-library/jest-dom/extend-expect'

const useRouter = jest.spyOn(require("next/router"), "useRouter");

useRouter.mockImplementationOnce(() => ({
  query: { locale },
}));