import type { AddTodoInput, Todo, UpdateTodoInput } from './todo-types';

export function addTodo(_input: AddTodoInput): Todo {
  throw new Error('Not implemented');
}

export function listTodos(): Todo[] {
  throw new Error('Not implemented');
}

export function updateTodo(_id: string, _changes: UpdateTodoInput): Todo {
  throw new Error('Not implemented');
}

export function completeTodo(_id: string): Todo {
  throw new Error('Not implemented');
}

export function deleteTodo(_id: string): boolean {
  throw new Error('Not implemented');
}
