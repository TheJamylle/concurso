import { Router } from 'express';
import Area from '../models/Area';
import ProjetoService from '../services/ProjetoService';

const areaRouter = Router();

areaRouter.get('/', async (request, response) => {
  try {
    const a = await new ProjetoService().listVencedores();
    console.log(JSON.stringify(a));
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

export default areaRouter;