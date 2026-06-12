import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const settingsRoutes = Router();

// GET /settings
settingsRoutes.get('/', async (req, res) => {
  const settings = await prisma.settings.findFirst();

  if (!settings) {
    const defaultSettings = await prisma.settings.create({
      data: {
        workTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15,
      },
    });

    return res.json(defaultSettings);
  }

  return res.json(settings);
});

// PUT /settings
settingsRoutes.put('/', async (req, res) => {
  console.log('BODY RECEBIDO:', req.body); // debug

  const { workTime, shortBreakTime, longBreakTime } = req.body || {};

  if (
    typeof workTime !== 'number' ||
    typeof shortBreakTime !== 'number' ||
    typeof longBreakTime !== 'number'
  ) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const existing = await prisma.settings.findFirst();

  if (!existing) {
    const created = await prisma.settings.create({
      data: { workTime, shortBreakTime, longBreakTime },
    });

    return res.json(created);
  }

  const updated = await prisma.settings.update({
    where: { id: existing.id },
    data: { workTime, shortBreakTime, longBreakTime },
  });

  return res.json(updated);
});