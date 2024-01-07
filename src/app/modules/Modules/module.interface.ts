import { Types } from 'mongoose';

export type TModule = {
  title: string;
  course: Types.ObjectId;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  startDate: Date;
  endDate: Date;
  mentor: Types.ObjectId;
  createdBy: Types.ObjectId;
};
