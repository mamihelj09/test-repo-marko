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

export function updateTodo(id: string, changes: UpdateTodoInput): Todo {
  const document = loadTodoDocument();
  const todoIndex = document.todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    throw new Error('Todo not found.');
  }

  const existingTodo = document.todos[todoIndex];
  let nextText = existingTodo.text;

  if (changes.text !== undefined) {
    nextText = changes.text.trim();

    if (nextText.length === 0) {
      throw new Error('Todo text is required.');
    }
  }

  const updatedTodo: Todo = {
    ...existingTodo,
    text: nextText,
    updatedAt: getCurrentTimestamp(),
  };

  const todos = [...document.todos];
  todos[todoIndex] = updatedTodo;
  saveTodoDocument({ todos });

  return updatedTodo;
}

export function completeTodo(_id: string): Todo {
  throw new Error('Not implemented');
}

export function deleteTodo(_id: string): boolean {
  throw new Error('Not implemented');
}
