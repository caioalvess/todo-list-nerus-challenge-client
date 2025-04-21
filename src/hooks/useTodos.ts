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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [pendingTodos, setPendingTodos] = useState(0);
  const [completedTodos, setCompletedTodos] = useState(0);
  const [filters, setFilters] = useState<
    { [key: string]: string | number | boolean } | undefined
  >(undefined);

  const fetchTodos = async (
    page: number,
    limit: number,
    params?: { [key: string]: string | number | boolean }
  ) => {
    try {
      setLoading(true);
      const todosResponse = await getTodos(page, limit, params);

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
      const addTodoResponse = await createTodo(title, completed, description);
      setTodos((prev) => [...prev, addTodoResponse]);
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
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

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const changeLimit = (newLimit: number) => {
    if (newLimit < 1) return;
    setLimit(newLimit);
    setPage(1);
  };

  const filterTodos = (
    filters: { [key: string]: string | number | boolean } | undefined
  ) => {
    setFilters(filters);
  };

  useEffect(() => {
    fetchTodos(page, limit, filters);
  }, [page, limit, filters]);

  return {
    todos,
    loading,
    page,
    totalPages,
    setLimit,
    goToPage,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    limit,
    changeLimit,
    pendingTodos,
    completedTodos,
    filterTodos,
  };
}
