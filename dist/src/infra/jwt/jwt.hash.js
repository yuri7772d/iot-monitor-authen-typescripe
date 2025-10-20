import jwt from "jsonwebtoken";
export function hashToken(secret, payload, expiresIn) {
    return jwt.sign(payload, secret, { expiresIn }); ////exp รับเป็น วินาที
}
export function verifyToken(secret, token) {
    try {
        return jwt.verify(token, secret);
    }
    catch (err) {
        throw new Error("Invalid access token");
    }
}
