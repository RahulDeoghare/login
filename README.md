# TaskHub - Task Management Application

A full-stack task management application with authentication and CRUD functionality.

## Features

- User authentication (register, login, logout)
- Task management (create, read, update, delete)
- Task categorization with status and priority
- Responsive design for all devices
- PostgreSQL database integration

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- React Hook Form for form handling
- Zod for validation
- Tailwind CSS for styling
- Axios for API requests
- Lucide React for icons

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL for database
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL (running in Docker)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd taskhub
```

2. Install dependencies
```
npm run install:all
```

3. Set up environment variables
- Create a `.env` file in the root directory with the following variables:
```
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_in_production
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=taskhub
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server
```
npm run dev
```

## Project Structure

```
/
├── client/               # Frontend React application
│   ├── public/           # Static files
│   └── src/              # React source code
│       ├── api/          # API client and service functions
│       ├── components/   # Reusable React components
│       ├── contexts/     # React context providers
│       ├── pages/        # Page components
│       └── types/        # TypeScript type definitions
│
├── server/               # Backend Node.js application
│   └── src/              # Express source code
│       ├── controllers/  # Request handlers
│       ├── db/           # Database configuration
│       ├── middlewares/  # Express middlewares
│       ├── models/       # Data models
│       ├── routes/       # API routes
│       ├── types/        # TypeScript type definitions
│       └── validators/   # Request validation
│
└── package.json          # Root package.json for scripts
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## License

MIT