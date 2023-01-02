

import Router from 'express';
import { register, changePassword, changeUsername } from '../controllers/users.controllers';
import {
  validateUsername,
  validateEmail,
  validatePassword } from '../middlewares/users.middlewares';
import validateToken from '../middlewares/validateToken';

const router = Router();

router
  .post(
    '/', 
    validateUsername,
    validateEmail,
    validatePassword,
    register,
  )
  .put('/change-password', validateToken, validatePassword, changePassword)
  .put('/change-username', validateToken, validateUsername, changeUsername);

export default router;