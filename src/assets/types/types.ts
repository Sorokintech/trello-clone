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
  createTime: string;
  devStartTime: string;
  endDate: string;
  status: string;
  subtasks: ISubTask[];
  comments: ICommentSection[];
}
export interface ICommentSection {
  commentId: string;
  content: string;
}
export interface ISubTask {
  subTaskId: string;
  content: string;
  done: boolean;
}
export interface IModalProps {
  id?: string;
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
