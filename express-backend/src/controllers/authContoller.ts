import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import { createUser, fetchUserForAuth } from '../db/queries';

import type { NextFunction, Request, Response } from 'express';

async function handleSignup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      message: errors.array().map((err) => err.msg as string),
      data: null
    });

    return;
  }

  const existingUser = await fetchUserForAuth(req.body.username);

  if (existingUser) {
    res.status(400).json({
      message: 'Username already exists',
      data: null
    });

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
        res.status(500).json({
          message: 'There was some problem logging in',
          data: null
        });

        next(new Error('There was some problem logging in.'));
      }

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
  if (req.isAuthenticated())
    res.status(200).json({
      message: 'Authenticated',
      data: {
        user: req.user
      }
    });
  else
    res.status(401).json({
      message: 'Not Authenticated',
      data: null
    });
}

async function logout(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  req.logout((err) => {
    if (err) {
      next(err);
      return;
    }

    res.status(200).json({
      message: 'Logout',
      data: null
    });
  });
}

export default {
  handleSignup,
  getUser,
  logout
};
