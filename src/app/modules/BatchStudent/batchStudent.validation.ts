import { z } from 'zod';
import { BatchStudentRegistrationStatus } from './batchStudent.constant';

const createBatchStudentValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    course: z.string(),
    status: z.enum([
      ...(BatchStudentRegistrationStatus as [string, ...string[]]),
    ]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  }),
});

const upadateBatchStudentSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    course: z.string().optional(),
    status: z
      .enum([...(BatchStudentRegistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    mentor: z.string().optional(),
  }),
});

export const BatchStudentValidations = {
  createBatchStudentValidationSchema,
  upadateBatchStudentSchema,
};
