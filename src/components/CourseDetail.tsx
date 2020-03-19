import React from 'react'
import {connect} from 'react-redux'
import {TDetail, TRootReducer, TCourse} from '../types/types'
import {fetchCourses,fetchDetail} from '../actions/action'
import {RouteComponentProps} from 'react-router-dom'
import { db } from '../firebase/config'
import store from '../store';
import styles from './CourseDetail.module.scss'
interface stateProps{
  detail:TDetail|null;
  courses:TCourse[];
}
type ComboProps = stateProps & RouteComponentProps<{id:string}>;
class CourseDetail extends React.Component<ComboProps>{
  componentDidMount(){
    //below to load data from remote when user visit via direct link
    if(this.props.courses.length===0)
        db.collection('Courses').get().then((snapshot)=>snapshot.forEach(doc=>store.dispatch(fetchCourses({...doc.data(),id:doc.id})))).catch(e=>console.log("error"+e));
    ////
    db.collection('Courses').doc(this.props.match.params.id).collection('detail').get().then((snapshot)=>{if(snapshot.docs.length>0)snapshot.forEach(doc=>store.dispatch(fetchDetail(doc.data())))
    }).catch(e=>console.log("error"+e));
    // (async ()=> { const data = await db.collection('Courses').get(); 
    //             const items = await data.forEach(doc=>{console.log(doc.data())})})()
  }
  render(){
   let course = this.props.courses.filter(c=>c.id===this.props.match.params.id);

     if(this.props.detail){
     const {name,author,rate,thumbURL}=course[0];
      const {Content,Tuition,Prerequisite, MorePics}=this.props.detail;
 
    return <div className={ styles.gridCtn }>
     <div className={ styles.name } >{name}</div> 
<div>
       <img className={ styles.image } src={thumbURL} alt='mainImg'></img>
       <img className={ styles.smallImage } src={thumbURL} alt='moreImg'></img>
       {MorePics.map(i=><img className={ styles.smallImage } src={i} alt='moreImg'></img>)}
</div>
     <div className={ styles.author } > Author: {author}</div> 
     <div className={ styles.rate }> Rate: {rate}</div> 
     <div className={ styles.tuition }> Price: ${Tuition}</div> 
     <ul className={ styles.content }>Content: {Content.map(i=><li>{i}</li>)}</ul> 
     <div className={ styles.prerequisite }>Prerequistie: {Prerequisite}</div> 
    </div>}
    else return <div>Loading</div>
  }
}

const mapStateToProps = (state:TRootReducer ):stateProps => {
  return {
    detail:state.detail,
    courses:state.courses,
  }
}

export default connect(mapStateToProps)(CourseDetail)
