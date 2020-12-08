import { Router } from 'express';

const pessoaRouter = Router();

pessoaRouter.post('/candidatos', async (request, response) => {
  try {
      
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

pessoaRouter.post('/avaliadores', async (request, response) => {
    try {
        
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  });

pessoaRouter.get('/', async (request, response) => {
  try {
        
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

pessoaRouter.get('/:id', async (request, response) => {
  try {
        
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

pessoaRouter.get('/candidatos', async (request, response) => {
  try {
        
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

pessoaRouter.get('/avaliadores', async (request, response) => {
  try {
        
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

pessoaRouter.patch('/:id', async (request, response) => {
  try {
        
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

pessoaRouter.delete('/:id', async (request, response) => {
  try {
        
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

export default pessoaRouter;