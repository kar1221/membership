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
import useServerResponse from './utils/useServerResponse';

import type { NextFunction, Request, Response } from 'express';

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "'self'",
          'cdn.jsdelivr.net',
          env.NODE_ENV === 'production' ? '' : 'http://localhost:5173'
        ],
        styleSrc: [
          "'self'",
          'cdn.jsdelivr.net',
          'fonts.googleapis.com',
          env.NODE_ENV === 'production' ? '' : 'http://localhost:5173'
        ]
      }
    }
  })
);
app.use(
  cors({
    origin: [
      'cdn.jsdelivr.net',
      'fonts.googleapis.com',
      env.NODE_ENV === 'production' ? '' : 'http://localhost:5173'
    ],
    credentials: true,
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
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
  const serverResponse = useServerResponse(res);
  serverResponse.internalServerError(err.message);
});

export default app;
