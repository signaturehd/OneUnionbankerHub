import React, { Component } from 'react'
import PodCardComponent from '../../../common/components/PodCardComponent/PodCardComponent'
import MedPlayer from '../../components/player/MedPlayer'
import Rating from 'react-rating'
import PropTypes from 'prop-types'
import CommentForm from '../../components/comments/CommentBox'

class PodPlay extends Component {
  constructor (props) {
  super(props)
    this.state = {
      rating : 0
   
   }
   }
  

  podcasts (podcasts) {
      this.setState({ podcasts })
  }

   render () {
     const { title, author, description, news, detail, rateBook } = this.props
     const {rating} = this.state
     return (
      <div className = {'container'}>
       <div className = { 'container-option1' }  >
         
         <div className={'container-option1'}>  <MedPlayer/> </div>
         <h1> Playing Podcast /* Dynamic Title */ </h1>
         <div></div>
         <div><h4> Author of Podcast </h4> </div>

         <center>
           
         </center>
         <div className={'container-option1'}> <CommentForm/> </div>
       </div>
       </div>
     )
   }
 }
 


 PodPlay.propTypes = {
  detail : PropTypes.object,
  onClick : PropTypes.func,
  rateBook : PropTypes.func,

}

PodPlay.defaultProps = {

}



 


 

 export default PodPlay
