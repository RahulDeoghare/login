# Task Management App

A full-stack task management application built with React (Vite), Express, TypeScript, and PostgreSQL (Docker).

---

## Features

- User registration and authentication (JWT)
- Task CRUD (Create, Read, Update, Delete)
- Task status and priority management
- Responsive UI with Tailwind CSS
- PostgreSQL database (runs in Docker)

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (for PostgreSQL)

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

---

### 2. Start PostgreSQL with Docker

```sh
sudo docker run --name taskhub-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=taskhub \
  -p 5432:5432 \
  -d postgres:15
```

If port 5432 is in use, change the host port (e.g., `-p 5433:5432`) and update `DB_PORT` in your `.env`.

---

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_in_production
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=taskhub
VITE_API_URL=http://localhost:5000/api
```

---

### 4. Install dependencies

```sh
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

### 5. Run the app (from project root)

```sh
cd ..
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000/api](http://localhost:5000/api)

---

## Troubleshooting

- **Blank screen in frontend:**  
  Check browser console for errors.  
  Make sure every `.tsx` file that uses JSX has `import React from 'react';` at the top (unless your tooling fully supports the new JSX transform).

- **CORS errors:**  
  The backend uses CORS middleware to allow requests from the frontend. If you change ports, update the `origin` in `server/src/index.ts`.

- **Database connection errors:**  
  Ensure your Docker container is running and `.env` matches the container settings.

- **Port already in use:**  
  Stop/remove conflicting containers or change the port mapping.

---

## Database: Inspecting Data

To access the database shell:

```sh
sudo docker exec -it taskhub-postgres psql -U postgres -d taskhub
```

- List tables: `\dt`
- Query data: `SELECT * FROM tasks;`
- Exit: `\q`

---

## Deployment

For deployment instructions (including Docker Compose, cloud, or Azure), see the [Deployment Guide](DEPLOYMENT.md) (create if needed).

---

## License

MIT

---

## Credits

- React, Vite, Express, TypeScript, PostgreSQL, Docker, Tailwind CSS

---

**Happy coding!**