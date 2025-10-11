import { JWT } from "../config/config.model.js";
import {
  UserLoginRequest,
  UserLoginResponse,
  UserRefreshTokenResponse,
  UserRegisterRequest,
  UserRegisterResponse,
} from "../domain/handlerModel/user.handler.model.js";
import { UserRepo } from "../domain/repo/user.repo.js";
import { hashToken, verifyToken } from "../infra/jwt/jwt.hash.js";
import { Passport, Payload } from "../infra/jwt/jwt.model.js";

export class UserUseCase {
  private repo: UserRepo;
  private jwtConfig: JWT;
  private expAcessToken = 3600; // 1h
  private expRefreshToken = 3600 * 24 * 7; // 7d

  constructor(repo: UserRepo, jwtConfig: JWT) {
    this.repo = repo;
    this.jwtConfig = jwtConfig;
  }
  async register(
    req: UserRegisterRequest
  ): Promise<{ res: UserRegisterResponse; passport: Passport }> {
    const result = await this.repo.create(req.username, req.password);

    const payload: Payload = {
      id: result.id,
      username: req.username,
    };

    const acessToken = hashToken(
      this.jwtConfig.secret,
      payload,
      this.expAcessToken
    );
    const refreshToken = hashToken(
      this.jwtConfig.refreshSecret,
      payload,
      this.expRefreshToken
    );

    return {
      res: {
        id: result.id,
        username: req.username,
      },
      passport: {
        acessToken: acessToken,
        refreshToken: refreshToken,
      },
    };
  }

  async login(
    req: UserLoginRequest
  ): Promise<{ res: UserLoginResponse; passport: Passport }> {
    const result = await this.repo.get_by_username(req.username);
    if (req.password != result.password) {
      throw new Error("Password is invalid!");
    }

    const payload: Payload = {
      id: result.id,
      username: req.username,
    };

    const acessToken = hashToken(
      this.jwtConfig.secret,
      payload,
      this.expAcessToken
    );
    const refreshToken = hashToken(
      this.jwtConfig.refreshSecret,
      payload,
      this.expRefreshToken
    );

    return {
      res: {
        id: result.id,
        username: req.username,
      },
      passport: {
        acessToken: acessToken,
        refreshToken: refreshToken,
      },
    };
  }

  async refreshToken(
    refreshToken: string
  ): Promise<{ res: UserRefreshTokenResponse; passport: Passport }> {
    const decode = verifyToken(this.jwtConfig.refreshSecret, refreshToken);

    const payload: Payload = {
      id: decode.id,
      username: decode.username,
    };
    const acessToken = hashToken(
      this.jwtConfig.secret,
      payload,
      this.expAcessToken
    );
    return {
      res: {
        id: decode.id,
        username: decode.username,
      },
      passport: {
        acessToken: acessToken,
        refreshToken: refreshToken,
      },
    };
  }
}
