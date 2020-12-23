import { Router } from 'express';
import AvaliacaoService from '../services/AvaliacaoService';

const avaliacaoRouter = Router();

avaliacaoRouter.post('/', async (request, response) => {
  try {
    const { parecer, nota, data_avaliacao, id_avaliador, id_projeto } = request.body;

    const avaliacao = await new AvaliacaoService().create({ parecer, nota, data_avaliacao, id_avaliador, id_projeto });

    return response.json(avaliacao);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

avaliacaoRouter.get('/', async (request, response) => {
  try {
    const avaliacoes = await new AvaliacaoService().list();

    return response.json(avaliacoes);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

avaliacaoRouter.get('/:id', async (request, response) => {
  try {
    const id_avaliacao = request.params.id;

    const avaliacao = await new AvaliacaoService().getByID(id_avaliacao);

    return response.json(avaliacao);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

avaliacaoRouter.put('/:id', async (request, response) => {
  try {
    const id_avaliacao = request.params.id;
    
    const { parecer, nota, data_avaliacao, id_avaliador, id_projeto } = request.body;

    const avaliacaoUpdated = await new AvaliacaoService().update({ parecer, nota, data_avaliacao, id_avaliador, id_projeto }, id_avaliacao);

    return response.json(avaliacaoUpdated);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

avaliacaoRouter.delete('/:id', async (request, response) => {
  try {
    const id_avaliacao = request.params.id;

    const delAvaliacao = await new AvaliacaoService().delete(id_avaliacao);

    return response.json(delAvaliacao);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

export default avaliacaoRouter;