import React from "react";
import { useTodos } from "./hooks/useTodos";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import Wrapper from "./components/design/Wrapper";
import TodoFilterInput from "./components/TodoFilterInput";
import TodoFilterButtons from "./components/TodoFilterButtons";
import TodoCount from "./components/TodoCount";

export type Filter = "all" | "active" | "completed";

function App() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const { todos, loading, addTodo, toggleTodo, deleteTodo, editTodo } =
    useTodos();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <Wrapper>
      <div className="w-screen h-screen container pt-10  max-w-2/3 px-4">
        <TodoForm onAdd={addTodo} />
        <TodoFilterInput />
        <TodoFilterButtons />
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        )}
        <TodoCount />
      </div>
    </Wrapper>
  );
}

export default App;
