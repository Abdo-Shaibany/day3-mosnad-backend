import express from 'express';

import schemaErrorHandler from 'src/middleware/schema-error';


import { loginValidation, resetPasswordValidation, singupValidation } from 'src/validation-schemas/auth';
import { login } from 'src/controllers/auth';

const router = express.Router();

router.post(
    '/login',
    loginValidation,
    schemaErrorHandler,
    login,
);

router.post(
    '/signup',
    singupValidation,
    schemaErrorHandler,
);

router.post(
    '/resetPassword',
    resetPasswordValidation,
    schemaErrorHandler,
);

export default router;
