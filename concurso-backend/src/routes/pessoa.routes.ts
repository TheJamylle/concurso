import { Router } from 'express';
import PessoaService from '../services/PessoaService';

const pessoaRouter = Router();

pessoaRouter.post('/candidatos', async (request, response) => {
  try {
    const { 
        nome, 
        cpf, 
        data_nascimento, 
        endereco, 
        telefone, 
        numero_inscricao, 
        id_projeto 
    } = request.body;

    const candidato = await new PessoaService().createCandidato({ nome, cpf, data_nascimento, endereco, telefone }, { numero_inscricao, id_projeto });

    return response.json(candidato);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

pessoaRouter.post('/avaliadores', async (request, response) => {
  try {
    const { 
        nome, 
        cpf, 
        data_nascimento, 
        endereco, 
        telefone,
        registro
    } = request.body;

    const avaliador = await new PessoaService().createAvaliador({ nome, cpf, data_nascimento, endereco, telefone }, registro);

    return response.json(avaliador);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

pessoaRouter.get('/candidatos/:id', async (request, response) => {
  try {
    const id_candidato = request.params.id;
    
    const candidato = await new PessoaService().getByIDCandidato(id_candidato);

    return response.json(candidato);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

pessoaRouter.get('/avaliadores/:id', async (request, response) => {
    try {
      const id_avaliador = request.params.id;

      const avaliador = await new PessoaService().getByIDAvaliador(id_avaliador);

      return response.json(avaliador);
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  });

pessoaRouter.get('/candidatos', async (request, response) => {
  try {
    const candidatos = await new PessoaService().listCandidatos();

    return response.json(candidatos);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

pessoaRouter.get('/avaliadores', async (request, response) => {
  try {
    const avaliadores = await new PessoaService().listAvaliadores();

    return response.json(avaliadores);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

pessoaRouter.patch('/candidatos/:id', async (request, response) => {
  try {
    const numero_inscricao = request.params.id;

    const { 
        nome, 
        cpf,
        data_nascimento, 
        endereco, 
        id_projeto 
    } = request.body;

    const candidatoUpdated = await new PessoaService().updateCandidato({ nome, cpf, data_nascimento, endereco }, { numero_inscricao, id_projeto });

    return response.json(candidatoUpdated);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

pessoaRouter.patch('/avaliadores/:id', async (request, response) => {
  try {
    const registro = request.params.id;

    const { 
        nome, 
        cpf,
        data_nascimento, 
        endereco
    } = request.body;

    const avaliadorUpdated = await new PessoaService().updateAvaliador({ nome, cpf, data_nascimento, endereco }, registro);

    return response.json(avaliadorUpdated);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

pessoaRouter.delete('/candidatos/:id', async (request, response) => {
  try {
    const numero_inscricao = request.params.id;

    const delCandidato = await new PessoaService().deleteCandidato(numero_inscricao);

    return response.json(delCandidato);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

pessoaRouter.delete('/avaliadores/:id', async (request, response) => {
  try {
    const resgistro = request.params.id;

    const delAvaliador = await new PessoaService().deleteAvaliador(resgistro);

    return response.json(delAvaliador);
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

export default pessoaRouter;