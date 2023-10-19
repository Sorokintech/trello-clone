import { combineReducers } from "redux";
import projectsDataReducer from "./projectsData";

const reducers = combineReducers({
  projectData: projectsDataReducer,
});
export default reducers;

export type State = ReturnType<typeof reducers>;
