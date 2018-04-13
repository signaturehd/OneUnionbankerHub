import React from 'react'
import { Switch, Route } from 'react-router-dom'


import ConnectView from '../../utils/ConnectView'
import NewsInteractor from '../../domain/interactor/news/NewsInteractor'

import Presenter from './presenter/NewsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import { GenericCard } from '../../ub-components/Cards'



class NewsView extends BaseMVPView {
  constructor (props) {
    super(props);
    this.state = {
        showNews: []
    }
  }

  componentDidMount () {
      this.presenter.getNews()
  }

  showNews (news) {
this.setState({ showNews:news })
}

  render () {
    const { showNews } = this.state;

    return (
      <div className = {'library-container'}>
        {
          showNews.map((news, key) => (
              <GenericCard
                title = { news.title }
                description = { news.Author }
              />
            ))
        }
      </div>
    )
  }
}

export default ConnectPartial(NewsView, Presenter)


