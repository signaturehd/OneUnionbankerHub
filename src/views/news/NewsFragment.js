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
  GenericButton,
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

let tableWidth = document.body.offsetWidth - 200 - 30

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

    const style = {
      iconNews : {
        backgroundImage : 'url(ad)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        margin: '0px auto',
        width: '100%',
        borderRadius: '5px 5px 0px 0px',
      },
      newsWidth : {
        width: `${ tableWidth }px`,
      }
    }

    let newsList = news
    const search = searchString.trim().toLowerCase()
    if (search.length > 0) {
      newsList = news.filter(news => news.title.toLowerCase().match(search))
    }
    console.log(tableWidth)

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
          <div style = { style.newsWidth }>
            <div
              className = { 'news-scrolling-wrapper' }>
            <Card className = { 'news-list-card' }>
              <div className = { 'home-card-view' }>
                <span
                  style = { style.iconNews }/>
                <div className = { 'home-card-padding' }>
                  <h2 className = { 'unionbank-color font-size-18px font-weight-bold' }>{ 'dawd' }</h2>
                  <h2 className = { 'font-size-12px font-weight-normal' }>
                    {
                      // news.date && moment(news.date).format('MMMM DD, YYYY')
                    }
                  </h2>
                  <br/>
                  <p className = { 'font-size-15px font-weight-normal' }>
                    'awdawdaw awdaw...'
                  </p>
                  <br/>
                  <center>
                    <GenericButton
                      className = { 'global-button profile-button-small' }
                      text= { 'Read More' }
                      onClick = { () =>{
                        // this.openLink()
                        }}
                      />
                  </center>
                </div>
                <div className = { ' home-card-padding text-align-left' }>
                  <Line/>
                    <div className = { 'news-like-grid' }>
                      <h2
                        className = { 'cursor-pointer' }
                        onClick = { () => {
                          // this.setState({ isHeartActive : isHeartActive === 0 ? 1 : 0  })
                          // onChangeHeart(news.id, news.isHeart)
                        }
                      }
                      className = { 'news-heart-icon news-icon' }/>
                    <h2 className = { 'unionbank-color font-size-16px text-align-left' }>{ '' }</h2>
                    </div>
                </div>
              </div>
            </Card>
            <Card className = { 'news-list-card' }>
              <div className = { 'home-card-view' }>
                <span
                  style = { style.iconNews }/>
                <div className = { 'home-card-padding' }>
                  <h2 className = { 'unionbank-color font-size-18px font-weight-bold' }>{ 'dawd' }</h2>
                  <h2 className = { 'font-size-12px font-weight-normal' }>
                    {
                      // news.date && moment(news.date).format('MMMM DD, YYYY')
                    }
                  </h2>
                  <br/>
                  <p className = { 'font-size-15px font-weight-normal' }>
                    'awdawdaw awdaw...'
                  </p>
                  <br/>
                  <center>
                    <GenericButton
                      className = { 'global-button profile-button-small' }
                      text= { 'Read More' }
                      onClick = { () =>{
                        // this.openLink()
                        }}
                      />
                  </center>
                </div>
                <div className = { ' home-card-padding text-align-left' }>
                  <Line/>
                    <div className = { 'news-like-grid' }>
                      <h2
                        className = { 'cursor-pointer' }
                        onClick = { () => {
                          // this.setState({ isHeartActive : isHeartActive === 0 ? 1 : 0  })
                          // onChangeHeart(news.id, news.isHeart)
                        }
                      }
                      className = { 'news-heart-icon news-icon' }/>
                    <h2 className = { 'unionbank-color font-size-16px text-align-left' }>{ '' }</h2>
                    </div>
                </div>
              </div>
            </Card>
            <Card className = { 'news-list-card' }>
              <div className = { 'home-card-view' }>
                <span
                  style = { style.iconNews }/>
                <div className = { 'home-card-padding' }>
                  <h2 className = { 'unionbank-color font-size-18px font-weight-bold' }>{ 'dawd' }</h2>
                  <h2 className = { 'font-size-12px font-weight-normal' }>
                    {
                      // news.date && moment(news.date).format('MMMM DD, YYYY')
                    }
                  </h2>
                  <br/>
                  <p className = { 'font-size-15px font-weight-normal' }>
                    'awdawdaw awdaw...'
                  </p>
                  <br/>
                  <center>
                    <GenericButton
                      className = { 'global-button profile-button-small' }
                      text= { 'Read More' }
                      onClick = { () =>{
                        // this.openLink()
                        }}
                      />
                  </center>
                </div>
                <div className = { ' home-card-padding text-align-left' }>
                  <Line/>
                    <div className = { 'news-like-grid' }>
                      <h2
                        className = { 'cursor-pointer' }
                        onClick = { () => {
                          // this.setState({ isHeartActive : isHeartActive === 0 ? 1 : 0  })
                          // onChangeHeart(news.id, news.isHeart)
                        }
                      }
                      className = { 'news-heart-icon news-icon' }/>
                    <h2 className = { 'unionbank-color font-size-16px text-align-left' }>{ '' }</h2>
                    </div>
                </div>
              </div>
            </Card>
            <Card className = { 'news-list-card' }>
              <div className = { 'home-card-view' }>
                <span
                  style = { style.iconNews }/>
                <div className = { 'home-card-padding' }>
                  <h2 className = { 'unionbank-color font-size-18px font-weight-bold' }>{ 'dawd' }</h2>
                  <h2 className = { 'font-size-12px font-weight-normal' }>
                    {
                      // news.date && moment(news.date).format('MMMM DD, YYYY')
                    }
                  </h2>
                  <br/>
                  <p className = { 'font-size-15px font-weight-normal' }>
                    'awdawdaw awdaw...'
                  </p>
                  <br/>
                  <center>
                    <GenericButton
                      className = { 'global-button profile-button-small' }
                      text= { 'Read More' }
                      onClick = { () =>{
                        // this.openLink()
                        }}
                      />
                  </center>
                </div>
                <div className = { ' home-card-padding text-align-left' }>
                  <Line/>
                    <div className = { 'news-like-grid' }>
                      <h2
                        className = { 'cursor-pointer' }
                        onClick = { () => {
                          // this.setState({ isHeartActive : isHeartActive === 0 ? 1 : 0  })
                          // onChangeHeart(news.id, news.isHeart)
                        }
                      }
                      className = { 'news-heart-icon news-icon' }/>
                    <h2 className = { 'unionbank-color font-size-16px text-align-left' }>{ '' }</h2>
                    </div>
                </div>
              </div>
            </Card>
            <Card className = { 'news-list-card' }>
              <div className = { 'home-card-view' }>
                <span
                  style = { style.iconNews }/>
                <div className = { 'home-card-padding' }>
                  <h2 className = { 'unionbank-color font-size-18px font-weight-bold' }>{ 'dawd' }</h2>
                  <h2 className = { 'font-size-12px font-weight-normal' }>
                    {
                      // news.date && moment(news.date).format('MMMM DD, YYYY')
                    }
                  </h2>
                  <br/>
                  <p className = { 'font-size-15px font-weight-normal' }>
                    'awdawdaw awdaw...'
                  </p>
                  <br/>
                  <center>
                    <GenericButton
                      className = { 'global-button profile-button-small' }
                      text= { 'Read More' }
                      onClick = { () =>{
                        // this.openLink()
                        }}
                      />
                  </center>
                </div>
                <div className = { ' home-card-padding text-align-left' }>
                  <Line/>
                    <div className = { 'news-like-grid' }>
                      <h2
                        className = { 'cursor-pointer' }
                        onClick = { () => {
                          // this.setState({ isHeartActive : isHeartActive === 0 ? 1 : 0  })
                          // onChangeHeart(news.id, news.isHeart)
                        }
                      }
                      className = { 'news-heart-icon news-icon' }/>
                    <h2 className = { 'unionbank-color font-size-16px text-align-left' }>{ '' }</h2>
                    </div>
                </div>
              </div>
            </Card>
            <Card className = { 'news-list-card' }>
              <div className = { 'home-card-view' }>
                <span
                  style = { style.iconNews }/>
                <div className = { 'home-card-padding' }>
                  <h2 className = { 'unionbank-color font-size-18px font-weight-bold' }>{ 'dawd' }</h2>
                  <h2 className = { 'font-size-12px font-weight-normal' }>
                    {
                      // news.date && moment(news.date).format('MMMM DD, YYYY')
                    }
                  </h2>
                  <br/>
                  <p className = { 'font-size-15px font-weight-normal' }>
                    'awdawdaw awdaw...'
                  </p>
                  <br/>
                  <center>
                    <GenericButton
                      className = { 'global-button profile-button-small' }
                      text= { 'Read More' }
                      onClick = { () =>{
                        // this.openLink()
                        }}
                      />
                  </center>
                </div>
                <div className = { ' home-card-padding text-align-left' }>
                  <Line/>
                    <div className = { 'news-like-grid' }>
                      <h2
                        className = { 'cursor-pointer' }
                        onClick = { () => {
                          // this.setState({ isHeartActive : isHeartActive === 0 ? 1 : 0  })
                          // onChangeHeart(news.id, news.isHeart)
                        }
                      }
                      className = { 'news-heart-icon news-icon' }/>
                    <h2 className = { 'unionbank-color font-size-16px text-align-left' }>{ '' }</h2>
                    </div>
                </div>
              </div>
            </Card>
          </div>
          </div>
        <div>
          <div className = { 'news-scrolling-wrapper' }>
            {
              // newsList &&
              // newsList.map((news, i) =>
              // news.status !== 1 &&
              //   <NewsCardComponent
              //     key={ news.id }
              //     news = { news }
              //     onClick = { details =>
              //       this.setState({ details, show: true })
              //     }
              //     onChangeHeart = { (id, isHeart) => this.presenter.addNewsIsHeart(id, isHeart) }
              //   />
              //   )
              }
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
