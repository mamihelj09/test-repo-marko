import { beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

import { addTodo, listTodos } from '../src/todo-service';

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
});
