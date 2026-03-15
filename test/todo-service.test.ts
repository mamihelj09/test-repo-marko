import { beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

import { addTodo, listTodos, updateTodo } from '../src/todo-service';

const todoFilePath = path.join(process.cwd(), 'todos.json');

describe('todo service create and list', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    fs.rmSync(todoFilePath, { force: true });
  });

  it('adds a new todo with generated fields and persists it', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-15T10:00:00.000Z'));

    const todo = addTodo({ text: 'write implementation plan' });

    expect(todo).toEqual({
      id: expect.any(String),
      text: 'write implementation plan',
      completed: false,
      createdAt: '2026-03-15T10:00:00.000Z',
      updatedAt: '2026-03-15T10:00:00.000Z',
      completedAt: null,
      order: 0,
    });

    expect(listTodos()).toEqual([todo]);
  });

  it('rejects adding a todo when text is empty after trimming', () => {
    expect(() => addTodo({ text: '   ' })).toThrowError(
      'Todo text is required.',
    );
    expect(listTodos()).toEqual([]);
  });

  it('updates todo text and refreshed updatedAt timestamp', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-15T10:00:00.000Z'));

    const created = addTodo({ text: 'draft plan' });

    vi.setSystemTime(new Date('2026-03-15T10:05:00.000Z'));

    const updated = updateTodo(created.id, { text: 'finalize plan' });

    expect(updated).toEqual({
      ...created,
      text: 'finalize plan',
      updatedAt: '2026-03-15T10:05:00.000Z',
    });
    expect(listTodos()).toEqual([updated]);
  });

  it('rejects update when the todo id does not exist', () => {
    expect(() => updateTodo('missing-id', { text: 'x' })).toThrowError(
      'Todo not found.',
    );
  });

  it('rejects update when text is empty after trimming', () => {
    const created = addTodo({ text: 'keep me' });

    expect(() => updateTodo(created.id, { text: '   ' })).toThrowError(
      'Todo text is required.',
    );
    expect(listTodos()).toEqual([created]);
  });
});
