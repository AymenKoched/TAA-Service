import { UserModel } from "../models";

async function getUserByEmail(email) {
  const user = await UserModel.findOne({
    where: { email }
  });
  return user;
}



// eslint-disable-next-line import/prefer-default-export
export { getUserByEmail };
