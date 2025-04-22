import { freeze } from "@/lib/utils";
import {
  CreateTodo,
  CreateTodoPayload,
  CreateTodoResponse,
  DeleteTodo,
  DeleteTodoPayload,
  DeleteTodoResponse,
  GetTodoById,
  GetTodoByIdPayload,
  GetTodos,
  GetTodosResponse,
  Todo,
  UpdateTodo,
  UpdateTodoPayload,
  UpdateTodoResponse,
} from "./types";

import { v4 as uuidv4 } from "uuid";
import { GetTodosPayload } from "./types";

const mockedTodos: Todo[] = [
  {
    id: "1",
    title: "Learn TypeScript",
    description: "Understand the basics of TypeScript",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Build a Todo App",
    description: "Create a todo app using React and TypeScript",
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const moockedTodo: Todo = {
  id: "2",
  title: "Build a Todo App",
  description: "Create a todo app using React and TypeScript",
  completed: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/** ======= GET ALL ======= */
export const getTodos: GetTodos = async ({
  page,
  limit,
  params,
}: GetTodosPayload): Promise<GetTodosResponse> => {
  console.log("GetTodos Mock", page, limit, params);

  await freeze();

  return {
    data: mockedTodos,
    total: mockedTodos.length,
    totalCompleted: mockedTodos.filter((todo) => todo.completed).length,
    totalPending: mockedTodos.filter((todo) => !todo.completed).length,
    page,
    limit,
    totalPages: Math.ceil(mockedTodos.length / limit),
  };
};

/** ======= GET BY ID ======= */
export const getTodoById: GetTodoById = async ({
  id,
}: GetTodoByIdPayload): Promise<Todo> => {
  console.log("GetTodo Mock", id);

  await freeze();

  return moockedTodo;
};

/** ======= CREATE ======= */
export const createTodo: CreateTodo = async ({
  title,
  completed,
  description,
}: CreateTodoPayload): Promise<CreateTodoResponse> => {
  console.log("CreateTodo Mock", title, completed, description);

  await freeze();

  return {
    id: uuidv4(),
    title,
    completed,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/** ======= UPDATE ======= */
export const updateTodo: UpdateTodo = async ({
  id,
  title,
  description,
  completed,
}: UpdateTodoPayload): Promise<UpdateTodoResponse> => {
  console.log("UpdateTodo Mock", id, title, description, completed);

  await freeze();

  return {
    id,
    title: title || moockedTodo.title,
    description: description || moockedTodo.description,
    completed: completed !== undefined ? completed : moockedTodo.completed,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/** ======= DELETE ======= */
export const deleteTodo: DeleteTodo = async ({
  id,
}: DeleteTodoPayload): Promise<DeleteTodoResponse> => {
  console.log("DeleteTodo Mock", id);

  await freeze();

  return id;
};
