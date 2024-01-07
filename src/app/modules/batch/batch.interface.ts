import { Types } from 'mongoose';

export type TBatch = {
  title: string;
  course: Types.ObjectId;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  startDate: Date;
  endDate: Date;
  mentor: Types.ObjectId;
};
