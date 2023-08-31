import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { testUser } from "@/mock";
import { AuthOptions } from "next-auth";
import { authPages } from "@/constants";
import { ELoginTranslatableErrors } from "@/components/Login/types";

const providers = [
  CredentialsProvider({
    id: "credentials-login",
    name: "Credentials",
    credentials: {
      email: { type: "email" },
      password: { type: "password" },
    },
    async authorize(credentials) {
      if (credentials?.email !== testUser.email) {
        throw new Error(ELoginTranslatableErrors.wrongEmail);
      }

      if (credentials?.password !== testUser.password) {
        throw new Error(ELoginTranslatableErrors.wrongPassword);
      }

      return testUser;
    },
  }),
  GithubProvider({
    clientId: process.env.GITHUB_ID || "",
    clientSecret: process.env.GITHUB_SECRET || "",
  }),
];

export const authOptions: AuthOptions = {
  pages: authPages,
  secret: process.env.NEXTAUTH_SECRET,
  providers,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
