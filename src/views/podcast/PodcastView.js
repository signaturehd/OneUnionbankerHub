import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/PodcastPresenter'

import ConnectView from '../../utils/ConnectView'

import './styles/podcast.css'
import PodcastInteractor from '../../domain/interactor/podcast/PodcastInteractor'
import PodcastRecommendationsInteractor from '../../domain/interactor/podcast/PodcastRecommendationInteractor'

import PodcastPlayerFragment from './fragments/podcastplayerpage/PodcastPlayerFragment'
import PodcastsRecommendationFragment from './fragments/podcaststab/PodcastsRecommendationFragment'
import PodcastsListFragment from './fragments/podcaststab/PodcastsListFragment'
import PodcastsViewedFragment from './fragments/podcaststab/PodcastsViewedFragment'

import { CircularLoader } from '../../ub-components'

class PodcastView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
        podcasts: [],
        podcastsRecommendation : [],
        reviewRates: [],
        podcastreview: [],
        show : false,
        showRating : false,
        details : null,
        searchString : '',
        selectedPodcast: null,
        disabled : false,
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  componentDidMount () {
      this.presenter.getPodcasts()
      this.presenter.getPodcastsRecommendations()
      this.props.setSelectedNavigation(5)
      this.props.history.push('/mylearning/podcast')
  }

  showLoader () {
    this.setState({ disabled : true })
  }

  hideLoader () {
    this.setState({ disabled : false })
  }

  updateSearch (e) {
      this.setState({ searchString: e.target.value })
  }

  podcasts (podcasts) {
      this.setState({ podcasts })
  }

  podcastsRecommendation (podcastsRecommendation) {
      this.setState({ podcastsRecommendation })
  }

  podcastsreviews (podcastreview) {
      this.setState({ podcastreview })
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  render () {
    const {
      podcasts,
      podcastsRecommendation,
      paddRating,
      podcastreview,
      show,
      details,
      disabled,
      detail,
      searchString,
      selectedPodcast,
    } = this.state
    const { history } = this.props

    let searchPodcast = podcasts
    const search = searchString.trim().toLowerCase()

    if (search.length > 0) {
        searchPodcast = searchPodcast.filter(podcasts => podcasts.title.toLowerCase().match(search))
    }

    const PodCast = () => (
      <div>
        <div className={ 'header-margin-container' }>
          <i className = { 'back-arrow' } onClick = { this.navigate.bind(this) }></i>
          <h2 className = { 'header-margin-default' }>PODCAST</h2>
        </div>
        <input type = 'text'
                 className = {'podcastsSearchBar'}
                 placeholder = {'Search Podcasts'}
                 value = { searchString }
                 onChange = { this.updateSearch } />
        <div className = { 'tabs-container' }>
          <input
            className = { 'input-tab' }
            id='tab1'
            type='radio'
            name='tabs'
            defaultChecked />
          <label htmlFor = 'tab1'>All Podcasts</label>

          <input
            className = { 'input-tab' }
            id='tab2'
            type='radio'
            name='tabs' />
          <label htmlFor='tab2'>Recommended</label>

          <section id='content1'>
            {
              this.state.disabled ?
              <center className = {'circular-loader-center'}>
                <br/>
                <CircularLoader show = { true }/>
              </center>          :
              <PodcastsListFragment
                disabled = { this.state.disabled }
                changeSelectedPodcast={ podcast => this.setState({ selectedPodcast: podcast }) }
                presenter = { this.presenter }
                searchPodcast = { searchPodcast }
                details = { details }
                history = { history } />
            }
          </section>
          <section id='content2'>
              <PodcastsRecommendationFragment
                disabled = { this.state.disabled }
                presenter = { this.presenter }
                searchPodcast = { searchPodcast }
                changeSelectedPodcast={ podcast => this.setState({ selectedPodcast: podcast }) }
                podcastsRecommendation = { podcastsRecommendation }
                history = { history } />
          </section>
        </div>
      </div>
    )

    return (
      <div>
        { super.render() }
        <Switch>
          <Route exact path = '/mylearning/podcast' render = { PodCast } />
          <Route path = '/mylearning/podcast/player' render = { props =>
            <PodcastPlayerFragment
              { ...props }
              changeSelectedPodcast={ podcast => this.setState({ selectedPodcast: podcast }) }
              selectedPodcast = { selectedPodcast }
              presenter = { this.presenter }
              podcasts = { podcasts }
              podcastreview = { podcastreview } /> } />
        </Switch>
      </div>
    )
  }
}

PodcastView.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(PodcastView, Presenter)
