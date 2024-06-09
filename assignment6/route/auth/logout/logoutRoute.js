// routes/authRoutes.js

import express from 'express';
import { logoutUser } from '../../../controller/auth/logout/logoutController.js';

const router = express.Router();

router.post("/", logoutUser);

export default router;
