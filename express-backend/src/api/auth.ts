import { Router } from 'express';

import authContoller from '../controllers/authContoller';
import logger from '../logger';
import signUpValidationRule from '../validator/signUpValidator';

const authRoute = Router();

authRoute.post('/signup', signUpValidationRule, authContoller.handleSignup);
authRoute.get(
  '/user',
  (req, res, next) => {
    logger.debug(`sessionId: ${req.sessionID}`);
    logger.debug(`hasUser: ${!!req.user}`);
  },
  authContoller.getUser
);

export default authRoute;
