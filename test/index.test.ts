import { describe, expect, it } from 'vitest';

import { createGreeting } from '../src/index';

describe('createGreeting', () => {
  it('returns a neutral starter greeting', () => {
    expect(createGreeting()).toBe('Hello from todo-app-test-2');
  });
});
