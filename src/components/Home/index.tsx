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
  const { value: forms, setValue } = useLocalStorage<Forms>(
    ELocalStorageItems.forms
  );

  useEffect(() => {
    if (session && forms === null) {
      setValue(testForms);
    }
  }, [forms, session, setValue]);

  if (!session) {
    router.push("/auth/login");
  }

  return <FormsList />;
}
