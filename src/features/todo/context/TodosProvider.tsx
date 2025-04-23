import { ReactNode } from "react";
import { useTodosService } from "../services/todoService";
import { TodosContext } from "./TodosContext";

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const todosService = useTodosService();
  return (
    <TodosContext.Provider value={todosService}>
      {children}
    </TodosContext.Provider>
  );
};
