import { Types } from 'mongoose';
import { TBatch } from '../batch/batch.interface';

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  batches: Array<TBatch>;
  isDeleted?: boolean;
  preRequisiteCourses: [TPreRequisiteCourses];
};

export type TCourseMentor = {
  course: Types.ObjectId;
  mentors: [Types.ObjectId];
};
