import { ITask } from "../../assets/types/types";
import { ActionType } from "../action-types";
import { ISetCurrentTaskAction } from "../actions/index";

const initialState: ITask = {
  project_id: "",
  category: "",
  createDate: "",
  createTime: "",
  devStartTime: "",
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
    case ActionType.setCurrentTask:
      const data = action.payload;
      return {
        ...data,
      };
    default:
      return state;
  }
};
export default currentTaskReducer;
