import { z } from 'zod';
import { ServiceType } from '../generated/prisma/enums';

export const createServiceSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  type: z.enum(ServiceType),
  durationMinutes: z
    .number('durationMinutes must be a number')
    .int()
    .min(30, 'Minimum duration is 30 minutes')
    .max(120, 'Maximum duration is 120 minutes')
    .refine((val) => val % 30 === 0, {
      message: 'durationMinutes must be a multiple of 30',
    }),
});
