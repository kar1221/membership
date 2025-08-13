import { check } from 'express-validator';

import type { ValidationChain } from 'express-validator';

const signUpValidationRule: ValidationChain[] = [
  check('firstName')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('First name must be between 1 and 30 characters')
    .matches(/^[A-Za-zÀ-ÿ\s'-]+$/)
    .withMessage(
      'First name can only contain letters, spaces, hyphens, and apostrophes.'
    ),
  check('lastName')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Last name must be between 1 and 30 characters')
    .matches(/^[A-Za-zÀ-ÿ\s'-]+$/)
    .withMessage(
      'First name can only contain letters, spaces, hyphens, and apostrophes.'
    ),
  check('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_.-]+$/)
    .withMessage(
      'Username can only contain letters, numbers, underscores, periods, and hyphens'
    ),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password should be longer than 8 characters')
];

export default signUpValidationRule;
