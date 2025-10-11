import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import {  UserRegisterRequest } from "../../../domain/handlerModel/user.handler.model.js";

// ฟังก์ชัน validate + map เป็น type
export function cookieRefreshTokenValidation (
    req: Request,
  res: Response,
  next: NextFunction 
) {
  const refreshToken = req.cookies?.refreshToken ;
    if (!refreshToken){
    return res.status(401).json({ message: "Invalid refreshToken" });
  }
  next();
}




// Middleware แปลง req.body เป็น type
