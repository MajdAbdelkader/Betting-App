import express from "express";
import bodyParser from "body-parser";
import db from "./models";
import apiUser from "./app/api/user";
import passport from "passport";
import swaggerJSDoc from "swagger-jsdoc";
const cors = require("cors");
import swaggerUi from "swagger-ui-express";
import { jwtStrategy } from "./utils/jwt";
import swaggerOptions from "./config/swagger-config";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("app/public"));
passport.use(jwtStrategy);
apiUser(app, db);

db.sequelize.sync({ alter: true });

const specs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.listen(8080, () => console.log("App listening on port 8080!"));
