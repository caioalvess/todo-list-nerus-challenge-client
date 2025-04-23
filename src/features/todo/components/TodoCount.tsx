import { useTodosContext } from "../context/useTodosContext";

export default function TodoCount() {
  const { pendingTodos, completedTodos } = useTodosContext();

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span>{pendingTodos} pending</span>
      <span className="text-gray-400">•</span>
      <span>{completedTodos} completed</span>
    </div>
  );
}
