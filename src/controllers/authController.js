import { authService } from "../services";


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

async function login(req, res, next) {
  authService.login(req, res, next);
}

export default { login };