import type { JwtPayload } from '../middleware/auth.middlewares';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
