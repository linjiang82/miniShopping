import rootReducer from "../reducers/rootReducer";
export const FETCH_DETAIL = "fetchDetail";
export const FETCH_COURSE = "fetchCourse";
// export const UPDATE_COURSE = "updateCourse";
export const LOGIN_OK = "loginOk";
export const LOGOUT_OK = "logouOk";
export const SET_CATID = "setCatId";
export const SET_KEYWORD = "setKeyword";

export interface TDetail {
  Content: string[];
  Prerequisite: string;
  Tuition: number;
  MorePics: string[];
}
export interface TCourse {
  id: string;
  thumbURL: string;
  name: string;
  author: string;
  description: string;
  rate: number;
  price: number;
  category: firebase.firestore.DocumentReference;
}
export interface TFetchDetailAction {
  type: typeof FETCH_DETAIL;
  data: any;
}
export interface TFetchCourseAction {
  type: typeof FETCH_COURSE;
  data: any;
}
// export type TCourseCombinedAction = TFetchCourseAction | TUpdateCourseAction;

export interface TSearch {
  catId: string | null;
  keyword: string | null;
}
export interface TSetCatIdAction {
  type: typeof SET_CATID;
  catId: string | null;
}
export interface TSetKeywordAction {
  type: typeof SET_KEYWORD;
  keyword: string;
}
export type TSearchCombinedAction = TSetCatIdAction | TSetKeywordAction;

export interface TLogin {
  isLogin: boolean;
  user: firebase.User | null;
}

export interface TLoginAction {
  type: typeof LOGIN_OK;
  user: firebase.User;
}
export interface TLogoutAction {
  type: typeof LOGOUT_OK;
}

export type TLoginCombinedAction = TLoginAction | TLogoutAction;

export type TRootReducer = ReturnType<typeof rootReducer>;
