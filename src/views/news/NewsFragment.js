import React from 'react'
import PropTypes from 'prop-types'
import ConnectView from '../../utils/ConnectView'
import NewsInteractor from '../../domain/interactor/news/NewsInteractor'

import Presenter from './presenter/NewsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import NewsCardComponent from './components/NewsCardComponent/NewsCardComponent'
import LoadLoader from './components/NewsLoaderComponent'
import NewsHeadlinesCardComponent from './components/NewsCardComponent/NewsHeadlinesCardComponent'
import NewsModalComponent from './modals/NewsModalComponent'

import {
  CircularLoader,
  GenericInput,
  GenericButton,
  Line,
  Card,
} from '../../ub-components'

import './styles/newsStyles.css'

let staticCount = [1,2,3]

let storeWidth = 0

class NewsFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      news: [],
      show : false,
      searchString : '',
      showLoader: true,
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  componentDidMount () {
      this.presenter.getNews()
      // this.props.setSelectedNavigation(0)
      setTimeout(() => this.setState({ showLoader : false }), 3000)
      const width = document.body.offsetWidth
      if(width <= 768) {
        storeWidth = width - 100
      } else {
        storeWidth = width - 200 - 100
      }
  }

  updateSearch (e) {
    this.setState({ searchString: e.target.value.substr(0 , 20) })
  }

  showNews (news) {
    this.setState({ news })
  }

  render () {
    const {
      news,
      show,
      details,
      showLoader,
      searchString,
    } = this.state

    const style = {
      newsWidth : {
        width: `${ storeWidth }px`,
      }
    }

    let newsList = news
    const search = searchString.trim().toLowerCase()
    if (search.length > 0) {
      newsList = news.filter(news => news.title.toLowerCase().match(search))
    }

    return (
      <div className = {'container'}>
        {
          show &&
          <NewsModalComponent
            onClose = { () => this.setState({ show: false })}
            details = { details }
           />
        }
        <div className = { 'news-grid-header' }>
          <div>
            <h2 className={ 'text-align-left news-header' }>News Feed</h2>
            <h2 className = { 'font-size-14px' }>Be in the loop. Check out what&#39;s new below.</h2>
          </div>
          <div></div>
          {
            // <GenericInput
            //   type = { 'text' }
            //   className = { 'newsSearchBar' }
            //   refCallback = { 'search' }
            //   type = { 'text' }
            //   hint = { 'Search News' }
            //   value = { searchString }
            //   onChange = { this.updateSearch } />
          }
          <div></div>
        </div>
        <br/>
        {
          showLoader ?
          <div className = { 'news-scrolling-wrapper' }>
            {
              staticCount.map((resp) => (
                <LoadLoader  showLoader = { showLoader }/>
              ))
            }
          </div>
          :
          <div style = { style.newsWidth }>
            <div className = { 'news-scrolling-wrapper' }>
              {
                newsList &&
                newsList.map((news, i) =>
                news.status !== 1 &&
                  <NewsCardComponent
                    key={ news.id }
                    news = { news }
                    onClick = { details =>
                      this.setState({ details, show: true })
                    }
                    onChangeHeart = { (id, isHeart) => this.presenter.addNewsIsHeart(id, isHeart) }
                  />
                  )
                }
            </div>
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
