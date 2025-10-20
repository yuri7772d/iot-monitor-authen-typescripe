import { Router } from "express";
import { UserUseCase } from "../../../usecase/user.usecase.js";
import { UserMysql } from "../../mysql/repo/user.js";
import { userRegisterValidation } from "../middlewere/userReister.validating.js";
import { validate } from "../middlewere/validate.js";
import { userLoginValidation } from "../middlewere/userlogin.validating.js";
import { cookieRefreshTokenValidation } from "../middlewere/cookieRefreshToken.validating.js";
export class UserRouter {
    router;
    userUsecase;
    acessTokenCokieExp = 60 * 60 * 24;
    refreshTokenCokieExp = 60 * 60 * 24 * 8;
    constructor(config, db) {
        const userRepo = new UserMysql(db);
        this.userUsecase = new UserUseCase(userRepo, config.jwt);
        this.router = Router();
        this.router.post("/register", userRegisterValidation, validate, this.register.bind(this));
        this.router.post("/login", userLoginValidation, validate, this.login.bind(this));
        this.router.get("/refreshToken", cookieRefreshTokenValidation, this.refreshToken.bind(this));
    }
    async register(req, res) {
        await this.userUsecase.register(req.body)
            .then((result) => {
            res.cookie("acessToken", result.passport.acessToken, { maxAge: this.acessTokenCokieExp, httpOnly: true });
            res.cookie("refreshToken", result.passport.refreshToken, { maxAge: this.refreshTokenCokieExp, httpOnly: true });
            res.status(200).json(result.res);
        }).catch((e) => {
            res.status(400).json({ message: e.message || e });
        });
    }
    async login(req, res) {
        await this.userUsecase.login(req.body)
            .then((result) => {
            res.cookie("acessToken", result.passport.acessToken, { maxAge: this.acessTokenCokieExp, httpOnly: true });
            res.cookie("refreshToken", result.passport.refreshToken, { maxAge: this.refreshTokenCokieExp, httpOnly: true });
            res.status(200).json(result.res);
        }).catch((e) => {
            res.status(400).json({ message: e.message || e });
        });
    }
    async refreshToken(req, res) {
        await this.userUsecase.refreshToken(req.cookies.refreshToken)
            .then((result) => {
            res.cookie("acessToken", result.passport.acessToken, { maxAge: this.acessTokenCokieExp, httpOnly: true });
            res.cookie("refreshToken", result.passport.refreshToken, { maxAge: this.refreshTokenCokieExp, httpOnly: true });
            res.status(200).json(result.res);
        }).catch((e) => {
            res.status(400).json({ message: e.message || e });
        });
    }
}
