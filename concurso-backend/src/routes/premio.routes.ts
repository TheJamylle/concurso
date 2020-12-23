import { Router } from 'express';
import CronogramaService from '../services/CronogramaService';
import PremioService from '../services/PremioService';

const premioRouter = Router();

premioRouter.post('/', async (request, response) => {
  try {
    const { nome, descricao, ano, id_area } = request.body;

    const premio = await new PremioService().create({ nome, descricao, ano, id_area });

    return response.json(premio);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

premioRouter.get('/', async (request, response) => {
  try {
    const premios = await new PremioService().list();

    return response.json(premios);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

premioRouter.get('/:id', async (request, response) => {
  try {
    const id_premio = request.params.id;

    const premio = await new PremioService().getByID(id_premio);

    return response.json(premio);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

premioRouter.put('/:id', async (request, response) => {
  try {
    const id_premio = request.params.id;

    const { nome, descricao, ano, id_area } = request.body;

    const premioUpdated = await new PremioService().update({ nome, descricao, ano, id_area }, id_premio);

    return response.json(premioUpdated);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

premioRouter.delete('/:id', async (request, response) => {
  try {
    const id_premio = request.params.id;

    const delPremio = await new PremioService().delete(id_premio);

    return response.json(delPremio);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

export default premioRouter;