import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model.js';

const initializePassport = () => {
  
  passport.use('local', new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
          return done(null, false, { message: 'Invalid password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));


  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([
      (req) => req?.cookies?.token
    ]),
    secretOrKey: process.env.JWT_SECRET
  }, async (jwt_payload, done) => {
    try {
      const user = await UserModel.findById(jwt_payload.sub);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
}

export default initializePassport;