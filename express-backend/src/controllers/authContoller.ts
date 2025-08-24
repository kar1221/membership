import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import passport from '../config/passport';
import { createUser, fetchUserDataFromUsername } from '../db/queries';
import useServerResponse from '../utils/useServerResponse';

import type { NextFunction, Request, Response } from 'express';

async function handleSignup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const errors = validationResult(req);

  const serverResponse = useServerResponse(res);

  if (!errors.isEmpty()) {
    serverResponse.badRequest(
      errors
        .array()
        .map((err) => err.msg as string)
        .join('\n')
    );

    return;
  }

  const existingUser = await fetchUserDataFromUsername(req.body.username);

  if (existingUser) {
    serverResponse.badRequest('Username not available');

    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await createUser({
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: 'User'
    });

    req.login(user as Express.User, async (err) => {
      if (err) {
        serverResponse.internalServerError('There was some problem logging in');

        next(new Error('There was some problem logging in.'));
        return;
      }

      serverResponse.ok('Sign up successful', { user });
    });
  } catch (error) {
    next(error);
  }
}

async function getUser(req: Request, res: Response): Promise<void> {
  const serverResponse = useServerResponse(res);

  if (req.isAuthenticated()) {
    serverResponse.ok('Authenticated', { user: req.user });
  } else {
    serverResponse.unauthorized('Session not authenticated');
  }
}

async function logout(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const serverResponse = useServerResponse(res);

  req.logOut((err) => {
    if (err) {
      serverResponse.internalServerError('Logout failed on server side.');
      next(err);
      return;
    }

    req.session.destroy((serr) => {
      if (serr) {
        next(serr);
        return;
      }

      res.clearCookie('connect.sid');
      serverResponse.ok('Logout');
    });
  });
}

async function handleLogin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const serverResponse = useServerResponse(res);

  const error = validationResult(req).array();

  if (error.length > 0) {
    serverResponse.badRequest(error.map((err) => err.msg as string).join('\n'));
    return;
  }

  passport.authenticate(
    'local',
    (
      err: Error | null,
      user: Express.User,
      info: { message?: string } | undefined
    ) => {
      if (err) {
        serverResponse.internalServerError(
          `Authenticate error: ${err.message}`
        );
        return;
      }

      if (!user) {
        serverResponse.badRequest(info?.message ?? 'Invalid credentials');
        return;
      }

      req.logIn(user, (loginErr: Error) => {
        if (err) {
          serverResponse.internalServerError(
            `Login error: ${loginErr.message}`
          );
          return;
        }

        serverResponse.ok('Login Sucessful', { user });
      });
    }
  )(req, res, next);
}

export default {
  handleSignup,
  getUser,
  logout,
  handleLogin
};
