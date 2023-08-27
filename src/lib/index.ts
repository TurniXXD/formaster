import { format } from "date-fns";

/**
 * Remove locale prefix for path
 * @returns `/path/without/locale/prefix/`
 */
export const removeLocalePrefix = (path: string) => {
  return path.replace(/^\/[^/]+/, "");
};

export const isValidJSON = (value: any) => {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
};

export const isObject = (value: any) => {
  return typeof value === "object";
};

export const isArrayofObjects = (value: any) => {
  return Array.isArray(value) && value.every((item) => isObject(item));
};

/**
 * Default formatting for dates in this project
 */
export const formatDateTime = (date: Date) => {
  return format(date, "dd.MM.yyyy HH:mm");
};