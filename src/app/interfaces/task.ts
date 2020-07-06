import { TaskList } from './task-list';

export interface Task {
  id: number;
  priority: string;
  title: string;
  progress: number;
  taskItems?: TaskList[];
}

