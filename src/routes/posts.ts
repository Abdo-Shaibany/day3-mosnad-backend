import express from 'express';

import schemaErrorHandler from 'src/middleware/schema-error';

import { validatePagedRequest } from 'src/validation-schemas/get_request';
import auth from 'src/middleware/auth';
import { createPost, deletePost, getPostById, getPostsPaged } from 'src/controllers/posts';
import { createPostValidation, updatePostValidation } from 'src/validation-schemas/post';

const router = express.Router();


router.post(
  '/getPaged',
  auth,
  validatePagedRequest,
  schemaErrorHandler,
  getPostsPaged
);

router.get('/:id', auth, getPostById);

router.post(
  '/',
  auth,
  createPostValidation,
  schemaErrorHandler,
  createPost
);

router.put(
  '/',
  auth,
  updatePostValidation,
  schemaErrorHandler,
  updatePostValidation
);

router.delete('/:id', auth, deletePost);
export default router;
