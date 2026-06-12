import express from 'express';
import cors from 'cors';

import { settingsRoutes } from './routes/settings.routes';
import { tasksRoutes } from './routes/tasks.routes';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/settings', settingsRoutes);
app.use('/tasks', tasksRoutes);