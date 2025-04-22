import { Todo } from "../../types/Todo.type";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  loading: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    title: string,
    completed: boolean,
    description?: string
  ) => void;
};

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  loading,
}: Props) {
  if (todos.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-4 mb-10">
        <p className="text-gray-500 mt-4">Nenhuma tarefa encontrada.</p>
      </div>
    );

  return (
    <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          loading={loading}
        />
      ))}
    </ul>
  );
}
