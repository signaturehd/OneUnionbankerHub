import React, { Component } from 'react'
import Application from '../accordion/Accordion'
import PodCardComponent from '../../../common/components/PodCardComponent/PodCardComponent'
import CommentForm from '../comments/CommentForm'
import Player from '../player/Player'

class PodcastListView extends Component {
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


       <div className={'container-option1'}> <CommentForm/> </div>
       </div>
       </div>
     )
   }
 }


 



 


 

 export default PodcastListView
