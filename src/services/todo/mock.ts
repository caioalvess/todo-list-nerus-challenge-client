import { freeze } from "@/lib/utils";
import {
  CreateTodo,
  CreateTodoResponse,
  DeleteTodo,
  DeleteTodoResponse,
  GetTodoById,
  GetTodos,
  GetTodosResponse,
  Todo,
  UpdateTodo,
  UpdateTodoResponse,
} from "@/types/Todo.type";
import { v4 as uuidv4 } from "uuid";

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

export const getTodos: GetTodos = async (
  page,
  limit,
  params
): Promise<GetTodosResponse> => {
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

export const getTodoById: GetTodoById = async (id: string): Promise<Todo> => {
  console.log("GetTodo Mock", id);

  await freeze();

  return moockedTodo;
};

export const createTodo: CreateTodo = async (
  title,
  completed,
  description
): Promise<CreateTodoResponse> => {
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

export const updateTodo: UpdateTodo = async (
  id,
  title,
  description,
  completed
): Promise<UpdateTodoResponse> => {
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

export const deleteTodo: DeleteTodo = async (
  id
): Promise<DeleteTodoResponse> => {
  console.log("DeleteTodo Mock", id);

  await freeze();

  return id;
};
