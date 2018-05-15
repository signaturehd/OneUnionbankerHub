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
      changeSelected : null,
      paddRating : false,
    }
   }
  componentDidMount () {
    !this.props.selectedPodcast && this.props.history.push('/podcast')
  }
  paddRating (id, rating) {
    this.props.presenter.ratePodcasts(id, rating)
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
     changeSelectedPodcast,
     history
   } = this.props
   const { rating } = this.state

   return (
    <div>
    <div className={ 'podplay-header' }>
      <i className = { 'left' } onClick = { () => this.props.history.push('/podcast') }></i>
      <h1>UTube</h1>
    </div>
    <div className = { 'podplay-main' }>
      <div><MedPlayer history = { history } selectedPodcast = { selectedPodcast } /></div>
      <Rating
          rateBook = { (id, rating) => this.paddRating(id, rating) }
          emptySymbol = {<MdStarOutline style={{ fontSize: 40, color : '#c65e11' }} />}
          fullSymbol = {<MdStar style={{ fontSize: 40,  color : '#c65e11' }} />}
          onChange = { e => {
            ratePodcasts(detail.id, e)
            this.setState({ rating : e })
          }}
          fractions = { 2 }
          initialRating = { selectedPodcast ? selectedPodcast.rating : 0 }
         />
    <div className = { 'podcasts-player-details' }>
      <h2>{ selectedPodcast && selectedPodcast.speaker }</h2>
      <h5>Details</h5>
    </div>
    <Board selectedPodcast = { selectedPodcast && selectedPodcast.review }/>
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
