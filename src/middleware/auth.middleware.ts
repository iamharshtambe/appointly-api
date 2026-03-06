import { Role } from '../generated/prisma/enums';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export type JwtPayload = { userId: string; role: Role };

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or malformed token' });
  }

  const token = authHeader.slice(7);

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
