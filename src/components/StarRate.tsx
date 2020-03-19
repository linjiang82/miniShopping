import React from 'react'
import styles from './StarRate.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";

const StarRate:React.FC<{rate:number}>=(props)=>{
  return <FontAwesomeIcon icon={faStar} className={styles.icon} size='xs'></FontAwesomeIcon>
}

export default StarRate;