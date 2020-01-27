import React from 'react';
import {Dispatch, bindActionCreators} from 'redux';
import {addOne,subOne} from '../actions/action';
import {connect} from 'react-redux';

type MyProps = StateProps & DispatchProps;
class Counter extends React.Component<MyProps> {
  constructor(props: MyProps) {
    super(props);
  }
  render() {
    console.log(this.props);
       return (
      <div>
        <div>{this.props.counter}</div>
        <div onClick={() => this.props.disAddOne(3)}>+</div>
        <div onClick={() => this.props.disSubOne(3)}>-</div>
      </div>
    );
  }
}

interface StateProps {
  counter: number;
}
interface DispatchProps {
  disAddOne: (step: number) => void;
  disSubOne: (step: number) => void;
}
const mapStateToProps = (state: any): StateProps => ({
  counter: state.counter,
});
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  disAddOne: bindActionCreators(addOne, dispatch),
  disSubOne: bindActionCreators(subOne, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
