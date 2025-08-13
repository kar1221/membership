import path from 'node:path';

import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';

import apiRouter from './api';
import passport from './config/passport';
import env from './env';
import logger from './logger';
import httpLogger from './middlewares/httpLogger';
import ensureUserSafe from './middlewares/safeUser';

import type { NextFunction, Request, Response } from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         scriptSrc: ["'self'", 'cdn.jsdelivr.net'],
//         styleSrc: ["'self'", 'cdn.jsdelivr.net', 'fonts.googleapis.com']
//       }
//     }
//   })
// );
app.use(
  cors({
    // origin: ['cdn.jsdelivr.net', 'fonts.googleapis.com']
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(httpLogger);

app.use(
  session({
    secret: env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(ensureUserSafe);

app.use('/api', apiRouter);

if (env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../vue-frontend/dist')));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../vue-frontend/dist/index.html'));
  });
}

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err);
  res.status(500).send('Internal Error');
});

export default app;
