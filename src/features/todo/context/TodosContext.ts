import { createContext } from "react";
import { useTodos } from "../../../hooks/useTodos";

export const TodosContext = createContext<
  ReturnType<typeof useTodos> | undefined
>(undefined);
