# To-Do Application

## Description

This is a note/to-do web application. It's my personal project aimed at gaining experience in full-stack development with modern technologies and methods. The app features e.g. CRUD-operations for notes and collections, user authentication and authorization and a responsive user interface. The app is [deployed to Render](https://note-app-gk6d.onrender.com/) after each successful pipeline run from a push or PR to the main branch.

## Languages, frameworks and libraries

### Backend:

    - TypeScript
    - Express
    - MongoDB (Mongoose)
    - JWT
    - Bcrypt
    - Zod
    - Jest & Supertest

### Frontend:

    - TypeScript
    - React (Vite)
    - Axios
    - React Router V6
    - React Query (Tanstack)
    - Zod
    - Playwright

### Containerization:

    - Docker
    - Nginx (reverse proxy as single point of entry)

## Usage

.env file with MONGODB_URI, SECRET, PORT is needed in ./backend to run application (+ TEST_MONGODB_URI for running tests)

### Development

#### Docker Compose

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Runs at http://localhost:8080

#### Or

```bash
cd frontend
npm install
npm run dev

cd backend
npm install
npm run dev
```

Frontend at http://localhost:5173, backend at http://localhost:3001

### Production

```bash
docker-compose -f docker-compose.yml up --build
```

Runs at http://localhost:8080

## License

[MIT](https://choosealicense.com/licenses/mit/)
