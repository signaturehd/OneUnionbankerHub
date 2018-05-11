import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PodcastCardDetailsComponent from '../../../common/components/PodCardComponent/PodcastCardDetailsComponent'
import ContentLoader, { Facebook } from 'react-content-loader'
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

    const { selectedPodcast, podcasts, _podcasts, changeSelectedPodcast } = this.props

    const ContentLoaderView = () => {
      <ContentLoader
        height={1600}
        width={400}
        speed={2}
        primaryColor = "#f3f3f3"
        secondaryColor="#ecebeb">
        <rect x="5.00" y="5.00" rx="0" ry="0" width="500" height="250" /> 
        <rect x="5.00" y="265.00" rx="0" ry="0" width="500" height="25" /> 
        <rect x="5.00" y="300.00" rx="0" ry="0" width="500" height="25" /> 
        <rect x="5.00" y="380" rx="0" ry="0" width="500" height="250" /> 
        <rect x="5.00" y="640.00" rx="0" ry="0" width="500" height="25" /> 
        <rect x="5.00" y="675.00" rx="0" ry="0" width="500" height="25" /> 
      </ContentLoader>
    }
    const ContentView = () => {
      {
        podcast.map((podcasts, i) =>
          <PodCardComponent
            history = { this.props.history }
            rateBook = { (id, rating) => this.addRating(id, rating) }
            key={ i }
            podcasts = { podcasts.speaker }
            onClick = { details => {
              this.setState({ details, show: true })
            }} />
          )
        }
    }
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
