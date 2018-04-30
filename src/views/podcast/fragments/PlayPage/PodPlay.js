import React, { Component } from 'react'
import PodCardComponent from '../../../common/components/PodCardComponent/PodCardComponent'
import CommentForm from '../comments/CommentForm'
import Player from '../player/Player'
import Rating from 'react-rating'

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
         <Rating
              onChange = { e => {
                rateBook(detail.id, e)
                this.setState({ rating : e })
              }}
              fractions = { 2 }
              initialRating = { rating ? rating : detail.rating }
            />
         <div className={'container-option1'}> <CommentForm/> </div>
       </div>
       </div>
     )
   }
 }


 



 


 

 export default PodPlay
