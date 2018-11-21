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

import {
  CircularLoader,
  GenericInput,
  Line,
  Card,
  SkeletalLoader,
} from '../../ub-components'

import './styles/newsStyles.css'

let staticCount = [1,2,3]

function LoadLoader (props) {
  const showLoader = props.showLoader
  return (
    <div className = { 'padding news-facebook-loader-grid' }>
      <SkeletalLoader
        boxSizeObject = {{
          width : 200,
          height: 150,
        }}
        shapeBox = { showLoader }
        />
      <div>
        <SkeletalLoader
          titleSizeObject = {{
            width: 20,
            height: 2,
          }}
          shapeTitle = { showLoader }
          />
        <br/>
        <SkeletalLoader
          showCodeComponent = { true }
          />
      </div>
    </div>
  )
}

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
            <h2 className={ 'text-align-left news-header' }>News Feed</h2>
            <h2 className = { 'font-size-14px' }>Be in the loop. Check out what&#39;s new below.</h2>
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
        <div>
          {
          newsList &&
          newsList.map((news, i) =>
            news.status === 1 &&
              <div>
                <NewsHeadlinesCardComponent
                  key = { i }
                  news = { news }
                  onClick = { details =>
                    this.setState({ details, show: true })
                  }
                  />
                </div>
              )
            }
            <br/>
            <div className = { 'news-feature-stories' }>
              <div>
                {
                  showLoader ?
                  <div>
                    {
                      staticCount.map(resp =>
                        <LoadLoader
                          showLoader = { showLoader }
                       />
                      )
                    }
                  </div>
                  :
                  <div className = { 'grid-global-columns-x3' }>
                    {
                      newsList &&
                      newsList.map((news, i) =>
                      news.status !== 1 &&
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
                      </div>
                        )
                      }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

NewsFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(NewsFragment, Presenter)
