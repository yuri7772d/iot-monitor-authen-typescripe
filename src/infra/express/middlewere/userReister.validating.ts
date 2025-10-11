import { body } from "express-validator";
import { validate } from "./validate.js";
import { Request, Response, NextFunction } from "express";
import {  UserRegisterRequest } from "../../../domain/handlerModel/user.handler.model.js";

// ฟังก์ชัน validate + map เป็น type
export const userRegisterValidation = [
  body("username")
    .isString()
    .withMessage("Username must be a string"),
  body("password")
    .isString()
    .withMessage("Password must be a string"),
];

// Middleware แปลง req.body เป็น type
export function mapToUserRegisterRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Type assertion ว่า req.body เป็น UserRegisterRequest
  req.body = req.body as UserRegisterRequest;
  next();
}
