import { ReactNode } from "react";
import { useTodos } from "../../../hooks/useTodos";
import { TodosContext } from "./TodosContext";

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const todos = useTodos();
  return (
    <TodosContext.Provider value={todos}>{children}</TodosContext.Provider>
  );
};
