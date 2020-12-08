import { Router } from 'express';

const avaliacaoRouter = Router();

avaliacaoRouter.post('/', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

avaliacaoRouter.get('/', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

avaliacaoRouter.get('/:id', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

avaliacaoRouter.put('/:id', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

avaliacaoRouter.delete('/:id', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

export default avaliacaoRouter;