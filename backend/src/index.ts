import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import noteRouter from './routes/notes';

const app = express();
app.use(express.json());

app.use('/api/notes', noteRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});