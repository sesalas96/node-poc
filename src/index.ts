// src/index.ts
import express, { Application, Request, Response  } from 'express';
import pocRouter from './routes/post';

const app: Application = express();
const PORT = 3000;

app.use(express.json());

app.get('/info', (req: Request, res: Response) => {
  res.send('HELLO WORLD: This project seeks to demonstrate how Axios can be used alongside system logs.');
});

app.use('/post', pocRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
