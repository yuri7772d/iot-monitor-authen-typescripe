import { Router, Request, Response, response } from "express";
import { UserUseCase } from "../../../usecase/user.usecase.js";
import { UserMysql } from "../../mysql/repo/user.js";
import { ConfigEnv } from "../../../config/config.model.js";
import { Mysql } from "../../mysql/connecter.js";
import { mapToUserRegisterRequest, userRegisterValidation } from "../middlewere/userReister.validating.js";
import { validate } from "../middlewere/validate.js";
import { mapToUserLoginRequest, userLoginValidation } from "../middlewere/userlogin.validating.js";
import { cookieRefreshTokenValidation } from "../middlewere/cookieRefreshToken.validating.js";
import { verifyToken } from "../../jwt/jwt.hash.js";
import { verifyTokenMinddlewere } from "../middlewere/verifyToken.middlewere.js";

export class UserRouter {
  public router: Router;
  private userUsecase: UserUseCase;
  private acessTokenCokieExp = 60 * 60 * 24;
  private refreshTokenCokieExp = 60 * 60 * 24 * 8;
  constructor(config: ConfigEnv, db: Mysql) {

    const userRepo = new UserMysql(db);
    this.userUsecase = new UserUseCase(userRepo, config.jwt);
    this.router = Router();
    this.router.post("/register",userRegisterValidation ,validate,this.register.bind(this));
    this.router.post("/login",userLoginValidation ,validate,this.login.bind(this));
    this.router.get("/refreshToken",cookieRefreshTokenValidation ,this.refreshToken.bind(this));
    this.router.get("/",verifyTokenMinddlewere(config.jwt.secret) ,this.get.bind(this));
  }

  async register(req: Request, res: Response) {
    await this.userUsecase.register(req.body)
      .then((result)=>{
        res.cookie("acessToken", result.passport.acessToken, { maxAge: this.acessTokenCokieExp, httpOnly: true });
        res.cookie("refreshToken", result.passport.refreshToken, { maxAge: this.refreshTokenCokieExp, httpOnly: true });
        res.status(200).json(result.res);
       }).catch((e)=>{
        res.status(400).json({message: e.message|| e})
    })
  }

    async login(req: Request, res: Response) {
    await this.userUsecase.login(req.body)
      .then((result)=>{
        res.cookie("acessToken", result.passport.acessToken, { maxAge: this.acessTokenCokieExp, httpOnly: true });
        res.cookie("refreshToken", result.passport.refreshToken, { maxAge: this.refreshTokenCokieExp, httpOnly: true });
        res.status(200).json(result.res);
       }).catch((e)=>{
        res.status(400).json({message: e.message|| e})
    })
  }
      async refreshToken(req: Request, res: Response) {
    await this.userUsecase.refreshToken(req.cookies.refreshToken)
      .then((result)=>{
        res.cookie("acessToken", result.passport.acessToken, { maxAge: this.acessTokenCokieExp, httpOnly: true });
        res.cookie("refreshToken",result.passport.refreshToken, { maxAge: this.refreshTokenCokieExp, httpOnly: true });
        res.status(200).json(result.res)
       }).catch((e)=>{
        res.status(400).json({message: e.message|| e})
    })


  }

      async get(req: Request, res: Response) {
    res.status(200).json({
      id:req.payload?.id,
      username:req.payload?.username,
    })

  }




}
