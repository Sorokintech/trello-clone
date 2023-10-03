import { combineReducers } from "redux";
import subTaskReducer from "./subtask";
import currentTaskReducer from "./taskedit";
import projectsDataReducer from "./projectsData";

const reducers = combineReducers({
  subtask: subTaskReducer,
  currentTask: currentTaskReducer,
  projectData: projectsDataReducer,
});
export default reducers;

export type State = ReturnType<typeof reducers>;
