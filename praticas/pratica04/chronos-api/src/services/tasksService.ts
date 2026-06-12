import { api } from './api';
import type { TaskModel } from '../models/TaskModel';

export async function getTasks() {
  const response = await api.get('/tasks');

  return response.data;
}

export async function createTask(task: TaskModel) {
  const response = await api.post('/tasks', task);

  return response.data;
}

export async function completeTask(
  id: string,
  completeDate: number,
) {
  const response = await api.patch(
    `/tasks/${id}/complete`,
    {
      completeDate,
    },
  );

  return response.data;
}

export async function interruptTask(
  id: string,
  interruptDate: number,
) {
  const response = await api.patch(
    `/tasks/${id}/interrupt`,
    {
      interruptDate,
    },
  );

  return response.data;
}

export async function deleteTasks() {
  await api.delete('/tasks');
}