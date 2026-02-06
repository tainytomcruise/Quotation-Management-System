import Quotation from '../models/Quotation.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const total = await Quotation.countDocuments();
  const pending = await Quotation.countDocuments({ status: 'Pending' });
  const approved = await Quotation.countDocuments({ status: 'Approved' });
  const rejected = await Quotation.countDocuments({ status: 'Rejected' });

  res.status(200).json({
    stats: {
      total,
      pending,
      approved,
      rejected
    }
  });
});
