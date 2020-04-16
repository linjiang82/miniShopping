import {
  FETCH_COURSE,
  FETCH_DETAIL,
  TFetchCourseAction,
  TFetchDetailAction,
  SET_CATID,
  SET_KEYWORD,
  TSetKeywordAction,
  TSetCatIdAction,
} from "../types/types";

export const fetchDetail = (data: any): TFetchDetailAction => ({
  type: FETCH_DETAIL,
  data,
});
export const fetchCourses = (data: any): TFetchCourseAction => ({
  type: FETCH_COURSE,
  data,
});
export const passCatId = (catId: string | null): TSetCatIdAction => ({
  type: SET_CATID,
  catId,
});
export const passKeyword = (keyword: string): TSetKeywordAction => ({
  type: SET_KEYWORD,
  keyword,
});
