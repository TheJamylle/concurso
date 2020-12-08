import { Router } from 'express';

const premioRouter = Router();

premioRouter.post('/', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

premioRouter.get('/', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

premioRouter.get('/:id', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

premioRouter.put('/:id', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

premioRouter.delete('/:id', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

export default premioRouter;