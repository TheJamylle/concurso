import { Router } from 'express';
import CronogramaService from '../services/CronogramaService';

const cronogramaRouter = Router();

cronogramaRouter.post('/', async (request, response) => {
  try {
    const { data_inicio, data_fim, item, id_premio } = request.body;

    const cronograma = await new CronogramaService().create({ data_inicio, data_fim, item, id_premio });

    return response.json(cronograma);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

cronogramaRouter.get('/', async (request, response) => {
  try {
    const cronogramas = await new CronogramaService().list();

    return response.json(cronogramas);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

cronogramaRouter.get('/:id', async (request, response) => {
  try {
    const id_cronograma = request.params.id;

    const cronograma = await new CronogramaService().getByID(id_cronograma);

    return response.json(cronograma);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

cronogramaRouter.put('/:id', async (request, response) => {
  try {
    const id_cronograma = request.params.id;

    const { data_inicio, data_fim, item, id_premio } = request.body;

    const cronogramaUpdated = await new CronogramaService().update({ data_inicio, data_fim, item, id_premio }, id_cronograma);

    return response.json(cronogramaUpdated);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

cronogramaRouter.delete('/:id', async (request, response) => {
  try {
    const id_cronograma = request.params.id;

    const delCronograma = await new CronogramaService().delete(id_cronograma);

    return response.json(delCronograma);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

export default cronogramaRouter;