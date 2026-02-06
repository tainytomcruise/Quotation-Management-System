import express from 'express';
import {
  createQuotation,
  getCustomerQuotations,
  getQuotation,
  updateQuotationStatus,
  deleteQuotation,
  getAllQuotations
} from '../controllers/quotationController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Customer routes
router.post('/', auth, createQuotation);
router.get('/my-quotations', auth, getCustomerQuotations);
router.get('/:id', auth, getQuotation);

// Admin routes
router.get('/', auth, adminAuth, getAllQuotations);
router.patch('/:id/status', auth, adminAuth, updateQuotationStatus);
router.delete('/:id', auth, adminAuth, deleteQuotation);

export default router;
