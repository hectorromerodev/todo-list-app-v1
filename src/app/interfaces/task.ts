export interface Task {
  priority: string;
  title: string;
  progress: number;
  // Just for debug I need to cleanup the code later 🔽
  userId?: string;
  id?: string;
  completed?: boolean;
}

