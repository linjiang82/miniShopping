import React from 'react'
import Course from './Course'
import {connect} from 'react-redux'
import {TCourse, TRootReducer} from '../types/types'
import { db } from '../firebase/config'
import { fetchCourses } from '../actions/action'
import store from '../store';
import './Courses.css'

 interface myProps {
  courses:TCourse[];
}
class Courses extends React.Component<myProps>{
  componentDidMount(){
    db.collection('Courses').get().then((snapshot)=>snapshot.forEach(doc=>store.dispatch(fetchCourses({...doc.data(),id:doc.id})))).catch(e=>console.log("error"+e));
    // (async ()=> { const data = await db.collection('Courses').get(); 
    //             const items = await data.forEach(doc=>{console.log(doc.data())})})()
  }
  render(){
    let courses:JSX.Element[]=[];
    this.props.courses.map(course=>courses.push(<Course key={course.id} data={course}></Course>))
   if(this.props.courses.length>0) 
   console.log(this.props.courses.length) 
    return <div className='flexCtn'>
      { courses }
    </div>
  }
}

const mapStateToProps = (state: TRootReducer ):myProps => {
  return { courses: state.courses,}
  
}

export default connect(mapStateToProps)(Courses)