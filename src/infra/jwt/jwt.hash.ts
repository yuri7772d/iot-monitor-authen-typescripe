import jwt from "jsonwebtoken";
import { Payload } from "./jwt.model.js";

export function hashToken(secret: string, payload: Payload ,expiresIn :number): string {
  return jwt.sign(payload, secret, {  expiresIn  });  ////exp รับเป็น วินาที
}

export function verifyToken(secret: string, token: string) {
  try {
    return jwt.verify(token, secret) as Payload;
  } catch (err) {
    throw new Error("Invalid access token");
  }
}
