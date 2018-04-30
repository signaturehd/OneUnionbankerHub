import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/PodcastPresenter'
import './styles/styles.css'
import ConnectPartial from '../../utils/ConnectPartial'
import { GenericButton } from '../../ub-components/UButton'
import { Cards } from '../../ub-components'
import PodcastListView from './fragments/PlayPage/PodPlay'

class PodcastView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
        podcast: [],
        show : false,
    }
  }

  componentDidMount () {
      this.presenter.getPodcast()
      this.props.setSelectedNavigation(0)
  }

  podcast (podcast) {
      this.setState({ podcast })
  }

  render () {
    const { podcast, show, details } = this.state
    return (
      <div className = 'container'>
        { super.render() }
        <h1>Podcast Feed</h1>
        <div className = 'card-container'>
        {
          podcast.map((podcast, i) =>
            <PodCardComponent
              key={ i }
              podcast = { podcast }
              onClick = { details => this.setState({ details, show: true }) } />)
        }
        </div>
      </div>
    )
  }
}


export default ConnectPartial(PodcastView, Presenter)