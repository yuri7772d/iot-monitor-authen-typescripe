// types/express/index.d.ts or a global.d.ts file
import 'express';
import { Payload } from '../jwt/jwt.model.js';

declare module 'express-serve-static-core' {
  interface Request {
    payload?:Payload; // You can change `any` to a more specific type
  }
}