import { combineReducers } from "redux";
import currentTaskReducer from "./setCurrentTask";
import projectsDataReducer from "./projectsData";

const reducers = combineReducers({
  currentTask: currentTaskReducer,
  projectData: projectsDataReducer,
});
export default reducers;

export type State = ReturnType<typeof reducers>;
