import jwt from 'jsonwebtoken';
import { getEnv } from "@/utils";
import authorizeRoles from '@/middleware/authMiddelware';

jest.mock('jsonwebtoken');
jest.mock('@/utils');
describe('authorizeRoles Middleware',()=>{

  let req;
  let res;
  let next;

  beforeAll(()=>{
    req = {
      headers:{
        authorization : 'Bearer testtoken'
      }
    }

    res = {
      status:jest.fn().mockReturnThis(),
      json:jest.fn()
    }

    next = jest.fn();
    getEnv.mockReturnValue('testsecret');
  })

  it('should call next if user has the allowed role',()=>{
    jwt.verify.mockReturnValue({roles:['admin']});

    const middleware = authorizeRoles('admin');
    middleware(req,res,next);
    expect(next).toHaveBeenCalled();
  })

  it('should return 403 if user does not have allowed role',()=>{
    jwt.verify.mockReturnValue({roles:['user']});

    const middleware = authorizeRoles('admin');
    middleware(req,res,next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({message:'Forbidden'});
  })

  it('should return 403 if token is invalid',()=>{
    jwt.verify.mockImplementation(()=>{
      throw new Error();
    });

    const middleware = authorizeRoles('admin');
    middleware(req,res,next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({message:'Forbidden'});
  })

  it('should return 403 if no roles are provided',()=>{
    jwt.verify.mockReturnValue({roles:[]});

    const middleware = authorizeRoles('admin');
    middleware(req,res,next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({message:'Forbidden'});
  })

  
 
})