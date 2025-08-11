import path from 'node:path';

import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';

import passport from './config/passport';
import env from './env';
import httpLogger from './middlewares/httpLogger';
import homeRouter from './routes/home';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", 'cdn.jsdelivr.net'],
        styleSrc: ["'self'", 'cdn.jsdelivr.net', 'fonts.googleapis.com']
      }
    }
  })
);
app.use(
  cors({
    origin: ['cdn.jsdelivr.net', 'fonts.googleapis.com']
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

app.use('/', homeRouter);

export default app;
