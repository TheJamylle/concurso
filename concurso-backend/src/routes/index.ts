import { Router } from 'express';
import areaRouter from './area.routes';

const routes = Router();
routes.use('/area', areaRouter);


export default routes;