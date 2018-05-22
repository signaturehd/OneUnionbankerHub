  import React from 'react'
import PropTypes from 'prop-types'
import ConnectView from '../../utils/ConnectView'
import NewsInteractor from '../../domain/interactor/news/NewsInteractor'

import Presenter from './presenter/NewsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import NewsCardComponent from './components/NewsCardComponent/NewsCardComponent'
import NewsModalComponent from './modals/NewsModalComponent'

import { CircularLoader } from '../../ub-components'


import './styles/news-styles.css'

class NewsFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
        news: [],
        show : false,
        searchString : '',
        showLoader: true
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  componentDidMount () {
      this.presenter.getNews()
      this.props.setSelectedNavigation(0)
      setTimeout(() => this.setState({ showLoader : false }), 3000)

  }

  updateSearch () {
    this.setState({ searchString: this.refs.search.value.substr(0 , 20) })
  }
  news (news) {
    this.setState({ news })
  }

  render () {
    const {
      news,
      show,
      details,
      showLoader
    } = this.state
    let newsList = this.state.news
    const search = this.state.searchString.trim().toLowerCase()

    let filteredNews = news

    if (search.length > 0) {
      newsList = news.filter(newsList => news.title.toLowerCase().match(search))
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
        <h1 className = { 'title-view' }>News Feed</h1>
        <input type = 'text'
          className = 'newsSearchBar'
          ref='search'
          placeholder = {'Search News'}
          value = { this.state.searchString }
          onChange = { this.updateSearch } />
        {
          showLoader ?
            <div className = {'news-loader'} >
              <center>
                <CircularLoader show = {true} />
              </center>
            </div>

          :
            <div className = 'news-card-container'>
            {
              newsList &&
              newsList.map((news, i) =>
                <NewsCardComponent
                  key={ i }
                  news = { news }
                  onClick = { details => this.setState({ details, show: true }) } />)
            }
            </div>
        }
      </div>
    )
  }
}

NewsFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(NewsFragment, Presenter)
