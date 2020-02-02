import { TCourse, TFetchCourseAction, FETCH_COURSE } from "../types/types";

const initState: TCourse[] | null = [];

const courseReducer = (
  state: TCourse[] = initState,
  actions: TFetchCourseAction
): TCourse[] => {
  switch (actions.type) {
    case FETCH_COURSE:
      state = [...state, actions.data];
      console.log(state);
      return state;
    default:
      return state;
  }
};
export default courseReducer;
