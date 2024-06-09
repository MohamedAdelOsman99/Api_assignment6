// routes/authRoutes.js

import express from 'express';
import { loginUser } from '../../../controller/auth/login/loginController.js';
import { validatorLogin } from '../../../utils/validator/auth/login/loginValidator.js';

const router = express.Router();

router.post("/", validatorLogin, loginUser);

export default router;
