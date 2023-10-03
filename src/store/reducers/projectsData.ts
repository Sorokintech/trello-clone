import { ActionType } from "../action-types";
import { ISetProjectData } from "../actions/index";

const initialState = [
  {
    title: "",
    projectId: "",
    tasks: {
      category: "",
      createDate: "",
      devTime: "",
      endDate: "",
      priority: "",
      status: "",
      task_id: "",
      task_number: "",
      title: "",
    },
  },
];

const projectsDataReducer = (state = initialState, action: ISetProjectData) => {
  switch (action.type) {
    case ActionType.SetProjectsData:
      const data = action.payload;
      return [...data];
    default:
      return state;
  }
};
export default projectsDataReducer;
