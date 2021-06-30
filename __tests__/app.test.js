import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('Auth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('signs up a user via POST', async() => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'dude@no.com',
        password: 'passaword',
        profilePhotoUrl: 'shapoop'
      });
    
    expect(res.body).toEqual({
      id: '1',
      email: 'dude@no.com',
      profilePhotoUrl: 'shapoop'
    });
  });
});
