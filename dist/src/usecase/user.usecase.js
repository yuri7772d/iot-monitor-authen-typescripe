import { hashToken, verifyToken } from "../infra/jwt/jwt.hash.js";
export class UserUseCase {
    repo;
    jwtConfig;
    expAcessToken = 3600; // 1h
    expRefreshToken = 3600 * 24 * 7; // 7d
    constructor(repo, jwtConfig) {
        this.repo = repo;
        this.jwtConfig = jwtConfig;
    }
    async register(req) {
        const result = await this.repo.create(req.username, req.password);
        const payload = {
            id: result.id,
            username: req.username,
        };
        const acessToken = hashToken(this.jwtConfig.secret, payload, this.expAcessToken);
        const refreshToken = hashToken(this.jwtConfig.refreshSecret, payload, this.expRefreshToken);
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
    async login(req) {
        const result = await this.repo.get_by_username(req.username);
        if (req.password != result.password) {
            throw new Error("Password is invalid!");
        }
        const payload = {
            id: result.id,
            username: req.username,
        };
        const acessToken = hashToken(this.jwtConfig.secret, payload, this.expAcessToken);
        const refreshToken = hashToken(this.jwtConfig.refreshSecret, payload, this.expRefreshToken);
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
    async refreshToken(refreshToken) {
        const decode = verifyToken(this.jwtConfig.refreshSecret, refreshToken);
        const payload = {
            id: decode.id,
            username: decode.username,
        };
        const acessToken = hashToken(this.jwtConfig.secret, payload, this.expAcessToken);
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
