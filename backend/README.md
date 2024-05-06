# Backend for KanbanFlow

This project is a Node.js application that serves as the backend for the KanbanFlow application.

## Available Scripts

In the project directory, you can run:

### `node app.js`

Starts the server in development mode.

## Project Structure

- `app.js`: This is the main entry point of the application.
- `data/`: This directory contains all the data files for the application.
    - `users.json`: This file contains data for users.
    - `boards.json`: This file contains data for boards.
    - `tasks.json`: This file contains data for tasks.
    - `dataManagementLayer.js`: This file contains functions for reading and writing data files.
- `routes/`: This directory contains all the route handlers for the application.

## Features

- User authentication: Users can register, log in, and log out.
- Board management: Users can create, read, update, and delete boards.
- Task management: Users can create, read, update, and delete tasks within boards.

## Future Improvements

- Implement real-time updates across multiple clients using WebSockets.
- Add more comprehensive tests for all routes.
- Improve error handling for a more robust application.