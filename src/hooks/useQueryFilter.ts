import { useSearchParams } from "react-router-dom";

export function useQueryFilter<T extends Record<string, string>>() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = Object.fromEntries(searchParams.entries()) as T;

  const updateFilter = (updates: Partial<T>) => {
    const updatedFilters = { ...filters, ...updates };
    setSearchParams(updatedFilters);
  };

  const removeFilter = (key: keyof T) => {
    const updatedFilters = { ...filters };
    delete updatedFilters[key];
    setSearchParams(updatedFilters);
  };

  return { filters, updateFilter, removeFilter };
}
