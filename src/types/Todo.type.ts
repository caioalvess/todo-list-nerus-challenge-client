export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GetTodosResponse = {
  data: Todo[];
  totalCompleted: number;
  totalPending: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type GetTodoByIdResponse = Todo;

export type UpdateTodoResponse = Todo;

export type CreateTodoResponse = Todo;

export type DeleteTodoResponse = Todo["id"];

export type GetTodos = (
  page: number,
  limit: number,
  params?: { [key: string]: string | number | boolean }
) => Promise<GetTodosResponse>;

export type GetTodoById = (id: string) => Promise<GetTodoByIdResponse>;

export type CreateTodo = (
  title: string,
  completed: boolean,
  description?: string
) => Promise<CreateTodoResponse>;

export type UpdateTodo = (
  id: string,
  title?: string,
  description?: string,
  completed?: boolean
) => Promise<UpdateTodoResponse>;

export type DeleteTodo = (id: string) => Promise<DeleteTodoResponse>;
