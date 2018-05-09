import React, { Component } from 'react'
import PodCardComponent from '../../../common/components/PodCardComponent/PodCardComponent'
import MedPlayer from '../../components/player/MedPlayer'
import Rating from 'react-rating'
import PropTypes from 'prop-types'
import Board from '../../components/comments/CommentForm'
import './podplay.css'

class PodPlay extends Component {
  constructor (props) {
  super(props)
    this.state = {
      rating : 0

   }
   }

addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
  }

  podcasts (podcasts) {
      this.setState({ podcasts })
  }

 render () {
   const { title, author, description, news, detail, rateBook } = this.props
   const {rating} = this.state
   return (
    <div>
    <div className = { 'podplay-header' }>
      <h1>Playing Podcast</h1>
    </div>

    <div className = { 'podplay-main' }>
      <div><MedPlayer/></div>
      <h5>Author of podcast</h5>
      <Rating rateBook = { (id, rating) => this.addRating(id, rating) }
          onChange = { e => {
            rateBook(news.id, e)
            this.setState({ rating : e })
          }}
          fractions = { 2 }
          initialRating = { news ?  news.rating :0  }
        />
        <Board/>
    </div>
    <div className = { 'podplay-sidebar-right' }>

    </div>
    </div>
     )
   }
 }


PodPlay.propTypes = {

  onClick : PropTypes.func,
  rateBook : PropTypes.func,

}

PodPlay.defaultProps = {

}

 export default PodPlay
