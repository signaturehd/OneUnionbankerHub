import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/PodcastPresenter'

import ConnectPartial from '../../utils/ConnectPartial'

import './styles/podcast.css'
import PodCardComponent from '../common/components/PodCardComponent/PodCardComponent'
import PodcastInteractor from '../../domain/interactor/podcast/PodcastInteractor'


class PodcastView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
        news: [],
        show : false,
        rating: false,
        showRating : false,
        rating : false,
      details : null
    }
  }
   addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
  }

  componentDidMount () {
      this.presenter.getNews()
      this.props.setSelectedNavigation(0)
  }

  news (news) {
      this.setState({ news })
  }

  render () {
    const { news, show, details, detail } = this.state
    return (
      <div className = 'container'>
        { super.render() }
          <div className = { '_podcast-container' }>
        <h1>PODCASTS</h1>
        <div className = { 'adjustment' }>
     
        <div className = 'cardo-container'>
        {
          news.map((news, i) =>
            <PodCardComponent
             rateBook = { (id, rating) => this.addRating(id, rating) }
            
              key={ i }
              news = { news }
              onClick = { details => this.setState({ details, show: true }) } />)
        }
        </div>
      </div>
      </div>
      </div>
    )
  }
}

PodcastView.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(PodcastView, Presenter)


