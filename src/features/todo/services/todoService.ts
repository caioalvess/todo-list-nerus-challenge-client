import React from "react";
import { Todo } from "../../../services/todo/types";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo as deleteTodoService,
} from "../../../services/todo";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export function useTodosService() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [totalPages, setTotalPages] = React.useState(1);
  const [pendingTodos, setPendingTodos] = React.useState(0);
  const [completedTodos, setCompletedTodos] = React.useState(0);

  const [searchParams] = useSearchParams();

  const title = searchParams.get("title") || undefined;
  const completed = searchParams.get("completed") || undefined;
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit") || 6);

  const params: { [key: string]: string | number | boolean } = {};
  if (title) params.title = title;
  if (completed !== undefined) params.completed = completed === "true";

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const payload = { page, limit, params };
      const todosResponse = await getTodos(payload);

      setTodos(todosResponse.data);
      setTotalPages(todosResponse.totalPages);
      setPendingTodos(todosResponse.totalPending);
      setCompletedTodos(todosResponse.totalCompleted);
    } catch (error) {
      console.error("Error fetching todos:", {
        error,
        params,
        page,
        limit,
      });
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
      const payload = { title, completed, description };
      await createTodo(payload);
      await fetchTodos();
      toast.success("Task added successfully", { richColors: true });
    } catch (error) {
      setLoading(false);
      toast.error("Error adding task", { richColors: true });
      console.error("Error adding task:", {
        error,
        title,
        completed,
        description,
      });
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) {
        console.warn(`Todo with id ${id} not found.`);
        return;
      }

      const updatedTodo = {
        ...todo,
        completed: !todo.completed,
      };

      const payload = {
        id: updatedTodo.id,
        title: updatedTodo.title,
        description: updatedTodo.description,
        completed: updatedTodo.completed,
      };

      const updatedTodoResponse = await updateTodo(payload);

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? updatedTodoResponse : t))
      );

      setPendingTodos((prev) => (updatedTodo.completed ? prev - 1 : prev + 1));
      setCompletedTodos((prev) =>
        updatedTodo.completed ? prev + 1 : prev - 1
      );
    } catch (error) {
      setLoading(false);
      console.error(`Error toggling todo with id ${id}:`, error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const todoExists = todos.some((t) => t.id === id);
      if (!todoExists) {
        console.warn(`Todo with id ${id} not found.`);
        return;
      }

      const payload = { id };

      await deleteTodoService(payload);

      setTodos((prev) => prev.filter((t) => t.id !== id));

      setPendingTodos((prev) =>
        todos.find((t) => t.id === id)?.completed ? prev : prev - 1
      );
      setCompletedTodos((prev) =>
        todos.find((t) => t.id === id)?.completed ? prev - 1 : prev
      );

      toast.success("Task deleted successfully", {
        description: "The task has been removed from the list.",
        richColors: true,
      });

      setTimeout(() => {
        fetchTodos();
      }, 400);
    } catch (error) {
      setLoading(false);
      toast.error("Error deleting task", { richColors: true });
      console.error(`Error deleting task with id ${id}:`, error);
    }
  };

  const editTodo = async (
    id: string,
    title: string,
    completed: boolean,
    description?: string
  ) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) {
        console.warn(`Todo with id ${id} not found.`);
        return;
      }

      const payload = {
        id,
        title,
        description,
        completed,
      };

      const updatedTodoResponse = await updateTodo(payload);

      toast.success("Task updated successfully", { richColors: true });

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? updatedTodoResponse : t))
      );

      if (todo.completed !== completed) {
        setPendingTodos((prev) => (completed ? prev - 1 : prev + 1));
        setCompletedTodos((prev) => (completed ? prev + 1 : prev - 1));
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error updating task", { richColors: true });
      console.error(`Error editing task with id ${id}:`, error);
    }
  };

  React.useEffect(() => {
    fetchTodos();
  }, [page, limit, title, completed]);

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
    fetchTodos,
    title,
    completed,
  };
}
