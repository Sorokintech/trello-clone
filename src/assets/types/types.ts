export interface IProject {
  title: string;
  project_id: string;
  tasks: ITask[];
}
export interface ITask {
  project_id: string | undefined;
  category: string;
  task_id: string;
  task_number: string;
  title: string;
  description: string;
  priority: string;
  createDate: string;
  createTime: string;
  devStartTime: string;
  endDate: string;
  status: string;
  subtasks: ISubTask[];
  comments: IComment[];
}
export interface ITaskColumn {
  title: string;
  id: string;
}

export interface IComment {
  project_id: string | undefined;
  task_id: string;
  comment_id: string;
  content: string;
  createDate?: string;
}
export interface ISubTask {
  project_id: string | undefined;
  task_id: string;
  subtask_id: string;
  content: string;
  createDate?: string;
  done: boolean;
}
// export interface ICommentSection {
//   commentId: string;
//   content: string;
// }
// export interface ISubTask {
//   subtask_id: string;
//   content: string;
//   done: boolean;
// }
export interface IModalProps {
  task_id?: string;
  isOpen: boolean;
  onClose: () => void;
}
export interface IInput {
  id: string;
  type: string;
  defaultV: string;
  className?: string;
  placeholder?: string;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface IButton {
  title: string;
  className?: string;
  click?: () => void;
}
