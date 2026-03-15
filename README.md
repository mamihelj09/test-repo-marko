# todo-app-test-2

A reusable Node.js todo library backed by a `todos.json` file in the project root.

## Exported API

```ts
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  order: number;
};

export type AddTodoInput = {
  text: string;
};

export type UpdateTodoInput = {
  text?: string;
};

export declare function addTodo(input: AddTodoInput): Todo;
export declare function listTodos(): Todo[];
export declare function updateTodo(id: string, changes: UpdateTodoInput): Todo;
export declare function completeTodo(id: string): Todo;
export declare function deleteTodo(id: string): boolean;
```

## Persistence

Todos are stored in `/projects/test-repo-marko/todos.json` using this document shape:

```json
{
  "todos": []
}
```

## Usage

```ts
import {
  addTodo,
  completeTodo,
  deleteTodo,
  listTodos,
  updateTodo,
} from './dist/index';

const created = addTodo({ text: 'Draft docs' });
const updated = updateTodo(created.id, { text: 'Publish docs' });
const completed = completeTodo(updated.id);
const todos = listTodos();
deleteTodo(completed.id);

console.log(todos);
```

## Scripts

- `npm test` — run the Vitest suite
- `npm run build` — compile TypeScript to `dist/`
- `npm run lint` — run ESLint
- `npm run format` — format the repository with Prettier
- `npm run format:check` — verify Prettier formatting
- `npm run typecheck` — run TypeScript without emitting files

## Notes

This package exposes a library API only. There is no CLI or web API.
