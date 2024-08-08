import jwt from "jsonwebtoken";
import passport from "@/utils/passport";
import { getEnv } from "@/utils";

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

export default {login} ;