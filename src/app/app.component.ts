import { Component, computed, effect, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TodoService } from "./todo.service";
import { FormsModule } from "@angular/forms";
import type { Todo } from "./models/todo";

type Filter = "all" | "active" | "completed";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  private svc = inject(TodoService);

  // signals
  newTitle = signal("");
  filter = signal<Filter>("all");
  query = signal("");

  // data from service (signals)
  todos = this.svc.todos;
  remaining = this.svc.remainingCount;
  completed = this.svc.completedCount;

  filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    const f = this.filter();
    return this.todos().filter((t) => {
      const byFilter = f === "all" ? true : f === "active" ? !t.done : t.done;
      const byQuery = !q || t.title.toLowerCase().includes(q);
      return byFilter && byQuery;
    });
  });

  constructor() {
    effect(() => {
      this.todos();
    });
  }

  add() {
    this.svc.add(this.newTitle());
    this.newTitle.set("");
  }

  toggle(t: Todo) {
    this.svc.toggle(t.id);
  }
  remove(t: Todo) {
    this.svc.remove(t.id);
  }
  clearCompleted() {
    this.svc.clearCompleted();
  }

  // edit state
  startEdit = signal<string | null>(null);
  editText = signal("");

  beginEdit(t: Todo) {
    this.startEdit.set(t.id);
    this.editText.set(t.title);
  }
  confirmEdit(t: Todo) {
    this.svc.updateTitle(t.id, this.editText());
    this.startEdit.set(null);
  }
  cancelEdit() {
    this.startEdit.set(null);
  }

  // trackBy for *ngFor
  trackById(index: number, t: Todo) {
    return t.id;
  }
}
