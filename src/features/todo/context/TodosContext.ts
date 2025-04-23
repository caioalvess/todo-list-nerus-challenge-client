import { createContext } from "react";
import { useTodosService } from "../../todo/services/todoService";

export const TodosContext = createContext<
  ReturnType<typeof useTodosService> | undefined
>(undefined);
