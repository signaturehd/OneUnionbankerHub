import React, { Component } from 'react'
import PodCardComponent from '../../../common/components/PodCardComponent/PodCardComponent'
import MedPlayer from '../../components/player/MedPlayer'
import Rating from 'react-rating'
import PropTypes from 'prop-types'
import Board from '../../components/comments/CommentForm'
import './podplay.css'
import Presenter from '../../presenter/PodcastPresenter'
import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import PodcastPlayerDetailsFragment from '../PodcastPlayerList/PodcastPlayerDetailsFragment'

class PodcastPlayerFragment extends Component {
  constructor (props) {
  super(props)
    this.state = {
      rating : 0,
    }
   }

  addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
  }

  podcasts (podcasts) {
      this.setState({ podcasts })
  }
 render () {

   const { title, author, description, detail, rateBook } = this.props
   const {rating} = this.state
   return (
    <div>
    <div className={ 'podplay-header' }>
      <i className = { 'left' } onClick = { () => this.props.history.push('/podcast') }></i>
      <h1>Title</h1>
    </div>
    <div className = { 'podplay-main' }>
      <div><MedPlayer/></div>
      <h5>Author of podcast</h5>
      <h5>Details</h5>
      <Rating 
              rateBook = { (id, rating) => this.addRating(id, rating) }
              emptySymbol = {<MdStarOutline style={{ fontSize: 40, color : '#c65e11' }} />}
              fullSymbol = {<MdStar style={{ fontSize: 40,  color : '#c65e11' }} />}
              onChange = { e => {
                rateBook(detail.id, e)
                this.setState({ rating : e })
              }}
              fractions = { 2 }
              initialRating = { rating ? rating : 0 } />
        <Board/>
        <div> User Feedback </div>
    </div>
      <div className = { 'podplay-sidebar-right' }>
        <PodcastPlayerDetailsFragment 
          presenter = { this.presenter } 
          news = { this.props.news } 
          _news = { this.props._news }/>
      </div>
    </div>
     )
   }
 }


PodcastPlayerFragment.propTypes = {

  onClick : PropTypes.func,
  rateBook : PropTypes.func,

}

 export default PodcastPlayerFragment
