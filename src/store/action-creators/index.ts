import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import {
  ISetProjectData,
  IAddTask,
  IAddComment,
  IAddSubComment,
  IUpdateTask,
  IUpdateSubTask,
  IAddSubTask,
  IUpdateCategories,
  IMoveTaskFrom,
  IMoveTaskTo,
} from "../actions";
import {
  ITask,
  IComment,
  IProject,
  ISubTask,
  ICategory,
} from "../../assets/types/types";

export const setProjects = (payload: IProject[]) => {
  return (dispatch: Dispatch<ISetProjectData>) => {
    dispatch({
      type: ActionType.setProjectsData,
      payload: payload,
    });
  };
};
export const updateCategories = (payload: ICategory[]) => {
  return (dispatch: Dispatch<IUpdateCategories>) => {
    dispatch({
      type: ActionType.updateCategories,
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
export const addSubComment = (payload: IComment) => {
  return (dispatch: Dispatch<IAddSubComment>) => {
    dispatch({
      type: ActionType.addSubComment,
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
export const moveTaskTo = (payload: ITask) => {
  return (dispatch: Dispatch<IMoveTaskTo>) => {
    dispatch({
      type: ActionType.moveTaskTo,
      payload: payload,
    });
  };
};
export const moveTaskFrom = (payload: ITask) => {
  return (dispatch: Dispatch<IMoveTaskFrom>) => {
    dispatch({
      type: ActionType.moveTaskFrom,
      payload: payload,
    });
  };
};
