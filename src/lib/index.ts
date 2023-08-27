/**
 * Remove locale prefix for path
 * @returns `/path/without/locale/prefix`
 */
export const removeLocalePrefix = (path: string) => {
  return path.replace(/^\/[^/]+/, "");
};
