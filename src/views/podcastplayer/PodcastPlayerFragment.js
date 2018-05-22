import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rating from 'react-rating'
import { MdStarOutline, MdStar } from 'react-icons/lib/md'

import Presenter from './presenter/PodcastPlayerPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import MedPlayer from './fragments/player/MedPlayer'
import Board from './fragments/comments/CommentForm'
import PodcastCardComponent from './components/PodcastCardComponent'

import './styles/podplay.css'

class PodcastPlayerFragment extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      podcast: {},
      rating : 0,
      podcasts: [],
    }
  }

  componentDidMount () {
    this.presenter.getPodcast(this.props.match.params.id)
    this.presenter.getPodcasts()
  }

  /* implementations */

  showPodcast (podcast) {
    this.setState({ podcast })
  }

  showPodcasts (podcasts) {
      this.setState({ podcasts })
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
          podcast={ podcast }
        />
      )
    })
    :
    <div></div>
  }

  render () {
    const { rating, podcast, podcasts } = this.state

    return (
      <div>
        { super.render() }
        <div className={ 'podplay-header' }>
          <i className = { 'left' } onClick = { () => this.props.history.push('/mylearning/podcast') }></i>
          <h2 className = { 'header-margin-default' }>UTube</h2>
        </div>
        <div className = { 'podplay-main' }>
          <div><MedPlayer history = { history } selectedPodcast = { podcast } /></div>
          <div className = { 'podcast-player-rating-right' } >Ratings :
            <Rating
              rateBook = { (id, rating) => this.paddRating(id, rating) }
              emptySymbol = {<MdStarOutline style={{ fontSize: 40, color : '#c65e11' }} />}
              fullSymbol = {<MdStar style={{ fontSize: 40,  color : '#c65e11' }} />}
              onChange = { e => {
               this.getRatings(podcast && podcast.rating, e)
              }}
              fractions = { 2 }
              initialRating = { (podcast && podcast.rating) || 0 }
              />
          </div>
          <div className = { 'podcasts-player-details' }>
            <h2 className = { 'title-podcast' }> Title: { podcast && podcast.title } </h2>
            <h4 className = { 'author-podcast' }> Author: { podcast && podcast.speaker }</h4>
            <h4 className = { 'author-podcast' }> Details: { 'Description' }</h4>
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
