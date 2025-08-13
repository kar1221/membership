import { Router } from 'express';

import authContoller from '../controllers/authContoller';
import signUpValidationRule from '../validator/signUpValidator';

const authRoute = Router();

authRoute.post('/signup', signUpValidationRule, authContoller.handleSignup);

export default authRoute;
