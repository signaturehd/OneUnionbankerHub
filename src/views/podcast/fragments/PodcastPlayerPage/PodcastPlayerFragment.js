import React, { Component } from 'react'
import MedPlayer from '../../components/player/MedPlayer'
import Rating from 'react-rating'
import PropTypes from 'prop-types'
import Board from '../../components/comments/CommentForm'
import './podplay.css'
import Presenter from '../../presenter/PodcastPresenter'
import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import PodcastPlayerDetailsFragment from '../podcastplayerlist/PodcastPlayerDetailsFragment'

class PodcastPlayerFragment extends Component {
  constructor (props) {
  super(props)
    this.state = {
      rating : 0,
      changeSelected : null,
    }
    this.getRatings = this.getRatings.bind(this)
   }
  getRatings (e, e1) {

    console.log(e, e)
  }
  podcasts (podcasts) {
      this.setState({ podcasts })
  }

 render () {
   const {
     title,
     author,
     description,
     detail,
     rateBook,
     selectedPodcast,
     podcasts,
     podcastreview,
     changeSelectedPodcast,
     history
   } = this.props
   const { rating } = this.state
   return (
    <div>
    <div className={ 'podplay-header' }>
      <i className = { 'left' } onClick = { () => this.props.history.push('/mylearning/podcast') }></i>
      <h2 className = { 'header-margin-default' }>UTube</h2>
    </div>
    <div className = { 'podplay-main' }>
      <div><MedPlayer history = { history } selectedPodcast = { selectedPodcast } /></div>
      <div className = { 'podcast-player-rating-right' } >Ratings :
      <Rating
          rateBook = { (id, rating) => this.paddRating(id, rating) }
          emptySymbol = {<MdStarOutline style={{ fontSize: 40, color : '#c65e11' }} />}
          fullSymbol = {<MdStar style={{ fontSize: 40,  color : '#c65e11' }} />}
          onChange = { e => {
            this.getRatings( selectedPodcast && selectedPodcast.rating, e )
          }}
          fractions = { 2 }
          initialRating = { selectedPodcast ? selectedPodcast.rating : 0 }
         />
     </div>
    <div className = { 'podcasts-player-details' }>
      <h2 className = { 'title-podcast' }> Title : { selectedPodcast && selectedPodcast.title } </h2>
      <h4 className = { 'author-podcast' }> Author : { selectedPodcast && selectedPodcast.speaker }</h4>
      <h4 className = { 'author-podcast' }> Details : { 'Description' }</h4>
    </div>
    <br/>
    <Board
      podcastreview = { podcastreview }
      selectedPodcast = { selectedPodcast && selectedPodcast.review }/>
    </div>
      <div className = { 'podplay-sidebar-right' }>
        <PodcastPlayerDetailsFragment
          changeSelectedPodcast={ changeSelectedPodcast }
          presenter = { this.presenter }
          podcasts = { podcasts }
          selectedPodcast = { selectedPodcast }  />
      </div>
    </div>
     )
   }
 }

PodcastPlayerFragment.propTypes = {
  selectedPodcast: PropTypes.object,
  onClick : PropTypes.func,
  rateBook : PropTypes.func,

}

 export default PodcastPlayerFragment
