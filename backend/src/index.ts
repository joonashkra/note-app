import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import middleware from "./utils/middleware";
import express from 'express';
import "express-async-errors";
import noteRouter from './routes/notes';
import userRouter from './routes/users';
import loginRouter from './routes/login';

const app = express();
app.use(express.json());

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

if(url) mongoose.connect(url)
    .then(_result => console.log('Connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB:', error));

app.use('/api/login', loginRouter);

app.use(middleware.checkAuth);

app.use('/api/notes', noteRouter);
app.use('/api/users', userRouter);

app.use(middleware.errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});