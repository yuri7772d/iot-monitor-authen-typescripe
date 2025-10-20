import { config } from "../../config/config.load.js";
import express from "express";
import { healthCheck } from "./default.router.js";
import { UserRouter } from "./router/user.router.js";
import { Mysql } from "../mysql/connecter.js";
import cookieParser from "cookie-parser";
export function startServer() {
    const app = express();
    const db = new Mysql(config.mysql);
    const userRouter = new UserRouter(config, db);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.get("/", healthCheck);
    app.use("/user", userRouter.router);
    app.listen(config.server.port, () => {
        console.log(`Server running on http://localhost:${config.server.port}`);
    });
}
