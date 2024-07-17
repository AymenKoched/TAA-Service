import * as bcrypt from "bcryptjs";
import { UserModel } from "../models";

async function getUserByEmail(email) {
  const user = await UserModel.findOne({
    where: { email }
  });
  return user;
}

async function addUser(userInput) {
  const { password } = userInput;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.build({
    ...userInput,
    password: hashedPassword,
    passwordDecrypt: password
  });

  await newUser.save();
  return newUser;
}

async function getAllUsers() {
  const users = await UserModel.findAll({
    attributes: ["firstName", "lastName", "email", "phone"]
  });
  return users;
}

async function updateUser(userId, userInput) {
  const result = await UserModel.update(
    { ...userInput },
    {
      where: {
        id: userId
      }
    }
  );
  return result;
}

async function deleteUser(userId) {
  const result = await UserModel.destroy({
    where: {
      id: userId
    }
  });
  return result;
}

// eslint-disable-next-line import/prefer-default-export
export { getUserByEmail, addUser, getAllUsers, updateUser, deleteUser };
