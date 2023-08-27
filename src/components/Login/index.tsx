"use client";

import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./login.module.scss";
import { TextField } from "@/components/UI/TextField";
import Popup, { PopupType } from "@/components/UI/Popup";
import { Button } from "@/components/UI/Button";
import { EAuthProviders, ETranslatableErrors, Forms } from "@/types";
import { ArrowRightCircle, GitHub } from "react-feather";
import { Card } from "../UI/Card";
import Title, { ETitleSize } from "../UI/Title";
import { ELocalStorageItems, useLocalStorage } from "@/lib/hooks";
import { Session } from "next-auth";
import { authRedirectConfig } from "@/constants";

export default function Login({ session }: { session: Session | null }) {
  const searchParams = useSearchParams();
  const tCommon = useTranslations("common");
  const t = useTranslations("login");
  const { handleSubmit, control } = useForm();
  const [translatableError, setTranslatableError] =
    useState<ETranslatableErrors | null>();
  const { value, removeLocalStorageItem } = useLocalStorage<Forms>(
    ELocalStorageItems.forms
  );

  useEffect(() => {
    if (!session && value) {
      removeLocalStorageItem();
    }
  }, [value, session, removeLocalStorageItem]);

  const errorParam = searchParams.get("error");

  useEffect(() => {
    if (
      errorParam &&
      Object.values(ETranslatableErrors).includes(errorParam as any)
    ) {
      setTranslatableError(errorParam as ETranslatableErrors);
    }
  }, [errorParam]);

  const onSubmit = (data: any) => {
    signIn(EAuthProviders.credentials, {
      email: data.email,
      password: data.password,
      ...authRedirectConfig,
    });
  };

  return (
    <div className={styles.login}>
      <Card className={styles.loginForm}>
        <Title size={ETitleSize.xl}>{tCommon("login")}</Title>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
          <div>
            <label>{tCommon("email")}</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: tCommon("validations.isRequired"),
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: t("validations.emailInvalid"),
                },
              }}
              render={({ field }) => (
                <TextField
                  fieldProps={field}
                  placeholder={t("emailPlaceholder")}
                  email
                />
              )}
            />
          </div>
          <div>
            <label>{tCommon("password")}</label>
            <Controller
              name="password"
              control={control}
              rules={{ required: tCommon("validations.isRequired") }}
              render={({ field }) => (
                <TextField
                  fieldProps={field}
                  placeholder={t("passwordPlaceholder")}
                  password
                />
              )}
            />
          </div>
          <Button label={t("loginButton")} icon={<ArrowRightCircle />} submit />
        </form>
        <div className={styles.providersSeparatorWrapper}>
          <div className={styles.separator}></div>
          <div>{t("or")}</div>
          <div className={styles.separator}></div>
        </div>
        <Button
          label={t("github")}
          icon={<GitHub />}
          onClick={() => signIn(EAuthProviders.github, authRedirectConfig)}
        />
      </Card>
      {translatableError && (
        <Popup type={PopupType.Error} text={t(`errors.${translatableError}`)} />
      )}
    </div>
  );
}
