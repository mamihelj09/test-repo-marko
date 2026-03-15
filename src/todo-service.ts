import crypto from 'node:crypto';

import { loadTodoDocument, saveTodoDocument } from './todo-storage';
import type { AddTodoInput, Todo, UpdateTodoInput } from './todo-types';

function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

export function addTodo(input: AddTodoInput): Todo {
  const normalizedText = input.text.trim();

  if (normalizedText.length === 0) {
    throw new Error('Todo text is required.');
  }

  const document = loadTodoDocument();
  const timestamp = getCurrentTimestamp();
  const todo: Todo = {
    id: crypto.randomUUID(),
    text: normalizedText,
    completed: false,
    createdAt: timestamp,
    updatedAt: timestamp,
    completedAt: null,
    order: document.todos.length,
  };

  saveTodoDocument({ todos: [...document.todos, todo] });

  return todo;
}

export function listTodos(): Todo[] {
  const document = loadTodoDocument();

  return [...document.todos].sort((left, right) => left.order - right.order);
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
