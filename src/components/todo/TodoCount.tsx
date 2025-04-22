import { useTodosContext } from "@/context/todo/useTodosContext";

export default function TodoCount() {
  const { pendingTodos, completedTodos } = useTodosContext();
  return (
    <>
      <span>{pendingTodos} pending</span>
      <span>•</span>
      <span>{completedTodos} completed</span>
    </>
  );
}
