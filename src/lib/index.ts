import { format } from "date-fns";

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
  const newDate = new Date(date)
  return format(newDate, "dd.MM.yyyy HH:mm");
};

export const convertToNumberIfPossible = (value: string | number) => {
  if (typeof value === "number" ) {
    return value
  }

  value = value.trim();

  // Check if the valueing is numeric
  if (/^[+-]?\d+(\.\d+)?$/.test(value)) {
    if (value.includes(".")) {
      return parseFloat(value);
    } else {
      return parseInt(value, 10);
    }
  } else {
    return value;
  }
};
