import { check } from 'express-validator';

import type { ValidationChain } from 'express-validator';

const loginValidationRule: ValidationChain[] = [
  check('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .matches(/^[a-zA-Z0-9_.-]+$/),
  check('password').notEmpty().withMessage('Password is required')
];

export default loginValidationRule;
