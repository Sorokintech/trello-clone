import { IProject, ITask, IComment, ISubTask } from "../../assets/types/types";
import { ActionType } from "../action-types";

export interface ISetProjectData {
  type: ActionType.setProjectsData;
  payload: IProject[];
}
export interface IAddComment {
  type: ActionType.addComment;
  payload: IComment;
}
export interface IAddSubComment {
  type: ActionType.addSubComment;
  payload: IComment;
}
export interface IAddTask {
  type: ActionType.addTask;
  payload: ITask;
}
export interface IUpdateTask {
  type: ActionType.updateTask;
  payload: ITask;
}
export interface IAddSubTask {
  type: ActionType.addSubTask;
  payload: ISubTask;
}
export interface IUpdateSubTask {
  type: ActionType.updateSubTask;
  payload: ISubTask;
}
