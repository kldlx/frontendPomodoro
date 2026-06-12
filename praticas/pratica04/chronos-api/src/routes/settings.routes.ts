import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const settingsRoutes = Router();

// GET /settings
settingsRoutes.get('/', async (req, res) => {
  try {
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
  } catch (error) {
    console.error('ERRO AO BUSCAR CONFIGURAÇÕES:', error);

    return res.status(500).json({
      error: 'Erro interno ao buscar configurações',
    });
  }
});

// PUT /settings
settingsRoutes.put('/', async (req, res) => {
  try {
    console.log('BODY RECEBIDO:', req.body);

    const { workTime, shortBreakTime, longBreakTime } = req.body || {};

    if (
      typeof workTime !== 'number' ||
      typeof shortBreakTime !== 'number' ||
      typeof longBreakTime !== 'number'
    ) {
      return res.status(400).json({
        error: 'Invalid payload',
      });
    }

    const existing = await prisma.settings.findFirst();

    console.log('CONFIG EXISTENTE:', existing);

    if (!existing) {
      const created = await prisma.settings.create({
        data: {
          workTime,
          shortBreakTime,
          longBreakTime,
        },
      });

      console.log('CONFIG CRIADA:', created);

      return res.json(created);
    }

    const updated = await prisma.settings.update({
      where: {
        id: existing.id,
      },
      data: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });

    console.log('CONFIG ATUALIZADA:', updated);

    return res.json(updated);
  } catch (error) {
    console.error('ERRO AO SALVAR CONFIGURAÇÕES:', error);

    return res.status(500).json({
      error: 'Erro interno ao salvar configurações',
    });
  }
});