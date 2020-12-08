import { Router } from 'express';

const projetoRouter = Router();

projetoRouter.post('/', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

projetoRouter.get('/', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

projetoRouter.get('/:id', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

projetoRouter.put('/:id', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

projetoRouter.delete('/:id', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

export default projetoRouter;