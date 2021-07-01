import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

const agent = request.agent(app);

const usr1 = {
  email: 'dude@no.com',
  password: 'passaword',
  profilePhotoUrl: 'shapoop'
};

const usr2 = {
  email: 'dude@yes.com',
  password: 'numbersonly',
  profilePhotoUrl: 'cranberry'
};

const usr3 = {
  email: 'coffee@no.com',
  password: 'beans',
  profilePhotoUrl: 'morebeans'
};

describe('Auth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('signs up a user via POST', async() => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send(usr1);
    
    expect(res.body).toEqual({
      id: '1',
      email: 'dude@no.com',
      profilePhotoUrl: 'shapoop'
    });
  });

  it('logs a user in via POST', async() => {
    await request(app)
      .post('/api/v1/auth/signup')
      .send(usr3);

    await request(app)
      .post('/api/v1/auth/signup')
      .send(usr2);

    const res = await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'dude@yes.com',
        password: 'numbersonly'
      });

    expect(res.body).toEqual({
      id: '2',
      email: 'dude@yes.com',
      profilePhotoUrl: 'cranberry'
    });
  });
});

describe('Tardy routes', () => {
  beforeAll(async () => {
    setup(pool);

    await request(app)
      .post('/api/v1/auth/signup')
      .send(usr1);

    await request(app)
      .post('/api/v1/auth/signup')
      .send(usr2);

    await request(app)
      .post('/api/v1/auth/signup')
      .send(usr3);

    return;
  });

  it('Creates a tardy via POST', async() => {
    const res = await agent
      .post('/api/v1/tardys')
      .send({
        photoUrl: 'http://photo',
        caption: 'Look at my tardy!',
        tags: ['http', 'url', 'photo']
      });

    expect(res.body).toEqual({
      id: '1',
      userId: '2',
      photoUrl: 'http://photo',
      caption: 'Look at my tardy!',
      tags: ['http', 'url', 'photo']
    });
  });

  it('GETs all tardys', async() => {
    await agent
      .post('/api/v1/tardys')
      .send({
        photoUrl: 'http://gif',
        caption: 'Look at my animated tardy!',
        tags: ['http', 'url', 'gif']
      });

    const res = await agent
      .get('/api/v1/tardys');

    expect(res.body).toEqual([
      {
        id: '1',
        userId: '2',
        photoUrl: 'http://photo',
        caption: 'Look at my tardy!',
        tags: ['http', 'url', 'photo']
      },
      {
        id: '2',
        userId: '2',
        photoUrl: 'http://gif',
        caption: 'Look at my animated tardy!',
        tags: ['http', 'url', 'gif']
      }
    ]);
  });

  it('GETs a tardy by id', async() => {
    const res = await agent
      .get('/api/v1/tardys/1');

    expect(res.body).toEqual({
      id: '1',
      userId: '2',
      photoUrl: 'http://photo',
      caption: 'Look at my tardy!',
      tags: ['http', 'url', 'photo']
    });
  });

  it('PATCHes a tardy by id', async() => {
    const postResponse = await agent.get('/api/v1/tardys/1');
    const firstPost = postResponse.body;

    firstPost.caption = 'That caption needed replacing';

    const res = await agent
      .patch(`/api/v1/tardys/${firstPost.id}`)
      .send(firstPost);

    expect(res.body).toEqual({
      id: '1',
      userId: '2',
      photoUrl: 'http://photo',
      caption: 'That caption needed replacing',
      tags: ['http', 'url', 'photo']
    });
  });

  it('DELETEs a tardy by id', async() => {
    const res = await agent
      .delete('/api/v1/tardys/1');

    expect(res.body).toEqual({
      id: '1',
      userId: '2',
      photoUrl: 'http://photo',
      caption: 'That caption needed replacing',
      tags: ['http', 'url', 'photo']
    });
  });

});

describe.skip('Comment routes', () => {

  it('Comments on a tardy via POST', async() => {

  });

});
