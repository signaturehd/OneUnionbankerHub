import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PodcastCardRecommendedComponent from '../../components/Cards/PodcastCardRecommendedComponent'

class PodcastsRecommendationFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating : false,
      view : false,
      details : null
    }
  }

  addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
  }
  render () {
    const { podcastsRecommendation, searchPodcast } = this.props
    return (
      <div className = {'podcasts-container'}>
        {
          podcastsRecommendation.map((podcast, i) =>
            <PodcastCardRecommendedComponent
             rateBook = { (id, rating) => this.addRating(id, rating) }
              key={ i }
              podcast = { podcast }
              onClick = { details => this.setState({ details, show: true })  } />
            )
      }
      </div>
    )
  }
}

export default PodcastsRecommendationFragment
