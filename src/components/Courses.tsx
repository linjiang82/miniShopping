import React from 'react'
import Course from './Course'
import {connect} from 'react-redux'
import {MyState,MyProps} from '../types/types'

class Courses extends React.Component<MyProps>{
  render(){
    return <div>
    <Course title={this.props.title}></Course>
    </div>
  }
}

const mapStateToProps = (state:MyState ):MyProps => {
  return {
    title: state.title
  }
}

export default connect(mapStateToProps)(Courses)