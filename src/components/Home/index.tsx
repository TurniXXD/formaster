"use client";

import { Session } from "next-auth";
import FormsList from "./FormsList";
import { useRouter } from "next/navigation";

export default function Home({ session }: { session: Session | null }) {
  const router = useRouter();

  if (!session) {
    router.push("/auth/login");
  }

  return <FormsList />;
}
