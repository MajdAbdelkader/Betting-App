import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateJWT from "../../utils/authenticateJWT";
import { signToken } from "../../utils/jwt";
module.exports = (app, db) => {
  app.get("/users", authenticateJWT, (req, res) =>
    db.user
      .findAll({ attributes: { exclude: ["hashedPassword"] } })
      .then((result) => res.json(result))
  );

  app.get("/user/:id", authenticateJWT, (req, res) =>
    db.user.findByPk(req.params.id).then((result) => {
      result = result.map((user) => delete user.hashedPassword);
      res.json(result);
    })
  );

  //Register and user creation.
  app.post("/user", async (req, res) => {
    const { username, email, password } = req.body;

    // Check if username already exists
    const existingUser = await db.user.findOne({
      where: { username: username },
    });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Hash password
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      // Add user to database
      let newUser = {
        username,
        email,
        hashedPassword: hash,
        role: "USER",
      };
      await db.user.create(newUser).then((result) => (newUser = result));

      // Create JWT token
      const token = signToken(newUser);

      // Return success response with token
      return res.json({ message: "Registration successful", token });
    });
  });

  //User updating, any field works.
  app.put("/user/:id", authenticateJWT, async (req, res) => {
    await db.user
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then((result) => res.json(result));
  });

  app.delete(
    "/user/:id",
    authenticateJWT,
    async (req, res) =>
      await db.user
        .destroy({
          where: {
            id: req.params.id,
          },
        })
        .then((result) => res.json(result))
  );

  //Login route and login
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = await db.user.findOne({ where: { username: username } });

    // If user doesn't exist, return error response
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if password matches
    bcrypt.compare(password, user.hashedPassword, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: "Password incorrect" });
      }

      // Create JWT token
      const token = signToken(user);

      // Return success response with token
      return res.json({ message: "Login successful", token });
    });
  });
};
