import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PodcastCardComponent from '../../components/cards/PodcastCardComponent'

class PodcastListFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating : false,
      view : false,
      details : null
    }
  }

  render () {
    const {
      searchPodcast,
      changeSelectedPodcast,
      history
    } = this.props

  return (
  <div className = {'podcasts-container'}>
    {
      searchPodcast.map((podcast, i) =>
        <PodcastCardComponent
          history = { history }
          rateBook = { (id, rating) => this.getPodcasts(id, rating) }
          key={ i }
          searchPodcast = { podcast }
          onClick={ () => {
            this.props.history.push('/mylearning/podcast/player')
            changeSelectedPodcast(podcast)
          }}/>
        )
      }
      </div>
    )
  }
}

export default PodcastListFragment
