import { IProject, ITask, IComment } from "../../assets/types/types";
import { ActionType } from "../action-types";

export interface ISetCurrentTaskAction {
  type: ActionType.setCurrentTask;
  payload: ITask;
}
export interface ISetProjectData {
  type: ActionType.setProjectsData;
  payload: IProject[];
}
export interface IAddTask {
  type: ActionType.addTask;
  payload: ITask;
}
export interface IAddComment {
  type: ActionType.addComment;
  payload: IComment;
}
