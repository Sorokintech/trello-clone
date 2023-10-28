import { combineReducers } from "redux";
import projectsDataReducer from "./projectsData";
import searchReducer from "./searchReducer";

const reducers = combineReducers({
  projectData: projectsDataReducer,
  searchValue: searchReducer,
});
export default reducers;

export type State = ReturnType<typeof reducers>;
