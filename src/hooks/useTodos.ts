import { useEffect, useState } from "react";
import { Todo } from "../types/Todo.type";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo as deleteTodoService,
} from "../services/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async (
    page: number,
    limit: number,
    params?: { [key: string]: string | number | boolean }
  ) => {
    try {
      setLoading(true);
      const todosResponse = await getTodos(page, limit, params);

      setTodos(todosResponse as unknown as Todo[]);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (
    title: string,
    completed: boolean,
    description?: string
  ) => {
    try {
      setLoading(true);
      const addTodoResponse = await createTodo(title, completed, description);
      setTodos((prev) => [...prev, addTodoResponse]);
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id: string) => {
    console.log("Toggling todo with id:", id);
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const completed = !todo.completed;

      const toggleTodoResponse = await updateTodo(
        todo.id,
        todo.title,
        todo.description,
        completed
      );
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? toggleTodoResponse : t))
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      await deleteTodoService(todo.id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const editTodo = async (id: string, title: string, description?: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const editTodoResponse = await updateTodo(todo.id, title, description);
    setTodos((prev) => prev.map((t) => (t.id === id ? editTodoResponse : t)));
  };

  useEffect(() => {
    fetchTodos(1, 10);
  }, []);

  return { todos, loading, addTodo, toggleTodo, deleteTodo, editTodo };
}
