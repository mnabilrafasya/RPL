// File: server/routes/auth.js
import express from 'express';
import { loginAdmin, logoutAdmin, getAdminProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.delete('/logout', logoutAdmin);
router.get('/me', getAdminProfile);

export default router;
