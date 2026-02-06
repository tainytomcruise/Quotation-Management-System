import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', auth, adminAuth, getDashboardStats);

export default router;
