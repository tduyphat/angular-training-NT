import { Injectable, computed, signal } from '@angular/core';
import type { Todo } from './models/todo';

const STORAGE_KEY = 'ng19.todo.items';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private _todos = signal<Todo[]>(this.readFromStorage());
  readonly todos = computed(() => this._todos());
  readonly remainingCount = computed(() => this._todos().filter(t => !t.done).length);
  readonly completedCount = computed(() => this._todos().filter(t => t.done).length);

  private persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._todos()));
  }

  private readFromStorage(): Todo[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Todo[]) : [];
    } catch {
      return [];
    }
  }

  add(title: string) {
    const now = Date.now();
    const t: Todo = { id: crypto.randomUUID(), title: title.trim(), done: false, createdAt: now, updatedAt: now };
    if (!t.title) return;
    this._todos.set([t, ...this._todos()]);
    this.persist();
  }

  toggle(id: string) {
    this._todos.update(list => {
      const updated = list.map(t => t.id === id ? { ...t, done: !t.done, updatedAt: Date.now() } : t);
      return updated;
    });
    this.persist();
  }

  updateTitle(id: string, title: string) {
    const next = title.trim();
    if (!next) return;
    this._todos.update(list => list.map(t => t.id === id ? { ...t, title: next, updatedAt: Date.now() } : t));
    this.persist();
  }

  remove(id: string) {
    this._todos.update(list => list.filter(t => t.id != id));
    this.persist();
  }

  clearCompleted() {
    this._todos.update(list => list.filter(t => !t.done));
    this.persist();
  }

  replaceAll(items: Todo[]) {
    this._todos.set(items);
    this.persist();
  }
}
