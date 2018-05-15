import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/PodcastPresenter'

import ConnectPartial from '../../utils/ConnectPartial'

import './styles/podcast.css'
import PodCardComponent from '../common/components/PodCardComponent/PodCardComponent'
import PodcastInteractor from '../../domain/interactor/podcast/PodcastInteractor'
import PodcastRecommendationsInteractor from '../../domain/interactor/podcast/PodcastRecommendationInteractor'

import PodcastPlayerFragment from './fragments/PodcastPlayerPage/PodcastPlayerFragment'
import PodCastsRecommendationFragment from './fragments/PodCastsTab/PodCastsRecommendationFragment'
import PodCastsListFragment from './fragments/PodCastsTab/PodCastsListFragment'
import PodCastsViewedFragment from './fragments/PodCastsTab/PodCastsViewedFragment'

class PodcastView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
        podcasts: [],
        podcastsRecommendation : [],
        podcastViewed : [],
        show : false,
        rating: false,
        showRating : false,
        paddRating : false,
        details : null,
        searchString : '',
        selectedPodcast: null,
    }
    this.updateSearch = this.updateSearch.bind(this)
  }
  paddRating (id, rating) {
      this.props.presenter.ratePodcasts(id, rating)
  }
  componentDidMount () {
      this.presenter.getPodcasts()
      this.presenter.getPodcastsRecommendations()
      this.presenter.getPodcastsViewed()
      this.props.setSelectedNavigation(0)
  }
  updateSearch () {
      this.setState({ searchString: this.refs.search.value.substr(0 , 20) })
  }
  podcasts (podcasts) {
      this.setState({ podcasts })
  }
  podcastsRecommendation (podcastsRecommendation) {
      this.setState({ podcastsRecommendation })
  }
  podcastsRecommendation (podcastsRecommendation) {
      this.setState({ podcastsRecommendation })
  }
  podcastViewed (podcastViewed) {
    this.setState({ podcastViewed })
  }
  render () {
    const {
      podcasts,
      podcastViewed,
      podcastsRecommendation,
      paddRating,
      show,
      details,
      detail,
      selectedPodcast
    } = this.state
    const { history } = this.props
    let searchPodcast = this.state.podcasts
    const search = this.state.searchString.trim().toLowerCase()
    if (search.length > 0) {
        searchPodcast = searchPodcast.filter(podcast => podcast.author.toLowerCase().match(search))
    }
    const PodcastPlayer = () => (
        <PodcastPlayerFragment
            changeSelectedPodcast={ podcast => this.setState({ selectedPodcast: podcast }) }
            selectedPodcast = { selectedPodcast }
            presenter = { this.presenter }
            podcasts = { podcasts }
            history = { history }/>
    )

    const PodCast = () => (
    <div>
    { super.render() }
    <h1 className = { 'title-view' } >PODCASTS</h1>
      <input type = 'text'
               className = {'podcastsSearchBar'}
               ref='search'
               placeholder = {'Search Podcasts'}
               value = { this.state.searchString }
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

      <input
        className = { 'input-tab' }
        id='tab3'
        type='radio'
        name='tabs' />
      <label htmlFor = 'tab3' >Viewed</label>

      <section id='content1'>
        <PodCastsListFragment
          changeSelectedPodcast={ podcast => this.setState({ selectedPodcast: podcast }) }
          presenter = { this.presenter }
          searchPodcast = { searchPodcast }
          details = { details }
          history = { history } />
      </section>
      <section id='content2'>
        <PodCastsRecommendationFragment
          presenter = { this.presenter }
          searchPodcast = { searchPodcast }
          changeSelectedPodcast={ podcast => this.setState({ selectedPodcast: podcast }) }
          podcastsRecommendation = { podcastsRecommendation }
          history = { history } />
      </section>
      <section  id='content3'>
        <PodCastsViewedFragment
          presenter = { this.presenter }
          changeSelectedPodcast={ podcast => this.setState({ selectedPodcast: podcast }) }
          podcastViewed = { podcastViewed }
          history = { history }  />
      </section>
    </div>
  </div>
  )
  return (
  <div>
     <Switch>
       <Route exact path = '/podcast' render = { PodCast } />
       <Route path = '/podcast/player' render = { PodcastPlayer } />
    </Switch>
  </div>
  )
}
}

PodcastView.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(PodcastView, Presenter)
