import fs from 'node:fs';
import path from 'node:path';

import type { TodoDocument } from './todo-types';

const todoFilePath = path.join(process.cwd(), 'todos.json');

export function loadTodoDocument(): TodoDocument {
  if (!fs.existsSync(todoFilePath)) {
    return { todos: [] };
  }

  const fileContent = fs.readFileSync(todoFilePath, 'utf8');

  return JSON.parse(fileContent) as TodoDocument;
}

export function saveTodoDocument(document: TodoDocument): void {
  fs.writeFileSync(todoFilePath, `${JSON.stringify(document, null, 2)}\n`);
}
