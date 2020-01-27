import { MyState } from "../types/types";

const initState: MyState = {
  title: "xixi",
  author: ""
};

const testReducer = (state: MyState = initState, actions: any): MyState => {
  // switch (actions.type) {
  //   case Increment:
  //     return (state = {...state, counter: state.counter + actions.step});
  //   case Decrement:
  //     return (state = {...state, counter: state.counter - actions.step});
  //   default:
  //     return state;
  // }
  return state;
};
export default testReducer;
