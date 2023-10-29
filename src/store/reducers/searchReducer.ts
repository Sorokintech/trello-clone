import { ActionType } from "../action-types";
import { IUpdateSearch } from "../actions/index";

const initialState: String = "";

const searchReducer = (state = initialState, action: IUpdateSearch) => {
  switch (action.type) {
    case ActionType.updateSearch:
      const data = action.payload;
      return data;

    default:
      return state;
  }
};
export default searchReducer;
