import { UserModel } from "../models";

async function getUserByEmail(email) {
  const user = await UserModel.findOne({
    where: { email }
  });
  return user;
}



export default  getUserByEmail ;
