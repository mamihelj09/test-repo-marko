export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  order: number;
};

export type TodoDocument = {
  todos: Todo[];
};

export type AddTodoInput = {
  text: string;
};

export type UpdateTodoInput = {
  text?: string;
};
