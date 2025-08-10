import type { NextFunction, Request, Response } from 'express';

function renderSignupForm(req: Request, res: Response): void {
  if (req.isAuthenticated()) {
    res.redirect('/');
    return;
  }

  res.render('sign-up');
}

async function handleSignUp(req: Request, res: Response, next: NextFunction) {
}

export { handleSignUp, renderSignupForm };
