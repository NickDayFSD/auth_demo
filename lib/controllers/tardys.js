import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import Tardy from '../models/Tardy.js';

export default Router()

  .post('/api/v1/tardys', ensureAuth, (req, res, next) => {
    Tardy.insert({ ...req.body, userId: req.user.id })
      .then(tardy => res.send(tardy))
      .catch(next);
  })

  .get('/api/v1/tardys', ensureAuth, (req, res, next) => {
    Tardy.getAll()
      .then(tardy => res.send(tardy))
      .catch(next);
  })

  .get('/api/v1/tardys/:id', ensureAuth, (req, res, next) => {
    Tardy.findById(req.params.id)
      .then(tardy => res.send(tardy))
      .catch(next);
  })
  
  .patch('/api/v1/tardys/:id', ensureAuth, (req, res, next) => {
    Tardy.patchById(req.body, req.params.id, req.user.id)
      .then(tardy => res.send(tardy))
      .catch(next);
  });
