import mongoose, { Schema } from 'mongoose';
import { BatchRegistrationStatus } from './batch.constant';
import { TBatch } from './batch.interface';

const batchSchema = new mongoose.Schema<TBatch>(
  {
    title: {
      type: String,
      required: [true, 'Batch title is required'],
    },
    course: {
      type: Schema.Types.ObjectId,
      required: [true, 'Course id is required'],
      ref: 'Course',
    },
    status: {
      type: String,
      enum: BatchRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    mentor: {
      type: Schema.Types.ObjectId,
      required: [true, 'Mentor id is required'],
      ref: 'Mentor',
    },
  },
  {
    timestamps: true,
  },
);

export const Batch = mongoose.model<TBatch>('Batch', batchSchema);
