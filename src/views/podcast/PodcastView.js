import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/PodcastPresenter'

import ConnectPartial from '../../utils/ConnectPartial'

import './styles/podcast.css'
import PodCardComponent from '../common/components/PodCardComponent/PodCardComponent'
import PodcastInteractor from '../../domain/interactor/podcast/PodcastInteractor'
import PodPlay from './fragments/PlayPage/PodPlay'

class PodcastView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
        news: [],
        show : false,
        rating: false,
        showRating : false,
        details : null,
        searchString : ''
    }
    this.updateSearch = this.updateSearch.bind(this)
  }
   addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
  }

  componentDidMount () {
      this.presenter.getNews()
      this.props.setSelectedNavigation(0)
  }
  updateSearch () {
      this.setState({ searchString: this.refs.search.value.substr( 0 , 20) })
  }

  news (news, details) {
      this.setState({ news })
  }

  render () {
    const { news, show, details, detail } = this.state
    const PodCast = () => (
    <div>
        { super.render() }
        <h1>PODCASTS</h1>
        <input type = 'text'
             className = 'podcastsSearchBar'
             ref="search"
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

      <input className = { 'input-tab' } id='tab3'  type='radio' name='tabs' />
      <label htmlFor = 'tab3' >Viewed</label>

      <section id='content1'>
      <div className = {'podcasts-container'}>
      {
          _news.map((news, i) =>
            <PodCardComponent
             rateBook = { (id, rating) => this.addRating(id, rating) }
            
              key={ i }
              news = { news }
              onClick = { details => this.setState({ details, show: true })  } />
            )
        }
      </div>
      </section>
      <section id='content2'>
        <div />
      </section>
      <section  id='content3'>
        <div />
      </section>
    </div>
  </div> 
      )
    let _news = this.state.news
    let search = this.state.searchString.trim().toLowerCase()
    if (search.length > 0) {
      _news = _news.filter(function( news ) {
        return news.title.toLowerCase().match(search)
      })
    }
    return (
    <div>
       <Switch>
         <Route exact path = '/podcast' render = { PodCast } />
      </Switch>
    </div>
    )
  }
}

PodcastView.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(PodcastView, Presenter)


