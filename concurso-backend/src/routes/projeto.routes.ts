import { Router } from 'express';
import ProjetoService from '../services/ProjetoService';

const projetoRouter = Router();

projetoRouter.post('/', async (request, response) => {
  try {
    const { titulo, resumo, data_envio, id_area } = request.body;

    const projeto = await new ProjetoService().create({ titulo, resumo, data_envio, id_area });

    return response.json(projeto);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

projetoRouter.get('/', async (request, response) => {
  try {
    const projetos = await new ProjetoService().list();

    return response.json(projetos);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

projetoRouter.get('/naoAvaliados', async (request, response) => {
  try {
    const projetos = await new ProjetoService().listNaoAvaliados();

    return response.json(projetos);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

projetoRouter.get('/avaliados', async (request, response) => {
  try {
    const projetos = await new ProjetoService().listAvaliados();

    return response.json(projetos);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

projetoRouter.get('/vencedores', async (request, response) => {
  try {
    const projetos = await new ProjetoService().listVencedores();

    return response.json(projetos);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

projetoRouter.get('/:id', async (request, response) => {
  try {
    const id_projeto = request.params.id;

    const projeto = await new ProjetoService().getByID(id_projeto);

    return response.json(projeto);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

projetoRouter.put('/:id', async (request, response) => {
  try {
    const id_projeto = request.params.id;

    const { titulo, resumo, data_envio, id_area } = request.body;

    const projetoUpdated = await new ProjetoService().update({ titulo, resumo, data_envio, id_area }, id_projeto);

    return response.json(projetoUpdated);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

projetoRouter.delete('/:id', async (request, response) => {
  try {
    const id_projeto = request.params.id;

    const delProjeto = await new ProjetoService().delete(id_projeto);

    return response.json(delProjeto);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

export default projetoRouter;