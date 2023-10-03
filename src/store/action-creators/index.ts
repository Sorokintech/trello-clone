import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import {
  ISubTaskAction,
  ISetCurrentTaskAction,
  ISetProjectData,
} from "../actions";
import { ITask } from "../../components/Task/Task";
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
