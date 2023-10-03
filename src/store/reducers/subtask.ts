import { ActionType } from "../action-types";
import { ISubTaskAction } from "../actions/index";

const initialState = 0;

const subTaskReducer = (
  state: number = initialState,
  action: ISubTaskAction
) => {
  switch (action.type) {
    case ActionType.ADD:
      return state + 1;
    default:
      return state;
  }
};
export default subTaskReducer;
