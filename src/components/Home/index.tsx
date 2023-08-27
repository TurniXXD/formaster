"use client";

import { Session } from "next-auth";
import FormsList from "./FormsList";
import { useRouter } from "next/navigation";
import { ELocalStorageItems, useLocalStorage } from "@/lib/hooks";
import { useEffect } from "react";
import { testForms } from "@/mock";
import { Forms } from "@/types";

export default function Home({ session }: { session: Session | null }) {
  const router = useRouter();
  const { value, setLocalStorageValue } = useLocalStorage<Forms>(
    ELocalStorageItems.forms
  );

  useEffect(() => {
    if (session && value === null) {
      setLocalStorageValue(testForms);
    }
  }, [value, session, setLocalStorageValue]);

  if (!session) {
    router.push("/auth/login");
  }

  return <FormsList />;
}
