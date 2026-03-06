import type { Role } from '../generated/prisma/enums';
import type { NextFunction, Request, Response } from 'express';

export function authorize(...roles: Role[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.user || !roles.includes(req.user?.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
}
