import React, { Component } from 'react'
import Table from '../table/Table'
import Application from '../accordion/Accordion'
import PodcastPresenter from '../../presenter/PodcastPresenter'
import PodCardComponent from '../../../common/components/PodCardComponent/PodCardComponent'
import CommentForm from '../comments/CommentForm'

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
         <h1> Podcasts </h1>
      <div className={'container-option1'}> <Application/> </div>
       <div className={'container-option1'}> <CommentForm/> </div>
       </div>
       </div>
     )
   }
 }


 



 


 

 export default PodcastListView
