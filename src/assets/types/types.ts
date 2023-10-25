import { DroppableProvided } from "react-beautiful-dnd";
import { Editor } from "tinymce";

export interface IProject {
  title: string;
  project_id: string;
  endDate: string | boolean;
  categories: ICategory[];
}
export interface ICategory {
  project_id: string;
  category_id: string;
  title: string;
  tasks: ITask[];
}
export interface ITask {
  project_id: string | undefined;
  category_id: string | undefined;
  task_id: string;
  task_number: string;
  title: string;
  description: string;
  weight: number;
  priority: string;
  devStartTime: string | boolean;
  endDate: string | boolean;
  attached?: string;
  subtasks: ISubTask[];
  comments: IComment[];
}
export interface ITaskColumn {
  title: string;
  category_id: string;
  provided: DroppableProvided;
}

export interface IComment {
  project_id: string | undefined;
  category_id: string | undefined;
  task_id: string;
  comment_id: string;
  parent_id: string | null;
  content: string;
  comments?: IComment[];
}
export interface ISubTask {
  project_id: string | undefined;
  category_id: string | undefined;
  task_id: string;
  subtask_id: string;
  subtask_number: string;
  content: string;
  endDate: string | boolean;
  done?: boolean;
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
  category_id?: string;
  isOpen: boolean;
  onClose: () => void;
}
export interface IInput {
  id: string;
  type: string;
  defaultValue: string;
  className?: string;
  endDate?: string | boolean;
  placeholder?: string;
  labelValue?: string;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onfocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface ISelect {
  labelValue?: string;
  defaultValue?: string;
  className?: string;
  onchange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export interface ITextEditor {
  project_id?: string | undefined;
  task_id?: string;
  category_id?: string;
  subtask_id?: string;
  subtask_number?: string;
  defaultValue: string;
  labelValue?: string;
  endDate?: string | boolean;
  done?: boolean;
  onchange?: (a: string, editor: Editor) => void;
}
export interface ITextArea {
  id: string;
  type?: string;
  defaultValue: string;
  className?: string;
  placeholder?: string;
  endDate?: string | boolean;
  oninput?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onfocus?: (event: React.ChangeEventHandler<HTMLTextAreaElement>) => void;
}
export interface IButton {
  title: string;
  className?: string;
  click?: () => void;
}
