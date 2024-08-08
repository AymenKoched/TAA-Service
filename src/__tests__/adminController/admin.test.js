import { Op } from 'sequelize';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { sequelize } from '@/utils';
import { RoleModel, UserModel } from '@/models';




describe('admin routes',()=>{

  let adminToken;

  beforeAll(async ()=>{
    await sequelize.sync({force:true});

    const role = await RoleModel.create({
      name : 'admin'
    });
    await RoleModel.create({
      name : 'member'
    });
    await RoleModel.create({
      name : 'subscriber'
    });


    const admin = await UserModel.create({
      firstName:'Admin',
      lastName:'Admin',
      phone:'1234567890',
      email:'admin@gmail.com',
      password : '$2a$10$gxISaUhX75fXAKaJFXTCQexgDPJYAyHkP5qBeC81oWPA7Yl.xY8I2',
      passwordDecrypt : 'password123'
    })

    admin.addRole(role);

    adminToken = jwt.sign({id:admin.id,email:admin.email,roles:['admin']},
      process.env.JWT_SECRET,{expiresIn:'2h'});
  });

  afterAll(async ()=>{
    await sequelize.close();
  });
  afterEach(async()=>{
    await UserModel.destroy({where:{
      [Op.or]:[
        {email:'john@gmail.com'},
        {email:'admin@gmail.com'}
      ]
    }});
  });

  describe('GET /api/admin/users',()=>{
    it('should allow access with a valid token',async()=>{

      await request('http://localhost:3000')
        .post('/api/admin/users')
        .set('Authorization',`Bearer ${adminToken}`)
        .send({
          firstName:'John',
          lastName:'Doe',
          phone:'1234567890',
          email:'john@gmail.com',
          password:'password123',
          role : ['member','subscriber']
        });


      const res = await request('http://localhost:3000')
        .get('/api/admin/users')
        .set('Authorization',`Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            email : 'john@gmail.com',
            firstName : 'John',
            lastName : 'Doe',
            phone : '1234567890',
            roles : [{name:'member'},{name:'subscriber'}]
          }),
          expect.objectContaining({
            email : 'admin@gmail.com',
            firstName : 'Admin',
            lastName : 'Admin',
            phone : '1234567890',
            roles : [{name:'admin'}]
          })
        ])
      );
    });
  });

  describe('POST /api/admin/users',()=>{
    it('should create a new user',async()=>{
      const newuser = await request('http://localhost:3000')
        .post('/api/admin/users')
        .set('Authorization',`Bearer ${adminToken}`)
        .send({
          firstName:'John',
          lastName:'Doe',
          phone:'1234567890',
          email:'john@gmail.com',
          password:'password123',
          role : ['member']
        });
      expect(newuser.statusCode).toEqual(201);
      expect(newuser.body).toEqual(
        {
          id:expect.any(Number),
          firstName:'John',
          lastName:'Doe',
          phone:'1234567890',
          email:'john@gmail.com',
          password : expect.any(String),
          passwordDecrypt: 'password123',
          createdAt:expect.any(String),
          updatedAt:expect.any(String)
        }
      )
    })
  });

  describe('GET /api/admin/users/:id',()=>{
    it('should return a user by id',async()=>{
      const user = await request('http://localhost:3000')
        .post('/api/admin/users')
        .set('Authorization',`Bearer ${adminToken}`)
        .send({
          firstName:'John',
          lastName:'Doe',
          phone:'1234567890',
          email:'john@gmail.com',
          password:'password123',
          role : ['member']
        });
      const res = await request('http://localhost:3000')
        .get(`/api/admin/users/${user.body.id}`)
        .set('Authorization',`Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          email : 'john@gmail.com',
          firstName : 'John',
          lastName : 'Doe',
          phone : '1234567890',
          roles : [{name:'member'}]
        }));
    });
  });
})