import * as integration from "./integration";
import * as mock from "./mock";
import {
  CreateTodo,
  DeleteTodo,
  GetTodoById,
  GetTodos,
  UpdateTodo,
} from "../../types/Todo.type";

const selectedModule =
  import.meta.env.VITE_APP_USE_MOCKS === "true" ? mock : integration;

export const getTodos: GetTodos = selectedModule.getTodos;
export const getTodoById: GetTodoById = selectedModule.getTodoById;
export const createTodo: CreateTodo = selectedModule.createTodo;
export const updateTodo: UpdateTodo = selectedModule.updateTodo;
export const deleteTodo: DeleteTodo = selectedModule.deleteTodo;
