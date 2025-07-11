# TaskTrackr – A Simple Task Management Dashboard

TaskTrackr is a full-stack task management application that allows users to sign up, log in, and manage their tasks through a web-based dashboard.

## Features

### User Features
*   **Sign Up**: New users can create an account.
*   **Login**: Existing users can log in to access their dashboard.
*   **Reset Password**: Users can request a password reset (simulated via console log on backend).
*   **Authentication Protection**: Dashboard and task management features are accessible only to authenticated users using JWT.
*   **User Logout**: Securely log out from the application.

### Dashboard Features (after login)
*   **Create Task**: Add new tasks with a title, description, due date, and status.
*   **View Tasks**: Display all tasks in a list format.
*   **Edit Tasks**: Modify the details of existing tasks.
*   **Delete Tasks**: Remove tasks.
*   **Status Filters**: Filter tasks by "Pending", "In Progress", or "Completed".
*   **Toast Notifications**: Receive feedback for actions like successful operations or errors.

## Tech Stack

*   **Frontend**: React (with Tailwind CSS)
    *   `axios` for API requests
    *   `react-router-dom` for routing
*   **Backend**: Node.js + Express
    *   `mongoose` for MongoDB object data modeling
    *   `bcryptjs` for password hashing
    *   `jsonwebtoken` for JWT-based authentication
    *   `cors` for enabling Cross-Origin Resource Sharing
    *   `dotenv` for environment variable management
*   **Database**: MongoDB (connected via Mongoose)

## Project Structure

```
TaskTrackr/
├── backend/
│   ├── models/         # Mongoose schemas (User.js, Task.js)
│   ├── middleware/     # Authentication middleware (authMiddleware.js)
│   ├── routes/         # API routes (auth.js, tasks.js)
│   ├── node_modules/   # (Generated after npm install)
│   ├── .env            # Environment variables (MONGODB_URI, JWT_SECRET, PORT)
│   ├── .gitignore      # Specifies intentionally untracked files
│   ├── package.json
│   ├── server.js       # Express server setup
│   └── ...
└── frontend/
    ├── public/         # Static assets (index.html, manifest.json, icons)
    ├── src/
    │   ├── components/ # React components (auth, dashboard, layout, routing)
    │   ├── App.css     # Base app styles
    │   ├── App.js      # Main application component with routing
    │   ├── index.css   # Tailwind CSS setup and global styles
    │   ├── index.js    # React entry point
    │   └── ...
    ├── node_modules/   # (Generated after npm install)
    ├── .gitignore      # Specifies intentionally untracked files
    ├── package.json
    ├── tailwind.config.js # Tailwind CSS configuration
    └── postcss.config.js  # PostCSS configuration
└── README.md           # This file
```

## Prerequisites

*   Node.js (which includes npm) installed on your system. (User mentioned this is already installed on Windows).
*   MongoDB instance (local or cloud-based, e.g., MongoDB Atlas).

## Setup and Installation

1.  **Clone the Repository (or Download Files)**
    If this were a Git repository, you would clone it. For now, ensure you have the `TaskTrackr` directory with its `frontend` and `backend` subdirectories.

2.  **Backend Setup**
    *   Navigate to the backend directory:
        ```bash
        cd TaskTrackr/backend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env` file in the `TaskTrackr/backend` directory. Copy the contents from `.env.example` (if provided) or create it manually with the following content:
        ```env
        MONGODB_URI=your_mongodb_connection_string_here
        JWT_SECRET=your_super_secret_jwt_key_anything_long_and_random
        PORT=5000
        ```
        *   Replace `your_mongodb_connection_string_here` with your actual MongoDB connection string (e.g., `mongodb://localhost:27017/tasktrackr` or a MongoDB Atlas URI).
        *   Replace `your_super_secret_jwt_key_anything_long_and_random` with a strong, unique secret for JWT signing.

3.  **Frontend Setup**
    *   Navigate to the frontend directory:
        ```bash
        cd TaskTrackr/frontend
        ```
        (If you are in `TaskTrackr/backend`, you can use `cd ../frontend`)
    *   Install dependencies:
        ```bash
        npm install
        ```
        *Note: The frontend is configured to proxy API requests to `http://localhost:5000` (the default backend port) via `axios.defaults.baseURL` in `src/App.js`. Ensure your backend runs on this port or update the frontend configuration.*

## Running the Application

1.  **Start the Backend Server**
    *   In the `TaskTrackr/backend` directory:
        ```bash
        npm start
        ```
    *   The backend server should start, typically on port 5000 (or the port specified in your `.env` file). You should see a console message like "MongoDB connected successfully." and "Server is running on port: 5000".

2.  **Start the Frontend Development Server**
    *   In a **new terminal window or tab**, navigate to the `TaskTrackr/frontend` directory:
        ```bash
        cd TaskTrackr/frontend
        ```
    *   Start the React development server:
        ```bash
        npm start
        ```
    *   This will usually open the application automatically in your default web browser at `http://localhost:3000`.

You should now be able to access TaskTrackr in your browser. Register a new user or log in if you have already created an account.

## API Endpoints (Backend)

All task-related endpoints require JWT authentication (send token in `x-auth-token` header).

*   `POST /api/auth/signup` - Register a new user.
*   `POST /api/auth/login` - Login an existing user, returns JWT.
*   `POST /api/auth/reset-password` - (Simulated) Request password reset.
*   `POST /api/tasks` - Create a new task.
*   `GET /api/tasks` - Get all tasks for the logged-in user.
*   `GET /api/tasks/:id` - Get a specific task by ID.
*   `PUT /api/tasks/:id` - Update a task by ID.
*   `DELETE /api/tasks/:id` - Delete a task by ID.

---

This `README.md` provides a comprehensive guide to understanding, setting up, and running the TaskTrackr application.
