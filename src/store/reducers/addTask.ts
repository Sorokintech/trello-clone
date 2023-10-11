import { useSelector } from "react-redux";
import { ITask } from "../../assets/types/types";
import { ActionType } from "../action-types";
import { IAddTask } from "../actions/index";

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

const addTaskReducer = (state = initialState, action: IAddTask) => {
  switch (action.type) {
    case ActionType.addTask:
      const data = action.payload;
      return {
        ...data,
      };
    default:
      return state;
  }
};
export default addTaskReducer;
