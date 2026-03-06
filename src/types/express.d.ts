import type { JwtPayload } from '../middlewares/auth.middlewares';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
