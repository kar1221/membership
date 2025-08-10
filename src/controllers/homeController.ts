import type { Request, Response } from 'express';

const messages = [
  { message: 'Hi', author: 'yes' },
  { message: 'No', author: 'another yes' }
];

const userInfo: PublicUserData = {
  username: 'kar1221',
  id: 2
};

function renderHomePage(req: Request, res: Response): void {
  res.render('home', {
    messages,
    user: userInfo
  });
}

export default renderHomePage;
