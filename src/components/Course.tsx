import React from 'react'
import {MyProps} from '../types/types'

class Course extends React.Component<MyProps>{
  render(){
    return <div>{this.props.title}</div>
  }
}

export default Course