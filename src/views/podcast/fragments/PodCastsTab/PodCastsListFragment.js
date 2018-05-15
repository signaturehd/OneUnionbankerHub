import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PodCardComponent from '../../../common/components/PodCardComponent/PodCardComponent'

class PodCastsListFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating : false,
      view : false,
      details : null
    }
  }

  render () {
    const { searchPodcast, changeSelectedPodcast, history } = this.props
    return (
  <div className = {'podcasts-container'}>
    {
      searchPodcast.map((podcast, i) =>
        <PodCardComponent
          history = { history }
          rateBook = { (id, rating) => this.getPodcasts(id, rating) }
          key={ i }
          searchPodcast = { podcast }
          onClick={ () => {
            this.props.history.push('/podcast/player')
            changeSelectedPodcast(podcast)
          }}/>
        )
      }
      </div>
    )}
  }

export default PodCastsListFragment
