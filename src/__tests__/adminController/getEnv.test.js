// const { getEnv } = require("@/utils");
import { getEnv } from '@/utils';

describe('getEnv',()=>{
  it('should return the environment variable if it exists',()=>{
    process.env.TEST = 'test';
    expect(getEnv('TEST')).toEqual('test');
    delete process.env.TEST;
  })

  it('should return the default value if the environment variable does not exist',()=>{
    expect(getEnv('TEST','default')).toEqual('default');
    delete process.env.TEST;
  })

  it('should return undefined if the environment variable does not exist',()=>{
    expect(getEnv('TEST')).toBeUndefined();
  })

})