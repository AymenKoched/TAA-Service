import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '@/app'; 
import { UserModel, RoleModel } from '@/models';
import { sequelize } from '@/utils';

describe('Protected Routes', () => {
  let userToken;
  let adminToken;

  beforeAll(async () => {
    // Sync and seed the test database
    await sequelize.sync({ force: true });

    // Create a test user
    const user = await UserModel.create({
      email: 'user@example.com',
      password: '$2a$10$gxISaUhX75fXAKaJFXTCQexgDPJYAyHkP5qBeC81oWPA7Yl.xY8I2', 
      passwordDecrypt: 'password123'
    });
    const userRoles = await RoleModel.create({ name: 'user' });
    await user.addRole(userRoles);
    const adminRoles = await RoleModel.create({ name: 'admin' });

    const admin = await UserModel.create({
      email: 'admin@example.com',
      password: '$2a$10$gxISaUhX75fXAKaJFXTCQexgDPJYAyHkP5qBeC81oWPA7Yl.xY8I2', 
      passwordDecrypt: 'password123'
    });
    admin.addRole(userRoles);
    admin.addRole(adminRoles);

    

    userToken = jwt.sign({ id: user.id, email: user.email, roles: ['user'] },
      process.env.JWT_SECRET, { expiresIn: '2h' });
    adminToken = jwt.sign({ id: admin.id, email: admin.email, roles: ['admin','user'] },
      process.env.JWT_SECRET, { expiresIn: '2h' });
  });

  afterAll(async () => {

    await sequelize.close();
  });

  describe('GET /api/protected', () => {
    it('should allow access with a valid token', async () => {
      const res = await request(app)
        .get('/api/protected')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('Welcome to the User API');
    });

    it('should deny access without a token', async () => {
      const res = await request(app).get('/api/protected');
      expect(res.statusCode).toEqual(401); 
    });

    it('should deny access with an invalid token', async () => {
      const res = await request(app)
        .get('/api/protected')
        .set('Authorization', `Bearer invalidtoken`);
      expect(res.statusCode).toEqual(401); 
    });
  });

  describe('GET /api/protected/adminonly', () => {
    it('should allow access to an admin user', async () => {
      const res = await request(app)
        .get('/api/protected/adminonly')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('Welcome to the User API');
    });

    it('should deny access to a non-admin user', async () => {
      const res = await request(app)
        .get('/api/protected/adminonly')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toEqual(403); 
    });

    it('should deny access without a token', async () => {
      const res = await request(app).get('/api/protected/adminonly');
      expect(res.statusCode).toEqual(401); 
    });
  });
});
