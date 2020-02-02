import React from 'react'
import {connect} from 'react-redux'
import {TDetail, TRootReducer, TCourse} from '../types/types'
import {fetchDetail} from '../actions/action'
import {RouteComponentProps} from 'react-router-dom'
import { db } from '../firebase/config'
import store from '../store';
import './Courses.css'
interface stateProps{
  detail:TDetail|null;
  courses:TCourse[];
}
type ComboProps = stateProps & RouteComponentProps<{id:string}>;
class CourseDetail extends React.Component<ComboProps>{
  componentDidMount(){
    console.log(this.props.match.params.id)
    db.collection('Courses').doc(this.props.match.params.id).collection('detail').get().then((snapshot)=>snapshot.forEach(doc=>store.dispatch(fetchDetail(doc.data())))).catch(e=>console.log("error"+e));
    // (async ()=> { const data = await db.collection('Courses').get(); 
    //             const items = await data.forEach(doc=>{console.log(doc.data())})})()
  }
  render(){
    
  //  if(this.props.courses.length>0) 
 
    return <div className='flexCtn'>
     {this.props.detail?.Content} 
    </div>
  }
}

const mapStateToProps = (state:TRootReducer ):stateProps => {
  return {
    detail:state.detail,
    courses:state.courses,
  }
}

export default connect(mapStateToProps)(CourseDetail)