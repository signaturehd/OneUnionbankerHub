  import React from 'react'
import PropTypes from 'prop-types'
import ConnectView from '../../utils/ConnectView'
import NewsInteractor from '../../domain/interactor/news/NewsInteractor'

import Presenter from './presenter/NewsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import NewsCardComponent from './components/NewsCardComponent/NewsCardComponent'
import NewsModalComponent from './modals/NewsModalComponent'

import { CircularLoader, GenericInput } from '../../ub-components'


import './styles/newsStyles.css'

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

  updateSearch (e) {
    this.setState({ searchString: e.target.value.substr(0 , 20) })
  }
  news (news) {
    this.setState({ news })
  }

  render () {
    const {
      news,
      show,
      details,
      showLoader,
      searchString
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
            <h2 className={ 'header-margin-default text-align-left' }> News Feed </h2>
            <h2>Be in the loop. Check out what's new below.</h2>
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
        {
          showLoader ?
            <div className = {'news-loader'} >
              <center>
                <CircularLoader show = {true} />
              </center>
            </div>          :
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
