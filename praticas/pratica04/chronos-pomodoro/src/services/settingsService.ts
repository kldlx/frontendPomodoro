import { api } from './api';
import { showMessage } from '../adapters/showMessage';

export async function getSettings() {
  try {
    const response = await api.get('/settings');

    return response.data;
  } catch (error) {
    showMessage.error('Não foi possível carregar as configurações.');
    throw error;
  }
}

export async function updateSettings(data: {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
}) {
  try {
    const response = await api.put('/settings', data);

    return response.data;
  } catch (error) {
    showMessage.error('Não foi possível salvar as configurações.');
    throw error;
  }
}
