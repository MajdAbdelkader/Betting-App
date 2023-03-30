import passportJWT from "passport-jwt";
import db from "../models";
import jwt from "jsonwebtoken";
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
//CHANGE THIS SECRET
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};
const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  const user = await db.user.findByPk(payload.id);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
});
const signToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, username: user.username },
    jwtOptions.secretOrKey,
    {
      algorithm: "HS256",
    }
  );
};
export { jwtStrategy, jwtOptions, signToken };
