import express from 'express';
import noteRouter from './routes/notes';

const app = express();
app.use(express.json());

app.use('/api/notes', noteRouter);

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});