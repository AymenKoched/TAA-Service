import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RoleModel, UserModel } from "../models";
import passport from "@/utils/passport";
import { getEnv } from "@/utils";


async function registerUser(userInput) {
  const { password } = userInput;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.build({
    ...userInput,
    password: hashedPassword,
    passwordDecrypt: password
  });
  await newUser.save();

  let userRole = await RoleModel.findOne({ where: { name: 'user' } });
  if (!userRole) {
    userRole = await RoleModel.create({ name: 'user' });
  }
  await newUser.addRole(userRole);


  return newUser;
}


async function login(req, res, next) {
  return passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Something is not right', info });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username, roles: user.roles },
      getEnv('JWT_SECRET'), { expiresIn: '2h' });
    return res.json({ token });
  })(req, res, next);
}

export { registerUser, login };