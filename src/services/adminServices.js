import * as bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { RoleModel, UserModel } from "@/models";


async function createUser(userInput) {
  const { password, role } = userInput;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.build({
    ...userInput,
    password: hashedPassword,
    passwordDecrypt: password
  });
  await newUser.save();

  if (Array.isArray(role))
  {
    const rolePromise = role.map(async (roleName) => {
      const userRole = await RoleModel.findOne({ where: { name: roleName } });
      if (userRole) {
        await newUser.addRole(userRole);
      }
    });
    await Promise.all(rolePromise);
  }
  return newUser;
}

async function getAllUsers(criteria){
  const { sort,order, limit, page, search,role } = criteria;

  const offset = (page - 1) * limit;
  const where = {
    ...(search && {
      [Op.or]: [
        { firstname: { [Op.like]: `%${search}%` } },
        { lastname: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } }
      ]
    })
  };

  const users = await UserModel.findAll({
    where,
    order : [[sort, order]],
    limit,
    offset,
    attributes: { exclude: ['password', 'passwordDecrypt'] },
    include: [
      {
        model: RoleModel,
        as: 'roles',
        attributes: ['name'],
        through: { attributes: [] },
        where : role ? { name: role } : undefined
      }
    ]
  })

  return users;
}

async function getUserById(userId) {
  const user = await UserModel.findOne({
    where: { id: userId },
    attributes: { exclude: ['password', 'passwordDecrypt']},
    include: [
      {
        model: RoleModel,
        as: 'roles',
        attributes: ['name'],
        through: { attributes: [] }
      }
    ]
  });
  return user;
}

async function updateUser(userId, userInput) {
  const user = await UserModel.findByPk(userId);
  await user.update(userInput);
  return user;
}

// eslint-disable-next-line
async function deleteUser(userId) {}

async function getRoles() {
  const roles = await RoleModel.findAll();
  return roles;
}

export {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  getRoles
};
