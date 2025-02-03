# Note / To-Do Web Application

## Overview

This personal project serves as a hands-on learning experience in full-stack development, incorporating modern methodologies and technologies. The application is in continuous development, as its primary purpose is to facilitate my learning. As a result, some features are missing, and e.g. the CSS is not yet responsive. However, the app is **[deployed to Render](https://note-app-gk6d.onrender.com/)**, but only after each successful pipeline run from a push or pull request to the main branch, ensuring it is never in a "broken" state. The free instance of Render will spin down with inactivity, which can delay requests by 50 seconds or more.

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
