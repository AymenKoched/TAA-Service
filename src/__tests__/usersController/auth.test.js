import request from 'supertest';
import app from '@/app';
import { sequelize } from '@/utils';

describe('User API', () => {
  beforeAll(async () => {
    // Connect to the test database and sync
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close the database connection after tests
    await sequelize.close();
  });

  describe('POST /api/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/register')
        .send({
          email: 'user@example.com',
          password: 'password123'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.msg).toBe('User Created');
    });

    it('should return 422 if user already exists', async () => {

      await request(app)
        .post('/api/register')
        .send({
          email: 'user@example.com',
          password: 'password123'
        });

      const res = await request(app)
        .post('/api/register')
        .send({
          email: 'user@example.com',
          password: 'password123',
          passwordDecrypt: 'password123',
          roles: ['user']
        });

      expect(res.statusCode).toEqual(422);
      expect(res.body.message).toBe('User already exists');
    });
  });

  describe('POST /api/login', () => {
    it('should login a user', async () => {
      await request(app)
        .post('/api/register')
        .send({
          email: 'user@example.com',
          password: 'password123'
        });

      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'user@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });
  });

  describe('POST /api/login', () => {
    it('should not login a user', async () => {
      await request(app)
        .post('/api/register')
        .send({
          email: 'user@example.com',
          password: 'password123'
        });

      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'user@example.com',
          password: 'password12'
        });

      expect(res.statusCode).toEqual(400);
    });
  });

});
