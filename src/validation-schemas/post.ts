import { check, ValidationChain } from 'express-validator';

// Create validation
export const createPostValidation = [
    check('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string'),
    check('content')
        .notEmpty()
        .withMessage('Content is required')
        .isString()
        .withMessage('Content must be a string'),
    check('category')
        .notEmpty()
        .withMessage('Category is required')
        .isString()
        .withMessage('Category must be a string'),
    check('imageId')
        .optional()
        .isInt()
        .withMessage('Image ID must be an integer'),
];

// Update validation
export const updatePostValidation = [
    check('title')
        .optional()
        .isString()
        .withMessage('Title must be a string'),
    check('content')
        .optional()
        .isString()
        .withMessage('Content must be a string'),
    check('id')
        .isInt()
        .withMessage('ID must be an integer'),
    check('category')
        .optional()
        .isString()
        .withMessage('Category must be a string'),
    check('imageId')
        .optional()
        .isInt()
        .withMessage('Image ID must be an integer'),
];