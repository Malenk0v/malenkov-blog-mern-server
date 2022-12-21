import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Email is not valid').isEmail(),
  body('password', 'Password is not valid').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Email is not valid').isEmail(),
  body('password', 'Password is not valid').isLength({ min: 5 }),
  body('fullName', 'Full name is not valid').isLength({ min: 3 }),
  body('avatarUrl', 'Avatar is not valid').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Write title post').isLength({ min: 3 }).isString(),
  body('text', 'Write text post').isLength({ min: 3 }).isString(),
  body('tags', 'Tags is not valid').optional().isString(),
  body('imageUrl', 'Url image is not valid').optional().isString(),
];
