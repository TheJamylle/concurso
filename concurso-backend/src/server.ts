import express from 'express';
import 'reflect-metadata';
import routes from './routes';
import './database';

const app = express();

app.use(express.json());
app.use(routes);



app.listen(7777, () => console.log("Escutando na porta 7777"));