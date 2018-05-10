import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/PodcastPresenter'

import ConnectPartial from '../../utils/ConnectPartial'

import './styles/podcast.css'
import PodCardComponent from '../common/components/PodCardComponent/PodCardComponent'
import PodcastInteractor from '../../domain/interactor/podcast/PodcastInteractor'

import PodcastPlayerFragment from './fragments/PodcastPlayerPage/PodcastPlayerFragment'
import PodCastsRecommendationFragment from './fragments/PodCastsTab/PodCastsRecommendationFragment'
import PodCastsListFragment from './fragments/PodCastsTab/PodCastsListFragment'
import PodCastsViewedFragment from './fragments/PodCastsTab/PodCastsViewedFragment'

class PodcastView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
        podcasts: [],
        show : false,
        rating: false,
        showRating : false,
        details : null,
        searchString : '',
        selectedPodcast: null,
    }
    this.updateSearch = this.updateSearch.bind(this)
  }
  addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
  }
  componentDidMount () {
      this.presenter.getPodcasts()
      this.props.setSelectedNavigation(0)
  }
  updateSearch () {
      this.setState({ searchString: this.refs.search.value.substr( 0 , 20) })
  }
  podcasts ( podcasts ) {
      this.setState({ podcasts })  
  }
  render () {
    const { podcasts,  show, details, detail, searchBar, selectedPodcast } = this.state
    const { history } = this.props
    const PodcastPlayer = () => (
        <PodcastPlayerFragment 
            selectedPodcast = { selectedPodcast }
            presenter = { this.presenter }
            podcasts = { podcasts }
            _podcasts = { _podcasts }
            history = { history }/>
    )
    const PodCast = () => (
    <div>
    { super.render() }
    <h1>PODCASTS</h1>
    <input className = 'podcastsSearchBar'
           ref="search"
           type = { 'text' }
           placeholder = { 'Search Podcasts' }
           value = { searchBar }
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
          podcasts = { podcasts }
          _podcasts = { _podcasts } 
          details = { details }
          history = { history } />
      </section>
      <section id='content2'>
        <PodCastsRecommendationFragment 
          presenter = { this.presenter }
          podcasts = { podcasts }
          _podcasts = { _podcasts } 
          history = { history } />
      </section>
      <section  id='content3'>
        <PodCastsViewedFragment  
          presenter = { this.presenter }
          podcasts = { podcasts }
          _podcasts = { _podcasts } 
          history = { history }  />
      </section>
    </div>
  </div>
  )
  let _podcasts = this.state.podcasts
  let search = this.state.searchString.trim().toLowerCase()
  if (search.length > 0) {
    _podcasts = _podcasts.filter(function( podcasts ) {
      return podcasts.title.toLowerCase().match(search)
    })
  }
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
