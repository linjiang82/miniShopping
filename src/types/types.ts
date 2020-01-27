export const Increment = "Increment";
export const Decrement = "Decrement";

export interface MyState {
  title: string;
  author: string;
}
export interface MyProps {
  title: string;
}

export interface addSubOne {
  type: typeof Increment | typeof Decrement;
  step: number;
}
