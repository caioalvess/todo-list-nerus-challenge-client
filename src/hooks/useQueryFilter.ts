import { useSearchParams } from "react-router-dom";

export function useQueryFilter<T extends Record<string, unknown>>() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getFilters = (): Partial<T> => {
    const filters: Partial<T> = {};
    searchParams.forEach((value, key) => {
      filters[key as keyof T] = value as T[keyof T];
    });
    return filters;
  };

  const updateFilter = (key: keyof T, value: T[keyof T] | undefined | null) => {
    const params = new URLSearchParams(searchParams.toString()); // copia os atuais
    if (value === undefined || value === "" || value === null) {
      params.delete(String(key));
    } else {
      params.set(String(key), String(value));
    }
    setSearchParams(params, { replace: true });
  };

  const removeFilter = (key: keyof T) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(String(key));
    setSearchParams(params, { replace: true });
  };

  return {
    filters: getFilters(),
    updateFilter,
    removeFilter,
  };
}
