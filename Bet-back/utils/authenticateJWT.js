import { jwtStrategy } from "./jwt";
import passport from "passport";

const authenticateJWT = (req, res, next) => {
  passport.authenticate(jwtStrategy, { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};
export default authenticateJWT;
