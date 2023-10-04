import { ITask } from "../../assets/types/types";
import { ActionType } from "../action-types";
import { ISetCurrentTaskAction } from "../actions/index";

const initialState: ITask = {
  category: "",
  createDate: "",
  devTime: "",
  endDate: "",
  priority: "",
  status: "",
  task_id: "",
  task_number: "",
  title: "",
  description: "",
  subtasks: [],
  comments: [],
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
