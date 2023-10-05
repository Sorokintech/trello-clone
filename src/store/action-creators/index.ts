import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import {
  ISubTaskAction,
  ISetCurrentTaskAction,
  ISetProjectData,
  IAddTask,
} from "../actions";
import { ITask } from "../../assets/types/types";
import { IProject } from "../../assets/types/types";

export const addSubTask = () => {
  return (dispatch: Dispatch<ISubTaskAction>) => {
    dispatch({
      type: ActionType.ADD,
    });
  };
};
export const editTask = (payload: ITask) => {
  return (dispatch: Dispatch<ISetCurrentTaskAction>) => {
    dispatch({
      type: ActionType.SetCurrent,
      payload: payload,
    });
  };
};
export const setProjects = (payload: IProject[]) => {
  return (dispatch: Dispatch<ISetProjectData>) => {
    dispatch({
      type: ActionType.SetProjectsData,
      payload: payload,
    });
  };
};
export const addTask = (payload: ITask) => {
  return (dispatch: Dispatch<IAddTask>) => {
    dispatch({
      type: ActionType.addTask,
      payload: payload,
    });
  };
};
