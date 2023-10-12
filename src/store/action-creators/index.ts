import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import {
  ISetCurrentTaskAction,
  ISetProjectData,
  IAddTask,
  IAddComment,
  IUpdateTask,
  IUpdateSubTask,
  IAddSubTask,
} from "../actions";
import { ITask, IComment, IProject, ISubTask } from "../../assets/types/types";

export const editTask = (payload: ITask) => {
  return (dispatch: Dispatch<ISetCurrentTaskAction>) => {
    dispatch({
      type: ActionType.setCurrentTask,
      payload: payload,
    });
  };
};
export const setProjects = (payload: IProject[]) => {
  return (dispatch: Dispatch<ISetProjectData>) => {
    dispatch({
      type: ActionType.setProjectsData,
      payload: payload,
    });
  };
};
export const addComment = (payload: IComment) => {
  return (dispatch: Dispatch<IAddComment>) => {
    dispatch({
      type: ActionType.addComment,
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
export const updateTask = (payload: ITask) => {
  return (dispatch: Dispatch<IUpdateTask>) => {
    dispatch({
      type: ActionType.updateTask,
      payload: payload,
    });
  };
};
export const addSubTask = (payload: ISubTask) => {
  return (dispatch: Dispatch<IAddSubTask>) => {
    dispatch({
      type: ActionType.addSubTask,
      payload: payload,
    });
  };
};
export const updateSubTask = (payload: ISubTask) => {
  return (dispatch: Dispatch<IUpdateSubTask>) => {
    dispatch({
      type: ActionType.updateSubTask,
      payload: payload,
    });
  };
};
