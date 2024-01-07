import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BatchStudentService } from './batchStudent.service';

const createBatchstudent = catchAsync(async (req: Request, res: Response) => {
  const result = await BatchStudentService.createBatchStudentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch is created successfully!',
    data: result,
  });
});

const getAllBatcheStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await BatchStudentService.getAllBatcheStudentsFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch is retrieved successfully !',
    data: result,
  });
});

const getSingleBatchStudent = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await BatchStudentService.getSingleBatchStudentFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Batch is retrieved successfully',
      data: result,
    });
  },
);

const updateBatchStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BatchStudentService.updateBatchStudentIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch is updated successfully',
    data: result,
  });
});

const deleteBatchStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BatchStudentService.deleteBatchStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch is updated successfully',
    data: result,
  });
});

export const BatchStudentController = {
  createBatchstudent,
  getAllBatcheStudents,
  getSingleBatchStudent,
  updateBatchStudent,
  deleteBatchStudent,
};
