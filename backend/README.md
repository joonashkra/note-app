# Note / To-Do Web Application

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
    - Nginx (reverse proxy as single point of entry to application)

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

Runs at http://localhost:5173

### Production

```bash
docker-compose -f docker-compose.yml up --build
```

Runs at http://localhost:8080

## License

[MIT](https://choosealicense.com/licenses/mit/)
