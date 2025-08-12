import { Router } from 'express';

import authContoller from '../controllers/authContoller';
import signUpValidationRule from '../validator/signUpValidator';

const apiRouter = Router();

apiRouter.post('/signup', signUpValidationRule, authContoller.handleSignup);

export default apiRouter;
