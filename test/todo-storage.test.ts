import { beforeEach, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

import { loadTodoDocument, saveTodoDocument } from '../src/todo-storage';

const todoFilePath = path.join(process.cwd(), 'todos.json');

describe('loadTodoDocument', () => {
  beforeEach(() => {
    fs.rmSync(todoFilePath, { force: true });
  });

  it('returns an empty todo collection when todos.json does not exist', () => {
    expect(loadTodoDocument()).toEqual({ todos: [] });
  });

  it('writes and reloads the exact { todos: [...] } document shape', () => {
    const document = {
      todos: [
        {
          id: 'todo-1',
          text: 'write tests',
          completed: false,
          createdAt: '2026-03-15T10:00:00.000Z',
          updatedAt: '2026-03-15T10:00:00.000Z',
          completedAt: null,
          order: 0,
        },
      ],
    };

    saveTodoDocument(document);

    expect(loadTodoDocument()).toEqual(document);
    expect(fs.readFileSync(todoFilePath, 'utf8')).toBe(
      `${JSON.stringify(document, null, 2)}\n`,
    );
  });
});
