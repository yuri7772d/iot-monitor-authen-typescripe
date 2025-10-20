import { body } from "express-validator";
// ฟังก์ชัน validate + map เป็น type
export const userLoginValidation = [
    body("username")
        .isString()
        .withMessage("Username must be a string"),
    body("password")
        .isString()
        .withMessage("Password must be a string")
];
// Middleware แปลง req.body เป็น type
export function mapToUserLoginRequest(req, res, next) {
    req.body = req.body;
    next();
}
