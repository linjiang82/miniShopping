import { TDetail, TFetchDetailAction, FETCH_DETAIL } from "../types/types";

const initState: TDetail | null = null;

const detailReducer = (
  state: TDetail | null = initState,
  actions: TFetchDetailAction
): TDetail | null => {
  switch (actions.type) {
    case FETCH_DETAIL:
      state = { ...state, ...actions.data };
      console.log(state);
      return state;
    default:
      return state;
  }
};
export default detailReducer;
