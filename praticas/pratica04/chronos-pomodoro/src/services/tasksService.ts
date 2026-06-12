import { api } from './api';
import type { TaskModel } from '../models/TaskModel';
import { showMessage } from '../adapters/showMessage';

type ApiOptions = {
  notifyOnError?: boolean;
};

function shouldNotify(options?: ApiOptions) {
  return options?.notifyOnError !== false;
}

export async function getTasks(options?: ApiOptions) {
  try {
    const response = await api.get('/tasks');

    return response.data;
  } catch (error) {
    if (shouldNotify(options)) {
      showMessage.error('Não foi possível carregar o histórico de tarefas.');
    }
    throw error;
  }
}

export async function createTask(
  task: TaskModel,
  options?: ApiOptions,
) {
  try {
    const response = await api.post('/tasks', task);

    return response.data;
  } catch (error) {
    if (shouldNotify(options)) {
      showMessage.error('Não foi possível iniciar a tarefa.');
    }
    throw error;
  }
}

export async function completeTask(
  id: string,
  completeDate: number,
  options?: ApiOptions,
) {
  try {
    const response = await api.patch(
      `/tasks/${id}/complete`,
      {
        completeDate,
      },
    );

    return response.data;
  } catch (error) {
    if (shouldNotify(options)) {
      showMessage.error('Não foi possível concluir a tarefa.');
    }
    throw error;
  }
}

export async function interruptTask(
  id: string,
  interruptDate: number,
  options?: ApiOptions,
) {
  try {
    const response = await api.patch(
      `/tasks/${id}/interrupt`,
      {
        interruptDate,
      },
    );

    return response.data;
  } catch (error) {
    if (shouldNotify(options)) {
      showMessage.error('Não foi possível interromper a tarefa.');
    }
    throw error;
  }
}

export async function deleteTasks(options?: ApiOptions) {
  try {
    await api.delete('/tasks');
  } catch (error) {
    if (shouldNotify(options)) {
      showMessage.error('Não foi possível apagar o histórico.');
    }
    throw error;
  }
}
