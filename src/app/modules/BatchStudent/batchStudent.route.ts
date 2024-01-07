import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BatchStudentController } from './batchStudent.controller';
import { BatchStudentValidations } from './batchStudent.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', BatchStudentController.getAllBatcheStudents);
router.get('/:id', BatchStudentController.getSingleBatchStudent);

router.post(
  '/create-batch',
  auth('admin', 'superAdmin'),
  validateRequest(BatchStudentValidations.createBatchStudentValidationSchema),
  BatchStudentController.createBatchstudent,
);

router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(BatchStudentValidations.upadateBatchStudentSchema),
  BatchStudentController.updateBatchStudent,
);

router.delete(
  '/:id',
  auth('admin', 'superAdmin'),
  BatchStudentController.deleteBatchStudent,
);

export const batchRoutes = router;
