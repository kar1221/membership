import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import { createUser, fetchUserForAuth } from '../db/queries';
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

  const existingUser = await fetchUserForAuth(req.body.username);

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

      res.status(200).json({
        message: 'Sign Up successful',
        data: {
          user
        }
      });
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

  req.logout((err) => {
    if (err) {
      serverResponse.internalServerError('Logout failed on server side.');
      next(err);
      return;
    }

    serverResponse.ok('Logout successful');
  });
}

export default {
  handleSignup,
  getUser,
  logout
};
