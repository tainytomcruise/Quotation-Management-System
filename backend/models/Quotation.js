import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer ID is required']
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Phone is required']
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true
    },
    requirementDescription: {
      type: String,
      required: [true, 'Requirement description is required'],
      minlength: [10, 'Description must be at least 10 characters']
    },
    budget: {
      type: Number,
      required: [true, 'Budget is required'],
      min: [0, 'Budget must be a positive number']
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

// Index for faster queries
quotationSchema.index({ customerId: 1 });
quotationSchema.index({ status: 1 });
quotationSchema.index({ createdAt: -1 });

export default mongoose.model('Quotation', quotationSchema);
