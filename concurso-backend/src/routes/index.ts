import { Router } from 'express';
import areaRouter from './area.routes';
import avaliacaoRouter from './avaliacao.routes';
import cronogramaRouter from './cronograma.routes';
import pessoaRouter from './pessoa.routes';
import premioRouter from './premio.routes';
import projetoRouter from './projeto.routes';

const routes = Router();

routes.use('/area', areaRouter);
routes.use('/pessoa', pessoaRouter);
routes.use('/premio', premioRouter);
routes.use('/cronograma', cronogramaRouter);
routes.use('/projeto', projetoRouter);
routes.use('/avaliacao', avaliacaoRouter);


export default routes;