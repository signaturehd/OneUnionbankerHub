import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PodcastCardDetailsComponent from '../../components/cards/PodcastCardDetailsComponent'
import { MdStarOutline, MdStar } from 'react-icons/lib/md'

class PodcastsPlayerDetailsFragment extends Component {
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
    const {
      selectedPodcast,
      podcasts,
      searchPodcast,
      changeSelectedPodcast
    } = this.props

    return (
    <div className = { 'podcast-details' }>
     {
        podcasts.map((podcast, i) =>
          <PodcastCardDetailsComponent
            history = { this.props.history }
            rateBook = { (id, rating) => this.addRating(id, rating) }
            key={ i }
            podcasts = { podcast }
            onClick = { () => changeSelectedPodcast(podcast)}/>
        )
      }
    </div>
    )
  }
 }

PodcastsPlayerDetailsFragment.propTypes = {
  selectedPodcast: PropTypes.object,

}
export default PodcastsPlayerDetailsFragment
