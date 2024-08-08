import { Op } from 'sequelize';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { sequelize } from '@/utils';
import { RoleModel, UserModel } from '@/models';



describe('auth routes',()=>{
  
  let adminToken;

  beforeAll(async ()=>{
    await sequelize.sync({force:true});

    const role = await RoleModel.create({
      name : 'admin'
    })

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

  describe('POST api/login',()=>{
    it('should login a user',async()=>{
      await request('http://localhost:3000')
        .post('/api/admin/users')
        .set('Authorization',`Bearer ${adminToken}`)
        .send({
          firstName:'John',
          lastName:'Doe',
          phone:'1234567890',
          email:'john@gmail.com',
          password:'password123',
          role : 'member'
        });
      const res = await request('http://localhost:3000')
        .post('/api/login')
        .send({
          email:'john@gmail.com',
          password:'password123'
        });
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('POST api/login',()=>{
    it('should not login a user with invalid credentials',async()=>{
      const res = await request('http://localhost:3000')
        .post('/api/login')
        .send({
          email:'user@gmail.com',
          password:'password123'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('Something is not right');
    }
    );
  });

});