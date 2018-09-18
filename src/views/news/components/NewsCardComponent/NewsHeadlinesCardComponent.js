import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'
import moment from 'moment'
import { FaEye } from 'react-icons/lib/fa/'
import './styles/newsCardComponent.css'

class NewsHeadlinesCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      news,
      onClick ,
      imageUrl
    } = this.props

    const styleHead = {
      newsBackground: {
        backgroundImage : `url(${news.imageUrl})`,
        backgroundRepeat : 'no-repeat',
        backgroundSize: 'cover',
        color : 'white',
        height: '100%',
        fontWeight : 'bold',
        width: '-webkit-fill-available',
        height: '400px',
        borderRadius: '25px',
      }
    }

    return (
      <Card className = { 'news-card-headlines' }>
        <div
          style = { styleHead.newsBackground }
          className = {'news-body'}
          onClick = { () =>
            onClick(news) } >
          <div>
            <h2>{ news.title }</h2>
            <div className = { 'news-grid-date' }>
              <span className = { 'news-icon-size global-icons-calendar' }/>
              <h2>{ moment(news.date).format('MM DD YYYY') }</h2>
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
