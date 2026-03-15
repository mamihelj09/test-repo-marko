import { describe, expect, it } from 'vitest';

import {
  addTodo,
  completeTodo,
  deleteTodo,
  listTodos,
  updateTodo,
} from '../src/index';

describe('public todo API', () => {
  it('exports the supported todo operations', () => {
    expect(typeof addTodo).toBe('function');
    expect(typeof listTodos).toBe('function');
    expect(typeof updateTodo).toBe('function');
    expect(typeof completeTodo).toBe('function');
    expect(typeof deleteTodo).toBe('function');
  });
});
