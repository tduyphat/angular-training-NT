# Angular Todo (localStorage, Angular 19.2)

A minimal Angular 19 (standalone API + signals) Todo app with full CRUD persisted to `localStorage`.

## Quick start

```bash
# 1) Install dependencies
npm install

# 2) Start dev server
npx ng serve
# or
npm run start

# App is served at http://localhost:4200
```

> If you don't have the Angular CLI globally, the scripts use the local CLI.

## Features

- ✅ Create / Read / Update / Delete todos
- ✅ Toggle complete, clear completed
- ✅ Filter: All / Active / Completed
- ✅ Keyword search
- ✅ Persist to `localStorage`
- ✅ Standalone Components + Signals (no NgModule needed)

## Project structure

```
src/
  app/
    app.component.{ts,html,css}
    app.config.ts
    app.routes.ts
    models/todo.ts
    todo.service.ts
  main.ts
  index.html
  styles.css
```

## Notes

- This scaffold pins Angular to `^19.2.0`. If your environment uses different minor versions, you can update the versions in `package.json` accordingly, then run `npm install` again.
- Data lives entirely in the browser's localStorage. No backend/API.
