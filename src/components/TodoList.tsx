import { Todo } from "../types/Todo.type";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onEdit }: Props) {
  if (todos.length === 0)
    return <p className="text-gray-500 mt-4">Nenhuma tarefa encontrada.</p>;

  return (
    <ul className="mt-4 grid grid-cols-2 gap-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
