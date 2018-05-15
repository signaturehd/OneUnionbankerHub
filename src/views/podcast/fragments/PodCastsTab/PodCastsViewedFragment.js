import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PodCardComponent from '../../../common/components/PodCardComponent/PodCardComponent'

class PodCastsViewedFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating : false,
      view : false,
      details : null
    }
  }

  paddRating (id, rating) {
    this.props.presenter.ratePodcast(id, rating)
  }
  render () {
       const { podcastViewed, searchPodcast } = this.props
    return (
      <div className = {'podcasts-container'}>
        {
          podcastViewed.map((podcasts, i) =>
            <PodCardComponent
             rateBook = { (id, rating) => this.addRating(id, rating) }
              key={ i }
              podcastViewed = { podcasts }
              onClick = { details => this.setState({ details, show: true })  } />
            )
      }
      </div>
    )
  }
}

export default PodCastsViewedFragment
