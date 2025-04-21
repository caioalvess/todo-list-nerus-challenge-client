import api from "../api";

import {
  CreateTodo,
  CreateTodoResponse,
  DeleteTodo,
  DeleteTodoResponse,
  GetTodoById,
  GetTodoByIdResponse,
  GetTodos,
  GetTodosResponse,
  UpdateTodo,
  UpdateTodoResponse,
} from "../../types/Todo.type";

export const getTodos: GetTodos = async (
  page: number,
  limit: number,
  params: { [key: string]: string | number | boolean }
): Promise<GetTodosResponse> => {
  const response = await api.get<GetTodosResponse>("/todos", {
    params: {
      page,
      limit,
      ...params,
    },
  });

  return response.data;
};

export const getTodoById: GetTodoById = async (
  id: string
): Promise<GetTodoByIdResponse> => {
  const response = await api.get(`/todos/${id}`);
  return response.data;
};

export const createTodo: CreateTodo = async (
  title: string,
  completed: boolean,
  description?: string
): Promise<CreateTodoResponse> => {
  const response = await api.post("/todos", {
    title,
    completed,
    description,
  });
  return response.data;
};

export const updateTodo: UpdateTodo = async (
  id: string,
  title?: string,
  description?: string,
  completed?: boolean
): Promise<UpdateTodoResponse> => {
  const response = await api.put(`/todos/${id}`, {
    title,
    description,
    completed,
  });
  return response.data;
};

export const deleteTodo: DeleteTodo = async (
  id: string
): Promise<DeleteTodoResponse> => {
  await api.delete(`/todos/${id}`);
  return id;
};
