import type { Request, Response } from 'express';

const messages = [
  { message: 'Hi', author: 'yes' },
  { message: 'No', author: 'another yes' }
];

const userInfo: Express.User = {
  username: 'kar1221',
  id: 2,
  role: 'Admin',
  joinedDate: new Date()
};

function renderHomePage(req: Request, res: Response): void {
  res.render('home', {
    messages,
    user: req.user
  });
}

export default renderHomePage;
