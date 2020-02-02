import rootReducer from "../reducers/rootReducer";
export const FETCH_DETAIL = "fetchDetail";
export const FETCH_COURSE = "fetchCourse";

export interface TDetail {
  Content: string[];
  Prerequisite: string;
  Tuition: number;
}
export interface TCourse {
  id: string;
  thumbURL: string;
  name: string;
  author: string;
  description: string;
  rate: number;
}
export interface TFetchDetailAction {
  type: typeof FETCH_DETAIL;
  data: any;
}
export interface TFetchCourseAction {
  type: typeof FETCH_COURSE;
  data: any;
}

export type TRootReducer = ReturnType<typeof rootReducer>;
