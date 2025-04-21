import React, { useState } from "react";
import { Todo } from "../types/Todo.type";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo as deleteTodoService,
} from "../services/todo";
import { useSearchParams } from "react-router-dom";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [pendingTodos, setPendingTodos] = useState(0);
  const [completedTodos, setCompletedTodos] = useState(0);

  const [searchParams] = useSearchParams();

  const title = searchParams.get("title") || undefined;
  const completed = searchParams.get("completed") || undefined;
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit") || 6);

  const filters: { [key: string]: string | number | boolean } = {};
  if (title) filters.title = title;
  if (completed !== undefined) filters.completed = completed;

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const todosResponse = await getTodos(page, limit, filters);

      setTodos(todosResponse.data);
      setTotalPages(todosResponse.totalPages);
      setPendingTodos(todosResponse.totalPending);
      setCompletedTodos(todosResponse.totalCompleted);
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
      await createTodo(title, completed, description);

      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
      setLoading(false);
    }
  };

  const toggleTodo = async (id: string) => {
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

      if (completed) {
        setPendingTodos((prev) => prev - 1);
        setCompletedTodos((prev) => prev + 1);
      } else {
        setPendingTodos((prev) => prev + 1);
        setCompletedTodos((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setLoading(true);
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      await deleteTodoService(todo.id);

      fetchTodos();
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

  React.useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, completed, page, limit]);

  return {
    todos,
    loading,
    page,
    totalPages,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    limit,
    pendingTodos,
    completedTodos,
  };
}
