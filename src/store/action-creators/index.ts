import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { ISubTaskAction, ISetCurrentTaskAction } from "../actions";
import { ITask } from "../../components/Task/Task";

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
