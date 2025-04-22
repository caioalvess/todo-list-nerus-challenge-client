import api from "../api";

import {
  CreateTodo,
  CreateTodoPayload,
  CreateTodoResponse,
  DeleteTodo,
  DeleteTodoPayload,
  DeleteTodoResponse,
  GetTodoById,
  GetTodoByIdPayload,
  GetTodoByIdResponse,
  GetTodos,
  GetTodosPayload,
  GetTodosResponse,
  UpdateTodo,
  UpdateTodoPayload,
  UpdateTodoResponse,
} from "./types";

/** ======= GET ALL ======= */
export const getTodos: GetTodos = async (
  payload: GetTodosPayload
): Promise<GetTodosResponse> => {
  const response = await api.get<GetTodosResponse>("/todos", {
    params: {
      page: payload.page,
      limit: payload.limit,
      ...payload.params,
    },
  });

  return response.data;
};

/** ======= GET BY ID ======= */
export const getTodoById: GetTodoById = async (
  payload: GetTodoByIdPayload
): Promise<GetTodoByIdResponse> => {
  const response = await api.get(`/todos/${payload.id}`);
  return response.data;
};

/** ======= CREATE ======= */
export const createTodo: CreateTodo = async (
  payload: CreateTodoPayload
): Promise<CreateTodoResponse> => {
  const response = await api.post("/todos", {
    title: payload.title,
    completed: payload.completed,
    description: payload.description,
  });
  return response.data;
};

/** ======= UPDATE ======= */
export const updateTodo: UpdateTodo = async (
  payload: UpdateTodoPayload
): Promise<UpdateTodoResponse> => {
  const response = await api.put(`/todos/${payload.id}`, {
    title: payload.title,
    description: payload.description,
    completed: payload.completed,
  });

  return response.data;
};

/** ======= DELETE ======= */
export const deleteTodo: DeleteTodo = async (
  payload: DeleteTodoPayload
): Promise<DeleteTodoResponse> => {
  await api.delete(`/todos/${payload.id}`);
  return payload.id;
};
