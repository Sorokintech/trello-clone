import { IProject } from "../../assets/types/types";
import { ActionType } from "../action-types";
import { ISetProjectData } from "../actions/index";

const initialState: IProject[] = [];

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
