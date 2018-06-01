import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rating from 'react-rating'
import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import { GenericButton, CircularLoader, Modal } from '../../ub-components'

import Presenter from './presenter/PodcastPlayerPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import MedPlayer from './fragments/player/MedPlayer'
import Board from './fragments/comments/Comment'
import PodcastCardComponent from './components/PodcastCardComponent'
import ReviewModal from './modal/PodcastAddReviewModal'

import './styles/podplay.css'

class PodcastPlayerFragment extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      podcast: {},
      rating : 0,
      podcasts: [],
      reviews: [],
      showAddReview : false,
      showLoader : false,
    }
  }

  componentDidMount () {
    this.presenter.getPodcast(this.props.match.params.id)
    this.presenter.getPodcasts()
    this.presenter.getPodcastsReviews()
  }

  /* modal loader */
  circularLoader ( loader ) {
    this.setState({ showAddReview: false })
    this.setState({ showLoader : loader })
  }

  /* implementations */

  showPodcast (podcast) {
    this.setState({ podcast })
  }

  showPodcasts (podcasts) {
      this.setState({ podcasts })
  }

  showPodcastReview ( reviews ) {
    this.setState({ reviews })
  }
  /* renders */
  renderPodcasts (podcasts) {
    return podcasts ?
    podcasts.map((podcast, key) => {
      return (
        <PodcastCardComponent
          key={ key }
          onClick={ () => {
            this.props.history.push(`/mylearning/podcasts/${podcast.id}`)
            this.presenter.getPodcast(podcast.id)
          }}
          podcast = { podcast }
        />
      )
    })
    :
    <div></div>
  }

  render () {
    const { rating, podcast, podcasts, reviews, showAddReview, showLoader } = this.state
    const { history } = this.props

    return (
      <div>
        { super.render() }
        {
          showAddReview &&
          <ReviewModal
            podcast = { podcast }
            isDismisable = { true }
            presenter = { this.presenter }
            onClose = { () => this.setState({ showAddReview : false }) }
          />
        }
        {
          showLoader &&
          <Modal
            isDismisable = { true }
            onClose = { () => this.setState({ showLoader : false }) } >
            <center>
                <br/>
                <CircularLoader show = { showLoader }/>
                <h2> Please wait while processing the review </h2>
            </center>
          </Modal>
        }

        <div className={ 'podplay-header' }>
          <i className = { 'left' } onClick = { () => history.push('/mylearning/podcasts') }></i>
          <h2 className = { 'header-margin-default' }>UTube</h2>
        </div>
        <div className = { 'podplay-main' }>
          <div>
            <MedPlayer
              history = { history }
              selectedPodcast = { podcast }  />
          </div>
          <div className = { 'podcast-player-rating-right' }> Ratings :
            <Rating
              emptySymbol = {<MdStarOutline style={{ fontSize: 40, color : '#c65e11' }} />}
              fullSymbol = {<MdStar style={{ fontSize: 40,  color : '#c65e11' }} />}
              initialRating = {  rating ? rating : podcast.rating }
              fractions = { 2 }
              readonly
              />
          </div>
          <div className = { 'podcasts-player-details' }>
            <h2 className = { 'title-podcast' }> Title: { podcast && podcast.title } </h2>
            <h4 className = { 'author-podcast' }> Author: { podcast && podcast.speaker }</h4>
            <h4 className = { 'author-podcast' }> Details: { 'Description' }</h4>
            <br/>
            <GenericButton
              className = { 'podcast-review-button' }
              text = { 'Add Preview' }
              onClick = { () => this.setState({ showAddReview : true }) }/>
            <br/><br/>
            <center><h2> User Reviews </h2></center>
            <br/>
            <Board/>
          </div>
        </div>
        <div className = { 'podplay-sidebar-right' }>
           { this.renderPodcasts(podcasts) }
        </div>
      </div>
    )
  }
}

export default ConnectView(PodcastPlayerFragment, Presenter)
