import { createContext, type Dispatch } from 'react';
import { initialTaskState } from './initialTaskState';
import type { TaskStateModel } from '../../models/TaskStateModel';
import type { TaskActionModel } from './taskActions';

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: Dispatch<TaskActionModel>;
  isLoadingSettings: boolean;
  isLoadingTasks: boolean;
};

const initialContextValue = {
  state: initialTaskState,
  dispatch: () => {},
  isLoadingSettings: false,
  isLoadingTasks: false,
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
