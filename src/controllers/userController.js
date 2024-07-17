import { UserModel } from "../models";
import { userService } from "../services";

/**
 * End-point to register a user
 *
 * @param {Request} request http request for user registration
 * @param {Response} response http response
 * @returns {Promise<Response>} returns
 * 200 { token, refreshToken } as Data if user was registered successfully
 * 422 { message } if user already exists
 * 500 { message }
 *
 */

async function createUser(request, response) {
  try {
    const { body: userInput } = request;
    const { email } = userInput;
    const checkUser = await userService.getUserByEmail(email);
    if (checkUser) {
      return response.status(422).json({ message: "User already exists" });
    }

    const newUser = await userService.addUser(userInput);
    return response.json({
      newUser
    });
  } catch (error) {
    const { message } = error;
    return response.status(500).json({ message });
  }
}

async function getAllTheUsers(request, response) {
  try {
    const users = await userService.getAllUsers();
    return response.status(200).json({
      data: { users }
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return response.status(500).json({
      error: "Internal error retrieving users!"
    });
  }
}

async function getOneUser(request, response) {
  try {
    const {
      params: { userId }
    } = request;
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return response.status(404).json({
        error: "no user found"
      });
    }
    return response.status(200).json({ data: { user } });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return response.status(500).json({
      error: "Internal error retrieving users!"
    });
  }
}

async function updateUser(request, response) {
  try {
    const {
      params: { userId }
    } = request;
    const { body: userInput } = request;
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return response.status(404).json({
        error: "no user found"
      });
    }
    const result = await userService.updateUser(userId, userInput);
    return response.status(200).json({ data: { result } });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return response.status(500).json({
      error: "Internal error updating user"
    });
  }
}

async function deleteUser(request, response) {
  try {
    const {
      params: { userId }
    } = request;
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return response.status(404).json({
        error: "no user found"
      });
    }
    const result = await userService.deleteUser(userId);
    return response.status(200).json(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return response.status(500).json({
      error: "Internal error deleting user"
    });
  }
}

export { deleteUser, getAllTheUsers, createUser, updateUser, getOneUser };
