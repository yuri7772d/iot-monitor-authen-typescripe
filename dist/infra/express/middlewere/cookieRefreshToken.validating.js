// ฟังก์ชัน validate + map เป็น type
export function cookieRefreshTokenValidation(req, res, next) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "Invalid refreshToken" });
    }
    next();
}
// Middleware แปลง req.body เป็น type
