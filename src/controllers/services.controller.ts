import type { Request, Response } from 'express';
import { createServiceSchema } from '../validators/services.validator';
import { prisma } from '../lib/prisma';

export async function createService(req: Request, res: Response) {
  const parsed = createServiceSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const { name, type, durationMinutes } = parsed.data;

  try {
    const service = await prisma.service.create({
      data: { name, type, durationMinutes, providerId: req.user.userId },
      select: { id: true, name: true, type: true, durationMinutes: true },
    });

    return res.status(201).json(service);
  } catch (err) {
    console.error('[POST /services]', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
