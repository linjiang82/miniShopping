import { Increment, Decrement, addSubOne } from "../types/types";

export const addOne = (step: number): addSubOne => ({
  type: Increment,
  step
});
export const subOne = (step: number): addSubOne => ({
  type: Decrement,
  step
});
