# KanbanFlow

KanbanFlow is a full-stack application for managing tasks on a Kanban board. It includes a frontend built with React and a backend built with Node.js/Express.

## Project Structure

- `backend/`: This directory contains all the code for the backend of the application.
- `frontend/`: This directory contains all the code for the frontend of the application.
- `src/`: This directory contains a Postman collection for testing the API.
- `LICENSE`: This file contains the license for the project.
- `README.md`: This file contains information about the project and how to use it.

## Quick start

Prerequisites:
- Node.js (recommended: 18+), npm

Install dependencies (project root):

```bash
npm install
```

Run backend in production:

```bash
npm run start
```

Run backend in development (auto-restart with nodemon):

```bash
npm run start:dev
```

Run frontend development (from `frontend/`):

```bash
cd frontend
npm install
npm start
```

Build frontend for production (from `frontend/`):

```bash
cd frontend
npm run build
```

Other useful scripts (project root):

- `npm run lint` — run ESLint across the codebase (if configured)
- `npm run audit` — run `npm audit` with moderate threshold


## Features

- User authentication: Users can register, log in, and log out.
- Board management: Users can create, read, update, and delete boards.
- Task management: Users can create, read, update, and delete tasks within boards.

## Backend details and notes

- The backend serves static files from `frontend/build` when present, otherwise it serves the `src/` preview.
- Persistent data is stored in JSON files under `backend/data/` (users.json, boards.json, tasks.json). This is convenient for development but not recommended for production — consider migrating to a database (SQLite, Postgres, etc.) and a persistent session store (Redis, etc.).
- Security/production notes:
	- The server uses `helmet`, `cors`, and `express-rate-limit` for basic hardening.
	- Sessions are configured with `express-session`. Set `SESSION_SECRET` in your environment for production (default: `dev-secret-change-me`).
	- Configure `CORS_ORIGIN` to restrict allowed origins (default: `http://localhost:3000`).

## Environment variables

- `PORT` — port to run the backend (default `5000`).
- `NODE_ENV` — `development` or `production` (affects cookie `secure` setting).
- `SESSION_SECRET` — secret used by `express-session`. Change for production.
- `CORS_ORIGIN` — origin allowed by CORS (default `http://localhost:3000`).

## Quick smoke tests (examples)

Register a user:

```bash
curl -X POST http://localhost:5000/users/register -H "Content-Type: application/json" -d '{"username":"test","password":"pass"}'
```

Login:

```bash
curl -X POST http://localhost:5000/users/login -H "Content-Type: application/json" -d '{"username":"test","password":"pass"}' -c cookies.txt
```

Create a board (send cookies for session):

```bash
curl -X POST http://localhost:5000/boards/create -H "Content-Type: application/json" -d '{"title":"My Board"}' -b cookies.txt
```

## API endpoints (overview)

- `GET /status` — health check (HTML response).
- `GET /boards/list` — returns all boards (JSON).
- `GET /boards` — query boards (supports `?id=` or body filters).
- `POST /boards/create` — create a board, payload: `{ "title": "...", "description": "..." }`.
- `PUT /boards/update` — update board by `id` with JSON body.
- `DELETE /boards/delete` — delete board by `id`.

- `GET /tasks/list` — returns all tasks.
- `GET /tasks` — query tasks (supports `?board_id=` or body filters).
- `POST /tasks/create` — create a task, payload: `{ "title": "...", "board_id": 1, "status": "todo" }`.
- `PUT /tasks/update` — update task by `id`.
- `DELETE /tasks/delete` — delete task by `id`.

- `POST /users/register` — register a user, payload: `{ "username":"...", "password":"..." }`.
- `POST /users/login` — login user, returns session cookie when successful.
- `POST /users/logout` — logout (clears session).

> Note: Many endpoints accept JSON in the request body. For session-protected endpoints, send cookies returned at login (see `-c` / `-b` curl flags).

## Data formats

Example `users.json` entry:

```json
{
	"id": 1,
	"username": "alice",
	"passwordHash": "<bcrypt-hash>",
	"createdAt": "2026-06-10T..."
}
```

Example `boards.json` entry:

```json
{
	"id": 1,
	"title": "Project X",
	"description": "Board description",
	"createdAt": "2026-06-10T..."
}
```

Example `tasks.json` entry:

```json
{
	"id": 1,
	"title": "Implement auth",
	"board_id": 1,
	"status": "todo",
	"createdAt": "2026-06-10T..."
}
```

## Development notes

- Linting: `npm run lint` (requires ESLint installed and configured).
- Dev server: `npm run start:dev` (uses `nodemon` — note that JSON file writes can trigger restarts).
- If you change `backend/data/*.json` frequently, consider adding ignore patterns to your dev watcher.

## Troubleshooting

- Port in use (EADDRINUSE): stop the running process or change `PORT` env var.
- Session cookie not persisting: set `SESSION_SECRET` and ensure `CORS_ORIGIN` and `credentials` are configured correctly on the frontend.
- After forcing `npm audit` fixes, some packages may have breaking changes — run the app and run smoke tests after dependency updates.

## Recent changes / Changelog

- Security hardening: added `helmet`, `express-rate-limit`, CORS config and session cookie hardening.
- Data layer: improved JSON read/write robustness (missing files handled safely).
- Routes: input validation improved and endpoints normalized to accept JSON bodies.
- CI/dev helpers: added and then removed local ESLint/nodemon helper files during cleanup.
- Dependencies: ran `npm audit` and `npm prune` to reduce reported vulnerabilities.

## Contributing

- Open an issue for bugs or feature requests.
- For code contributions, fork the repo, create a feature branch, and open a pull request with a short description and test steps.


## Future improvements

- Migrate JSON storage to a real database and add a production session store.
- Add structured request validation (e.g. `express-validator`) and better test coverage.
- Improve frontend accessibility and UI/UX.
- Add CI checks for linting, tests and security scans.

## License

This project is licensed under the GNU General Public License v3.0. See the `LICENSE` file for more details.