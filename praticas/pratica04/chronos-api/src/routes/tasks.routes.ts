import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const tasksRoutes = Router();

// CREATE TASK
tasksRoutes.post('/', async (req, res) => {
  try {
    const { id, name, duration, type, startDate } = req.body || {};

    if (!id || !name || !duration || !type || !startDate) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const task = await prisma.task.create({
      data: {
        id,
        name,
        duration: Number(duration),
        type,
        startDate: new Date(startDate),
      },
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET TASKS
tasksRoutes.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        startDate: 'desc',
      },
    });

    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// COMPLETE TASK
tasksRoutes.patch('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const { completeDate } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: {
        completeDate: new Date(completeDate),
      },
    });

    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// INTERRUPT TASK
tasksRoutes.patch('/:id/interrupt', async (req, res) => {
  try {
    const { id } = req.params;
    const { interruptDate } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: {
        interruptDate: new Date(interruptDate),
      },
    });

    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE ALL TASKS
tasksRoutes.delete('/', async (req, res) => {
  try {
    await prisma.task.deleteMany();

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});