import { ActionType } from "../action-types";
import { ISetCurrentTaskAction } from "../actions/index";

const initialState = {
  category: "",
  createDate: "",
  devTime: "",
  endDate: "",
  priority: "",
  status: "",
  task_id: "",
  task_number: "",
  title: "",
};

const currentTaskReducer = (
  state = initialState,
  action: ISetCurrentTaskAction
) => {
  switch (action.type) {
    case ActionType.SetCurrent:
      const data = action.payload;
      return {
        ...data,
      };
    default:
      return state;
  }
};
export default currentTaskReducer;
