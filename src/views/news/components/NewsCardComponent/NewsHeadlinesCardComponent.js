import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'
import moment from 'moment'
import { FaEye } from 'react-icons/lib/fa/'
import './styles/newsCardComponent.css'

class NewsHeadlinesCardComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isHeartActive : 0,
    }
  }

  openLink () {
    const { news } = this.props
    window.open(news.linkUrl)
  }

  render () {
    const {
      news,
      onClick ,
      imageUrl
    } = this.props
    const { isHeartActive } = this.state
    const styleHead = {
      newsBackground: {
        backgroundImage : `url(https://www.oneunionbankerhub.com/imagerepo/news/agriGoesTechUp.jpg)`,
        backgroundRepeat : 'no-repeat',
        backgroundSize: 'cover',
        color : 'black',
        height: '100%',
        fontWeight : 'lighter',
        width: '-webkit-fill-available',
        height: '350px',
        padding: '0',
        borderRadius: '25px',
      }
    }
    const detailsFiltered = news && news.details.substr(0, 100)

    return (
      <Card className = { 'news-card-headlines' }>
        <div
          style = { styleHead.newsBackground }
          className = {'news-body'}
          onClick = { () =>
            this.openLink() }
          >
          <div id = { 'news-header-overlay' }>
            <div className = { 'news-grid-headlines' }>
              <div></div>
              <div></div>
              <div></div>
              <div className = { 'text-align-left' }>
                <p className = { 'font-size-23px unionbank-white-color font-weight-bold' }>{ news.title }</p>
              </div>
              <div>
                <h2 className = { 'font-size-16px unionbank-white-color' }>{ detailsFiltered }...</h2>
                <div className = { 'news-grid-date' }>
                  <span className = { 'news-icon-size news-icon-headlines' }/>
                  <h2 className = { 'font-size-10px font-weight-normal unionbank-white-color' }>{ moment(news.date).format('MMM DD, YYYY') }</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

NewsHeadlinesCardComponent.propTypes = {
  news : PropTypes.object,
  onClick : PropTypes.func
}

NewsHeadlinesCardComponent.defaultProps = {
}

export default NewsHeadlinesCardComponent
