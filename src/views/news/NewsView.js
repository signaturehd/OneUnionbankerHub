import React from 'react'
import { Switch, Route } from 'react-router-dom'


import ConnectView from '../../utils/ConnectView'
import NewsInteractor from '../../domain/interactor/news/NewsInteractor'

import Presenter from './presenter/NewsPresenter'
import BaseMVPView from '../common/base/BaseMVPView';
import ConnectPartial from '../../utils/ConnectPartial';

import { NewsCardsComponent, NewsModalComponent } from './components'

import './css/styles.css'

class NewsView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state= {
        news: [],
        show : true
    }
  }

  componentDidMount () {
      this.presenter.getNews()
  }

  news (news) {this.setState({news})}



  render () {
    const { news, show } = this.state
    return (
      <div className = {'container'}>
        <h2>News Feed</h2>
        <NewsCardsComponent news = { news } />
        {
          show &&
          <NewsModalComponent onClose = { () => this.setState({ show: false })} />
        }
      </div>
    )
  }
}

export default ConnectPartial(NewsView, Presenter)
