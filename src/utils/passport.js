import getEnv from "./getEnv";
import { UserModel } from "@/models/index";

const passport = require('passport');
const passportJWT = require('passport-jwt');
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');



dotenv.config();

const JWT_SECRET = getEnv('JWT_SECRET');


const LocalStrategy = passportLocal.Strategy;
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { message: 'Incorrect email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return done(null, false, { message: 'Incorrect email or password' });
    }
    const roles = await user.getRoles()
    user.roles = roles.map(role => role.name);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));



const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
}, (jwtPayload, done) => {
  const user = UserModel.findOne({where: { id: jwtPayload.id }});
  return done(null, user);
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = UserModel.findOne({where: { id }});
  done(null, user);
});

export default passport;
