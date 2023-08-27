import { ELangs } from "@/types";

export const defaultLocale = ELangs.cs;
export const locales = [ELangs.cs, ELangs.en];
export const publicPages = ["/auth/login/"];
export const authPages = {
  signIn: "/auth/login/",
  signOut: "/auth/login/",
  error: "/auth/login/",
};
