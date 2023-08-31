"use client";

import { Session } from "next-auth";
import FormsList from "./FormsList";
import { useRouter } from "next/navigation";
import { ELocalStorageItems, useLocalStorage } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { testForms } from "@/mock";
import { TForms } from "@/types";
import Loader from "../UI/Loader";

export default function Home({ session }: { session: Session | null }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { value: forms, setValue } = useLocalStorage<TForms>(
    ELocalStorageItems.forms
  );

  useEffect(() => {
    if (session) {
      setIsLoading(false);
      if (forms === null) {
        setValue(testForms);
      }
    }
  }, [forms, session, setValue]);

  if (!session) {
    router.push("/auth/login");
  }

  if (isLoading) {
    return <Loader />;
  }

  return <FormsList />;
}
