import { useEffect, useState } from "react";
import api from "../services/api";
import { Todo } from "../types/Todo.type";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    const res = await api.get<Todo[]>("/todos");
    setTodos(res.data);
    setLoading(false);
  };

  const addTodo = async (title: string) => {
    const res = await api.post<Todo>("/todos", { title, completed: false });
    setTodos((prev) => [...prev, res.data]);
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const res = await api.put<Todo>(`/todos/${id}`, {
      ...todo,
      completed: !todo.completed,
    });
    setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
  };

  const deleteTodo = async (id: string) => {
    await api.delete(`/todos/${id}`);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = async (id: string, title: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const res = await api.put<Todo>(`/todos/${id}`, { ...todo, title });
    setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, addTodo, toggleTodo, deleteTodo, editTodo };
}
