# Note / To-Do App

Full stack web application that originally started as a university course project. At that time the app was e.g. using Firebase so there was no backend implementation, and the frontend was ok but not great. Later on I started working on this again as a personal project, building my own backend with NodeJS and rebuilding the frontend with more effort and care.

## Features

The new version of the app is under development. Backend is at a good stage, I'm adding / updating stuff there as I go. Frontend is still missing some key features at the time of writing (e.g. some forms for CRUD operations), but basic layout, routing, auth and overall app structure is implemented. In the future I'm thinking of adding features like note collections and user connections.

## Languages, frameworks and libraries used:

Backend: - TypeScript - Express - MongoDB (Mongoose) - JWT - Bcrypt - Zod

Frontend: - TypeScript - React (Vite) - Axios - React Router V6 - React Query (Tanstack) - Zod

## Usage

```bash
cd frontend
npm install
npm run dev
cd backend
npm install
npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
