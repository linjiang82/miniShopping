import {
  TLogin,
  TLoginCombinedAction,
  LOGIN_OK,
  LOGOUT_OK,
} from "../types/types";

const initState: TLogin = {
  isLogin: false,
  user: null,
};

const loginReducer = (
  state: TLogin = initState,
  actions: TLoginCombinedAction
): TLogin => {
  switch (actions.type) {
    case LOGIN_OK:
      state = { ...state, isLogin: true, user: actions.user };
      return state;
    case LOGOUT_OK:
      state = { ...state, isLogin: false, user: null };
      return state;
    default:
      return state;
  }
};
export default loginReducer;
