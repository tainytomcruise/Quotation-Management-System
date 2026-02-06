import Quotation from '../models/Quotation.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateQuotationRequest } from '../middleware/validation.js';

// Create quotation (Customer)
export const createQuotation = asyncHandler(async (req, res) => {
  const { name, email, phone, company, requirementDescription, budget } = req.body;

  const validation = validateQuotationRequest({
    name,
    email,
    phone,
    company,
    requirementDescription,
    budget
  });

  if (!validation.isValid) {
    return res.status(400).json({ errors: validation.errors });
  }

  const quotation = new Quotation({
    customerId: req.userId,
    name,
    email,
    phone,
    company,
    requirementDescription,
    budget
  });

  await quotation.save();

  res.status(201).json({
    message: 'Quotation created successfully',
    quotation
  });
});

// Get customer quotations
export const getCustomerQuotations = asyncHandler(async (req, res) => {
  const quotations = await Quotation.find({ customerId: req.userId }).sort({ createdAt: -1 });

  res.status(200).json({
    count: quotations.length,
    quotations
  });
});

// Get single quotation
export const getQuotation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const quotation = await Quotation.findById(id);

  if (!quotation) {
    return res.status(404).json({ message: 'Quotation not found' });
  }

  // Ensure customer can only view their own quotations
  if (quotation.customerId.toString() !== req.userId && req.userRole !== 'Admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  res.status(200).json({ quotation });
});

// Update quotation status (Admin only)
export const updateQuotationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const quotation = await Quotation.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!quotation) {
    return res.status(404).json({ message: 'Quotation not found' });
  }

  res.status(200).json({
    message: 'Quotation status updated',
    quotation
  });
});

// Delete quotation (Admin only)
export const deleteQuotation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const quotation = await Quotation.findByIdAndDelete(id);

  if (!quotation) {
    return res.status(404).json({ message: 'Quotation not found' });
  }

  res.status(200).json({ message: 'Quotation deleted successfully' });
});

// Get all quotations (Admin only)
export const getAllQuotations = asyncHandler(async (req, res) => {
  const quotations = await Quotation.find()
    .populate('customerId', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json({
    count: quotations.length,
    quotations
  });
});
