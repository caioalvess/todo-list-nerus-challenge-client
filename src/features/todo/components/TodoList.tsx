import { useTodosContext } from "../context/useTodosContext";
import TodoItem from "../components/TodoItem";

export default function TodoList() {
  const { todos } = useTodosContext();

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-4 mb-10">
        <p className="text-gray-500 mt-4">No tasks found.</p>
      </div>
    );
  }

  return (
    <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
