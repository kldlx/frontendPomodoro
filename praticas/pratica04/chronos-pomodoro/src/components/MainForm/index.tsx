import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef, useState } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';
import {
  createTask,
  interruptTask,
} from '../../services/tasksService';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isInterruptingTask, setIsInterruptingTask] = useState(false);
  const isTaskActionInProgress = isCreatingTask || isInterruptingTask;
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  async function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn('Digite o nome da tarefa');
      return;
    }

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCyleType = getNextCycleType(nextCycle);

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCyleType],
      type: nextCyleType,
    };

    setIsCreatingTask(true);
    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    showMessage.success('Tarefa iniciada');

    try {
      await createTask(newTask, { notifyOnError: false });
    } catch {
      return;
    } finally {
      setIsCreatingTask(false);
    }
  }

  async function handleInterruptTask() {
    showMessage.dismiss();

    if (!state.activeTask) return;

    const activeTaskId = state.activeTask.id;
    const interruptDate = Date.now();

    setIsInterruptingTask(true);
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
    showMessage.warn('Tarefa interrompida!');

    try {
      await interruptTask(activeTaskId, interruptDate, {
        notifyOnError: false,
      });
    } catch {
      return;
    } finally {
      setIsInterruptingTask(false);
    }
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <DefaultInput
          labelText='task'
          id='meuInput'
          type='text'
          placeholder='Digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask || isTaskActionInProgress}
          defaultValue={lastTaskName}
        />
      </div>

      <div className='formRow'>
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask && (
          <DefaultButton
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
            disabled={isTaskActionInProgress}
          />
        )}

        {!!state.activeTask && (
          <DefaultButton
            aria-label='Interromper tarefa atual'
            title='Interromper tarefa atual'
            type='button'
            color='red'
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
            key='botao_button'
            disabled={isTaskActionInProgress}
          />
        )}
      </div>
    </form>
  );
}
