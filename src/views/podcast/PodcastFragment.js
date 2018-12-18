import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/PodcastPresenter'
import ConnectView from '../../utils/ConnectView'

import PodcastCardComponent from './components/PodcastCardComponent'
import { CircularLoader, Modal, GenericButton } from '../../ub-components'

import './styles/podcast.css'

class PodcastFragment extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      searchString: '',
      showLoader: false,
      podcasts: [],
      podcastRecommendations: [],
      disableComponent: false
    }

    this.updateSearch = this.updateSearch.bind(this)
  }

  componentDidMount () {
    // this.presenter.getPodcasts()
    // this.presenter.getPodcastsRecommendations()
  }

  /* implementations */

  podcasts (podcasts) {
      this.setState({ podcasts })
  }

  podcastsRecommendation (podcastRecommendations) {
      this.setState({ podcastRecommendations })
  }

  /* private methods */

  showLoader () {
    this.setState({ showLoader: true })
  }

  hideLoader () {
    this.setState({ showLoader: false })
  }

  /**
  * search podcast, filter for all tabs
  */
  updateSearch (searchString) {
    this.setState({ searchString })
  }

  /* renders */

  /**
  * generic function for all podcast types. (recommended, all)
  */
  renderPodcasts (podcasts) {
    return podcasts ?
    podcasts.map((podcast, key) => (
        <PodcastCardComponent
          key={ key }
          onClick={ () =>
            this.props.history.push(`/mylearning/podcasts/${podcast.id}`) }
          podcast={ podcast }
        />
      ))    :
    <div></div>
  }

  render () {
    const {
      searchString,
      showLoader,
      podcasts,
      disableComponent,
      podcastRecommendations } = this.state
    const { history } = this.props

    let searchPodcast = podcasts
    let searchPodcastRecommendation = podcastRecommendations
    const search = this.state.searchString.trim().toLowerCase()
    if (search.length > 0) {
        searchPodcast =
          podcasts.filter(podcast =>
            podcast.title.toLowerCase().match(search))
        searchPodcastRecommendation =
          podcastRecommendations.filter(recommendation =>
            recommendation.title.toLowerCase().match(search))
    }
    return (
      <div>
        { super.render() }
        <Modal>
          <center>
            <h2>Under Development</h2>
          </center>
          <br/>
          <center>
            <h4>We’re sorry to inform you that Podcasts on One UnionBanker Hub will be available in the future releases. Apologies for the inconvenience.</h4>
            <br/>
            <GenericButton
              onClick={ () => this.props.history.push('/mylearning') }
              text={ 'OK' }
              />
          </center>
        </Modal>
        {
          disableComponent &&
          <div>
            <div className={ 'header-margin-container' }>
              <i className = { 'back-arrow' } onClick = { () =>
                  history.push('/mylearning') }>
              </i>
              <h2 className = { 'header-margin-default' }>PODCAST</h2>
            </div>
            <input type = 'text'
              className = { 'podcastsSearchBar' }
              placeholder = { 'Search Podcasts' }
              value = { searchString }
              onChange = { e => this.updateSearch(e.target.value) } />
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
                  showLoader ?
                  <center className = {'circular-loader-center'}>
                    <br/>
                    <CircularLoader show = { true }/>
                  </center> :
                  <div className = { 'podcasts-container' }>
                    { this.renderPodcasts(searchPodcast) }
                  </div>
                }
              </section>
              <section id='content2'>
                { this.renderPodcasts(searchPodcastRecommendation) }
              </section>
            </div>
          </div>
        }
      </div>
    )
  }
}

PodcastFragment.propTypes = {
}

export default ConnectView(PodcastFragment, Presenter)
