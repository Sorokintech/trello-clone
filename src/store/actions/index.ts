import { ITask } from "../../components/Task/Task";
import { ActionType } from "../action-types";

export interface ISubTaskAction {
  type: ActionType.ADD;
}
export interface ISetCurrentTaskAction {
  type: ActionType.SetCurrent;
  payload: ITask;
}
