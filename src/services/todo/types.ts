/** ======= OBJECTS ======= */
export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

/** ======= PAYLOADS ======= */
export type GetTodosPayload = {
  page: number;
  limit: number;
  params?: { [key: string]: string | number | boolean };
};

export type GetTodoByIdPayload = {
  id: string;
};

export type CreateTodoPayload = {
  title: string;
  completed: boolean;
  description?: string;
};

export type UpdateTodoPayload = {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
};

export type DeleteTodoPayload = {
  id: string;
};

/** ======= REQUESTS ======= */
export type GetTodos = (payload: GetTodosPayload) => Promise<GetTodosResponse>;

export type GetTodoById = (
  payload: GetTodoByIdPayload
) => Promise<GetTodoByIdResponse>;

export type CreateTodo = (
  payload: CreateTodoPayload
) => Promise<CreateTodoResponse>;

export type UpdateTodo = (
  payload: UpdateTodoPayload
) => Promise<UpdateTodoResponse>;

export type DeleteTodo = (
  payload: DeleteTodoPayload
) => Promise<DeleteTodoResponse>;

/** ======= RESPONSES ======= */
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
