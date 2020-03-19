import React, { RefObject } from 'react'
import {TCourse} from '../types/types'
import {Link} from 'react-router-dom'
import styles from './Course.module.scss'
import StarRate from './StarRate'

// class Course extends React.Component<{data:TCourse}>{
//   render(){
//     return <Link to={`/detail/${this.props.data.id}`}>
//     <div className={ styles.course } id = {this.props.data.id} onClick={(e)=>{console.log(e.currentTarget.id)}}>
//       <img className ={ styles.image } src={this.props.data.thumbURL} alt='thumbnail'></img>
//       <div>{this.props.data.name}</div>
//       <div>{this.props.data.author}</div>
//       <div>{this.props.data.description}</div>
//       <div>{this.props.data.rate}</div>
//       </div>
//       </Link>
//   }
// }

const Course:React.FC<{data:TCourse;handleQuicklook:(e:React.MouseEvent<HTMLDivElement>)=>void}> = (props)=>{
  const quicklookRef = React.useRef<HTMLDivElement>(null);
    return <div className={styles.outer}>
    <Link to={`/detail/${props.data.id}`} className={styles.main}>
    <div className={ styles.course } id = {props.data.id} onMouseEnter={(e)=>{if(e.currentTarget.id===`${props.data.id}`)quicklookRef.current?.classList.remove(styles.showQuicklook);}} onMouseLeave={(e)=>{if(e.currentTarget.id===`${props.data.id}`)quicklookRef.current?.classList.add(styles.showQuicklook);}}>
      <img className ={ styles.image } src={props.data.thumbURL} alt='thumbnail'></img>
      <div ref={quicklookRef} id = {props.data.id} className={`${styles.quicklook} ${styles.showQuicklook}`} onClick={(e)=>{e.preventDefault(); props.handleQuicklook(e);}}>Quick Look</div>
      <div className={styles.price}>$0.00</div>
      <div className={styles.name}>{props.data.name}</div>
      <div className={styles.author}>{props.data.author}</div>
      <div className={styles.rate}>{props.data.rate} 
      <StarRate rate={props.data.rate}></StarRate>      
      <span> 12</span></div>
      </div>
      </Link>
      </div>
}

export default Course
