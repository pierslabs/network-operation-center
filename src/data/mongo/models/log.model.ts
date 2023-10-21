import mongoose from 'mongoose';

export const logSchema = new mongoose.Schema(
  {
    level: { type: String, required: true, enum: ['low', 'medium', 'high'] },
    message: { type: String, required: true },
    origin: { type: String, required: true },
    timestamp: { type: Date, required: true, default: new Date() },
  },
  { timestamps: true }
);

export const logModel = mongoose.model('Log', logSchema);
