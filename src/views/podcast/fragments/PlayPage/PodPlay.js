import React, { Component } from 'react'
import PodCardComponent from '../../../common/components/PodCardComponent/PodCardComponent'
import CommentForm from '../comments/CommentForm'
import Player from '../player/Player'

class PodPlay extends Component {
  constructor (props) {
    super(props)
   
    }
  


  podcasts (podcasts) {
      this.setState({ podcasts })
  }

   render () {
     const { title, author, description } = this.props
     return (
      <div className = {'container'}>
       <div className = { 'container-option1' }  >
         <h1> Playing Podcast /* Dynamic Title */ </h1>
         <div className={'container-option1'}>  <Player/> </div>
         <div className={'container-option1'}> <CommentForm/> </div>
       </div>
       </div>
     )
   }
 }


 



 


 

 export default PodPlay
