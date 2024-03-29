"use client";

import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
  FocusEvent,
} from "react";
import styles from "./login.module.scss";
import TextField from "@/components/UI/TextField";
import Popup, { EPopupType } from "@/components/UI/Popup";
import { Button } from "@/components/UI/Button";
import { EAuthProviders, TForms } from "@/types";
import { ArrowRightCircle, GitHub } from "react-feather";
import { Card } from "../UI/Card";
import Title, { ETitleSize } from "../UI/Title";
import { ELocalStorageItems, useLocalStorage } from "@/lib/hooks";
import { Session } from "next-auth";
import { authRedirectConfig } from "@/constants";
import { ELoginTranslatableErrors } from "./types";
import { isValidEmail } from "@/lib";

export default function Login({ session }: { session: Session | null }) {
  const searchParams = useSearchParams();
  const tCommon = useTranslations("common");
  const t = useTranslations("login");
  const [email, setEmail] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [emailError, setIsEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [translatableError, setTranslatableError] =
    useState<ELoginTranslatableErrors | null>();
  const { value, removeItem } = useLocalStorage<TForms>(
    ELocalStorageItems.forms
  );

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (!session && value) {
      removeItem();
    }
  }, [value, session, removeItem]);

  const errorParam = searchParams.get("error");

  useEffect(() => {
    if (
      errorParam &&
      Object.values(ELoginTranslatableErrors).includes(errorParam as any)
    ) {
      setTranslatableError(errorParam as ELoginTranslatableErrors);
    }
  }, [errorParam]);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    signIn(EAuthProviders.credentials, {
      email,
      password,
      ...authRedirectConfig,
    });
  };

  const handleEmailOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsEmailError(false);
      return;
    }

    if (isValidEmail(e.target.value)) {
      setEmail(e.target.value);
      setIsEmailError(false);
    }
  };

  const handleEmailOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value && !isValidEmail(e.target.value)) {
      setIsEmailError(true);
    }
  };

  const handlePasswordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  };


  return (
    <div className={styles.login}>
      <Card className={styles.loginForm}>
        <Title size={ETitleSize.xl}>{tCommon("login")}</Title>
        <form onSubmit={onSubmit} className={styles.formWrapper}>
          <div>
            <label>
              {tCommon("email")}
            </label>
            <TextField
                name="email"
                required
                placeholder={t("emailPlaceholder")}
                email
                key="kokot"
                title="component 2"
                error={emailError}
                ref={emailInputRef}
                onChange={handleEmailOnChange}
                onBlur={handleEmailOnBlur}
              />
            {emailError && (
              <Title
                className={styles.emailErrorTitle}
                size={ETitleSize.sm}
                error
              >
                {t("validations.emailInvalid")}
              </Title>
            )}
          </div>
          <div>
            <label>{tCommon("password")}</label>
            <TextField
              name="password"
              placeholder={t("passwordPlaceholder")}
              password
              key="kokot"
              required
              onChange={handlePasswordOnChange}
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
        <Popup
          type={EPopupType.Error}
          text={t(`errors.${translatableError}`)}
        />
      )}
    </div>
  );
}
