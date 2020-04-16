import {
  TSearch,
  TSearchCombinedAction,
  SET_CATID,
  SET_KEYWORD,
} from "../types/types";

const initState: TSearch = {
  catId: null,
  keyword: null,
};

const searchReducer = (
  state: TSearch = initState,
  actions: TSearchCombinedAction
): TSearch => {
  switch (actions.type) {
    case SET_CATID:
      state = { ...state, catId: actions.catId };
      break;
    case SET_KEYWORD:
      state = { ...state, keyword: actions.keyword };
      break;
  }
  return state;
};

export default searchReducer;
