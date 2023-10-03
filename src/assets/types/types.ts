export interface IProject {
  title: string;
  projectId: string;
  tasks: ITask[];
}
export interface ITask {
  category: string;
  task_id: string;
  task_number: string;
  title: string;
  description: string;
  priority: string;
  createDate: string;
  devTime: string;
  endDate: string;
  status: string;
}
