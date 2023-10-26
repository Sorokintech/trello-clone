import {
  IProject,
  ITask,
  IComment,
  ISubTask,
  ICategory,
} from "../../assets/types/types";
import { ActionType } from "../action-types";

export interface ISetProjectData {
  type: ActionType.setProjectsData;
  payload: IProject[];
}
export interface IUpdateCategories {
  type: ActionType.updateCategories;
  payload: ICategory[];
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
export interface IMoveTaskTo {
  type: ActionType.moveTaskTo;
  payload: ITask;
}
export interface IMoveTaskFrom {
  type: ActionType.moveTaskFrom;
  payload: ITask;
}
export interface IUpdateCategory {
  type: ActionType.updateCategory;
  payload: ICategory;
}
