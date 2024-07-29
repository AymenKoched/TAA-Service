import { authService, userService } from "../services";


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

async function register(request, response) {
  try {
    const { body: userInput } = request;
    const { email } = userInput;
    const checkUser = await userService.getUserByEmail(email);
    if (checkUser) {
      return response.status(422).json({ message: "User already exists" });
    }

    await authService.registerUser(userInput);
    return response.status(200).json({ msg: "User Created" });
  } catch (error) {
    const { message } = error;
    return response.status(500).json({ "message":message });
  }
}


async function login(req, res, next) {
  authService.login(req, res, next);
}

export { register, login };