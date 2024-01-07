/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TBatchStudent } from './batchStudent.interface';
import { BatchStudent } from './batchStudent.model';

const createBatchStudentIntoDB = async (payload: TBatchStudent) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */

  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const result = await BatchStudent.create(payload);
  return result;
};

const getAllBatcheStudentsFromDB = async (query: Record<string, unknown>) => {
  const batchQuery = new QueryBuilder(
    BatchStudent.find().populate('Batch').populate('Student'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await batchQuery.modelQuery;
  return result;
};

const getSingleBatchStudentFromDB = async (id: string) => {
  const result = await BatchStudent.findById(id)
    .populate('Batch')
    .populate('Student');

  return result;
};

const updateBatchStudentIntoDB = async (
  id: string,
  payload: Partial<TBatchStudent>,
) => {
  /**
   * Step1: Check if the semester is exist
   * Step2: Check if the requested registered semester is exists
   * Step3: If the requested semester registration is ended, we will not update anything
   * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
   * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
   * Step6: If the requested semester registration is 'ENDED' , we will not update anything
   *
   * UPCOMING --> ONGOING --> ENDED
   *
   */

  // check if the requested registered semester is exists
  // check if the semester is already registered!
  const result = await BatchStudent.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBatchStudentFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();
    const deletedBatch = await BatchStudent.findByIdAndDelete(id, {
      session,
      new: true,
    });

    if (!deletedBatch) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return null;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const BatchStudentService = {
  createBatchStudentIntoDB,
  getAllBatcheStudentsFromDB,
  getSingleBatchStudentFromDB,
  updateBatchStudentIntoDB,
  deleteBatchStudentFromDB,
};
