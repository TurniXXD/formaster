"use client";

import { useState } from "react";
import { isArrayofObjects, isObject, isValidJSON } from ".";

type LocalStorageValue = string | object | number | boolean | null | undefined;

export enum ELocalStorageItems {
  forms = "forms",
}

export const setLocalStorageItem = <T extends LocalStorageValue>(
  key: ELocalStorageItems,
  value: T
) => {
  let valueParsed: any = value;
  if (isObject(valueParsed) || isArrayofObjects(valueParsed)) {
    valueParsed = JSON.stringify(valueParsed);
  }
  localStorage.setItem(key, valueParsed);
};

export const useLocalStorage = <T extends LocalStorageValue>(
  key: ELocalStorageItems
) => {
  let initialValue: string | null = null;
  if (typeof window !== "undefined") {
    initialValue = localStorage.getItem(key);
  }

  const initialValueParsed: T | undefined =
    initialValue && isValidJSON(initialValue) && JSON.parse(initialValue);
  const [localStorageValue, setLocalStorageValue] = useState<T | null>(initialValueParsed || null);

  const setValue = (newValue: T) => {
    if (typeof window !== "undefined") {
      setLocalStorageValue(newValue);
      setLocalStorageItem(key, newValue);
    }
  };

  const removeItem = () => {
    if (typeof window !== "undefined") {
      setLocalStorageValue(null);
      localStorage.removeItem(key);
    }
  };

  return {
    value: localStorageValue,
    setValue,
    removeItem,
  };
};
