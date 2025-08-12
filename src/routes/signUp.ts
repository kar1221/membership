import { Router } from 'express';

import { renderSignupForm } from '../controllers/signUpController';

const signUpRouter = Router();

signUpRouter.get('/', renderSignupForm);

export default signUpRouter;
