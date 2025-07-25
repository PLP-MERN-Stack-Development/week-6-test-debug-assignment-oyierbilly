// tests/integration/bugsAPI.test.js
const request = require('supertest');
const app = require('../../app');
const Bug = require('../../models/Bug');

describe('Bugs API', () => {
  beforeEach(async () => {
    await Bug.deleteMany({});
  });

  it('GET /api/bugs - should return all bugs', async () => {
    await Bug.create([
      { title: 'Bug 1', description: 'Desc 1', reportedBy: 'user1' },
      { title: 'Bug 2', description: 'Desc 2', reportedBy: 'user2' }
    ]);
    
    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });

  it('POST /api/bugs - should create a new bug', async () => {
    const newBug = {
      title: 'New Bug',
      description: 'Bug description',
      priority: 'high'
    };
    
    const res = await request(app)
      .post('/api/bugs')
      .send(newBug);
      
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toEqual(newBug.title);
  });
});