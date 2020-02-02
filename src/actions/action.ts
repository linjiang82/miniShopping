import {
  FETCH_COURSE,
  FETCH_DETAIL,
  TFetchCourseAction,
  TFetchDetailAction
} from "../types/types";

export const fetchDetail = (data: any): TFetchDetailAction => ({
  type: FETCH_DETAIL,
  data
});
export const fetchCourses = (data: any): TFetchCourseAction => ({
  type: FETCH_COURSE,
  data
});
