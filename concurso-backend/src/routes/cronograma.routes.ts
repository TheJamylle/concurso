import { Router } from 'express';

const cronogramaRouter = Router();

cronogramaRouter.post('/', async (request, response) => {
  try {
    
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

cronogramaRouter.get('/', async (request, response) => {
  try {
    
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

cronogramaRouter.get('/:id', async (request, response) => {
  try {
    
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

cronogramaRouter.put('/:id', async (request, response) => {
  try {
    
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

cronogramaRouter.delete('/:id', async (request, response) => {
  try {
    
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

export default cronogramaRouter;