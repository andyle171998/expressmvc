import Passport from 'passport';
import { Container } from 'typedi';
import PassportJWT from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import encodedId from 'helper/encodedId';
import PasswordService from 'helper/password';

export default () => {
  const usersModel: Models.Users = Container.get('usersModel');
  const opts = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromExtractors([PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(), PassportJWT.ExtractJwt.fromUrlQueryParameter('access_token')]),
    secretOrKey: process.env.SECRET_JWK_TOKEN,
  };
  Passport.use(
    new PassportJWT.Strategy(opts, async (payload, done) => {
      try {
        const user = await usersModel.findByPk(payload.id, {
          attributes: {
            exclude: ['password', 'password2']
          }
        });
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(error)
      }
    })
  );
  /**
* Sign in with Facebook.
*/
  Passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID as string,
    clientSecret: process.env.FACEBOOK_SECRET as string,
    callbackURL: `${process.env.BASE_URL as string}/v1.0/oauth/facebook/callback`,
    profileFields: ['name', 'email'],
    passReqToCallback: true
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      const userByID = await usersModel.findOne({
        where: {
          facebook_id: profile.id
        },
        attributes: {
          exclude: ['password', 'password2']
        }
      });
      if (userByID) {
        return done(null, userByID);
      }
      if (profile._json.email) {
        const userByEmail = await usersModel.findOne({
          where: {
            email: profile._json.email
          },
          attributes: {
            exclude: ['password', 'password2']
          }
        });
        if (userByEmail) {
          userByEmail.facebook_id = profile.id;
          if (!userByEmail.is_verify_email) {
            userByEmail.is_verify_email = true;
          }
          await userByEmail.save();
          return done(null, userByEmail);
        }
      }
      const encryptPass = PasswordService.encryptPassword(encodedId());
      interface DataCreate {
        facebook_id: string;
        name: string;
        display_name: string;
        first_name: string;
        last_name: string;
        password: string;
        password2: string;
        profile_image: string;
        is_verify_email?: boolean;
        email?: string;
      }
      const dataCreate: DataCreate = {
        facebook_id: profile.id,
        name: profile._json.first_name,
        display_name: profile._json.first_name,
        first_name: profile._json.first_name,
        last_name: profile._json.last_name,
        password: encryptPass,
        password2: encryptPass,
        profile_image: `https://graph.facebook.com/${profile.id}/picture?type=large`,
      };
      if (profile._json.email) {
        dataCreate.is_verify_email = true;
        dataCreate.email = profile._json.email;
      }
      const user = await usersModel.create(dataCreate);
      return done(null, user);
    } catch (error) {
      return done(error)
    }
  }));
  /**
  * Sign in with Google.
  */
  Passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: `${process.env.BASE_URL as string}/v1.0/oauth/google/callback`,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const userByID = await usersModel.findOne({
        where: {
          google_id: profile.id,
        },
        attributes: {
          exclude: ['password', 'password2']
        }
      });
      if (userByID) {
        return done(undefined, userByID);
      }
      const userByEmail = await usersModel.findOne({
        where: {
          email: profile._json.email
        },
        attributes: {
          exclude: ['password', 'password2']
        }
      });
      if (userByEmail) {
        userByEmail.google_id = profile.id;
        if (!userByEmail.is_verify_email) {
          userByEmail.is_verify_email = true;
        }
        await userByEmail.save();
        return done(undefined, userByEmail);
      }
      const encryptPass = PasswordService.encryptPassword(encodedId());

      interface IDataCreate {
        google_id: string;
        name: string;
        display_name: string;
        first_name: string;
        last_name: string;
        password: string;
        password2: string;
        profile_image: string;
        is_verify_email: boolean;
        email: string;
      }

      const dataCreate: IDataCreate = {
        google_id: profile.id,
        name: profile._json.given_name,
        display_name: profile._json.given_name,
        first_name: profile._json.given_name,
        last_name: profile._json.family_name,
        password: encryptPass,
        password2: encryptPass,
        profile_image: profile._json.picture,
        is_verify_email: true,
        email: profile._json.email
      };
      const user = await usersModel.create(dataCreate);
      return done(undefined, user);
    } catch (error) {
      return done(error)
    }
  }));
};