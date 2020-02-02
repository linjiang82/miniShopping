import React from 'react'
import {TCourse} from '../types/types'
import {Link} from 'react-router-dom'
import './Course.css'

class Course extends React.Component<{data:TCourse}>{
  render(){
    return <Link to={`/detail/${this.props.data.id}`}>
    <div className='course' id = {this.props.data.id} onClick={(e)=>{console.log(e.currentTarget.id)}}>
      <img className ='image' src={this.props.data.thumbURL} alt='thumbnail'></img>
      <div>{this.props.data.name}</div>
      <div>{this.props.data.author}</div>
      <div>{this.props.data.description}</div>
      <div>{this.props.data.rate}</div>
      </div>
      </Link>
  }
}

export default Course