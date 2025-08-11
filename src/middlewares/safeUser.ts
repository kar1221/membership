import type { NextFunction, Request, Response } from 'express';

// Sanitize password from req.user object
// to avoid data leaking.
//
// Note to myself:
// Although deserializeUser retrieve an Express.User object which doesn't contain password field.
// There will be an edge case where after initial user login, req.user will be populated with
// AuthUser object which contains hashed password from user.
//
// If for some ungodly reason, which will probably happen, i wrote a logic where after initial user login
// it renders a webpage and send it back to user without redirect(it doesn't trigger deserializeUser)
// it will potentially send an user object with password back to client.
//
// So this middleware is to strip password field from req.user after passport.js does its thing.
function ensureUserSafe(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  if (req.user && 'password' in req.user) {
    const { password, ...safeUser } = req.user as AuthUser;
    req.user = safeUser;
  }

  next();
}

export default ensureUserSafe;
