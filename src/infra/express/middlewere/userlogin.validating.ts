import { body } from "express-validator";
import { validate } from "./validate.js";
import { Request, Response, NextFunction } from "express";
import { UserLoginRequest } from "../../../domain/handlerModel/user.handler.model.js";

// ฟังก์ชัน validate + map เป็น type
export const userLoginValidation =  [
  body("username")
    .isString()
    .withMessage("Username must be a string"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
];

// Middleware แปลง req.body เป็น type
export function mapToUserLoginRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body = req.body as UserLoginRequest;
  next();
}
