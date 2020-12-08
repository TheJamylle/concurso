import { Router } from 'express';
import AreaService from '../services/AreaService';

const areaRouter = Router();

areaRouter.post('/', async (request, response) => {
  try {
    const { descricao } = request.body;

    const area = await new AreaService().create(descricao);

    return response.json(area);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

areaRouter.get('/', async (request, response) => {
  try {
    const areas = await new AreaService().list();

    return response.json(areas);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

areaRouter.get('/:id', async (request, response) =>{
  try {
    const id_area = request.params.id;

    const area = await new AreaService().getByID(id_area);

    return response.json(area);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

areaRouter.put('/:id', async (request, response) => {
  try {
    const id_area = request.params.id;

    const { descricao } = request.body;

    const area = await new AreaService().update({ id_area, descricao });

    return response.json(area);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

areaRouter.delete('/:id', async (request, response) => {
  try {
    const id_area = request.params.id;

    const delArea = await new AreaService().delete(id_area);

    return response.json('Area deletada'+delArea);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

export default areaRouter;