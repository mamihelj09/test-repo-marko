import { beforeEach, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

import {
  addTodo,
  completeTodo,
  deleteTodo,
  listTodos,
  updateTodo,
} from '../src/index';

const todoFilePath = path.join(process.cwd(), 'todos.json');

describe('public todo API', () => {
  it('exports the supported todo operations', () => {
    expect(typeof addTodo).toBe('function');
    expect(typeof listTodos).toBe('function');
    expect(typeof updateTodo).toBe('function');
    expect(typeof completeTodo).toBe('function');
    expect(typeof deleteTodo).toBe('function');
  });
});

describe('public todo API behavior', () => {
  beforeEach(() => {
    fs.rmSync(todoFilePath, { force: true });
  });

  it('lists todos in ascending order after multiple additions', () => {
    const first = addTodo({ text: 'first' });
    const second = addTodo({ text: 'second' });

    expect(listTodos()).toEqual([first, second]);
  });
});
