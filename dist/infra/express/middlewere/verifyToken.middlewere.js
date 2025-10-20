import { verifyToken } from "../../jwt/jwt.hash.js";
export function verifyTokenMinddlewere(secret) {
    return (req, res, next) => {
        try {
            const token = req.cookies?.acessToken;
            if (!token) {
                res.status(401).json({ mesage: 'token not found!' });
            }
            const payload = verifyToken(secret, token);
            req.payload = payload;
        }
        catch (error) {
            res.status(401).json({ mesage: 'token invalid!' });
        }
    };
}
