import express from 'express';
import 'reflect-metadata';
import routes from './routes';
import './database';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);



app.listen(7777, () => console.log("Escutando na porta 7777"));