import { Router } from 'express';

import authContoller from '../controllers/authContoller';
import signUpValidationRule from '../validator/signUpValidator';

const authRoute = Router();

authRoute.post('/signup', signUpValidationRule, authContoller.handleSignup);
authRoute.get('/user', authContoller.getUser);
authRoute.post('/logout', authContoller.logout);
authRoute.post('/login');

export default authRoute;
