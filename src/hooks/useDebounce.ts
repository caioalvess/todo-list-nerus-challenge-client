import { useCallback, useRef } from "react";

export function useDebounce() {
  const debouncing = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback((func: () => void, timeout: number) => {
    if (debouncing.current) {
      clearTimeout(debouncing.current);
    }

    debouncing.current = setTimeout(() => func(), timeout);
  }, []);

  return { debounce };
}
