import type { Request, Response } from "express";

export async function healthCheck(req: Request, res: Response) {
  res.status(200).json({ message: "ok" });
}