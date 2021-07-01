import { Router } from 'express';
import UserService from '../services/UserService.js';

const ONE_DAY_EXPIRE = 1000 * 60 * 60 * 24;

export default Router()
  .post('/api/v1/auth/signup', (req, res, next) => {
    UserService.create(req.body)
      .then(user => {
        // attach a JWT to the response
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: ONE_DAY_EXPIRE
        });
        res.send(user);
      })
      .catch(next);
  })
  
  .post('/api/v1/auth/login', (req, res, next) => {
    UserService.authorize(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: ONE_DAY_EXPIRE
        });
        res.send(user);
      })
      .catch(next);
  });
