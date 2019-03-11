import React from 'react'
import PropTypes from 'prop-types'
import ConnectView from '../../utils/ConnectView'
import NewsInteractor from '../../domain/interactor/news/NewsInteractor'

import Presenter from './presenter/NewsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import NewsCardComponent from './components/NewsCardComponent/NewsCardComponent'
import NewsHeadlinesCardComponent from './components/NewsCardComponent/NewsHeadlinesCardComponent'
import NewsModalComponent from './modals/NewsModalComponent'

import { CircularLoader, GenericInput, Line, Card } from '../../ub-components'

import './styles/newsStyles.css'

class NewsFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      news: [],
      show : false,
      searchString : '',
      showLoader: false,
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  componentDidMount () {
    this.presenter.getNews()
  }

  updateSearch (e) {
    this.setState({ searchString: e.target.value.substr(0 , 20) })
  }

  showNews (news) {
    this.setState({ news })
  }

  showLoader (showLoader) {
    this.setState({ showLoader })
  }

  render () {
    const {
      news,
      show,
      details,
      showLoader,
      searchString,
    } = this.state

    let newsList = news
    const search = searchString.trim().toLowerCase()
    if (search.length > 0) {
      newsList = news.filter(news => news.title.toLowerCase().match(search))
    }

    return (
      <div className = 'container'>
        {
          show &&
          <NewsModalComponent
            onClose = { () => this.setState({ show: false })}
            details = { details }
           />
        }
        <div className = { 'news-grid-header' }>
          <div>
            <h2 className={ 'header-margin-default text-align-left news-header' }>News Feed</h2>
            <h2>Be in the loop. Check out what&#39;s new below.</h2>
            <br/>
          </div>
          <div></div>
          <GenericInput
            type = { 'text' }
            className = { 'newsSearchBar' }
            refCallback = { 'search' }
            type = { 'text' }
            hint = { 'Search News' }
            value = { searchString }
            onChange = { this.updateSearch } />
        </div>
        <br/>
        <div>
          {
            showLoader ?
            <div className = {'news-loader'} >
              <center>
                <CircularLoader show = {showLoader} />
              </center>
            </div>:
            <div>
            {
              newsList &&
              newsList.map((news, i) =>
                newsList[0].id === news.id &&
                <div>
                  <NewsHeadlinesCardComponent
                    key = { i }
                    news = { news }
                    onClick = { details =>
                      this.setState({ details, show: true })
                    }
                  />
                </div>
              )}
              <br/>
              <div className = { 'news-feature-stories' }>
                <h2 className = { 'unionbank-color font-size-25px font-weight-bold' }>Featured Stories</h2>
                <br/>
                <br/>
                {
                  newsList &&
                  newsList.map((news, i) =>
                  newsList[0].id !== news.id &&
                  <div>
                    <NewsCardComponent
                      key={ i }
                      news = { news }
                      onClick = { details =>
                        this.setState({ details, show: true })
                      }
                      onChangeHeart = { (id, isHeart) => this.presenter.addNewsIsHeart(id, isHeart) }
                    />
                    <br/>
                    <Line/>
                    <br/>
                  </div>
                    )
                  }
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

NewsFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(NewsFragment, Presenter)
