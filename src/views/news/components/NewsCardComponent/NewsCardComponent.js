import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'
import moment from 'moment'
import { FaEye } from 'react-icons/lib/fa/'
import './styles/newsCardComponent.css'

class NewsCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      news,
      onClick ,
      imageUrl
    } = this.props

    const style = {
      newsBackground: {
        backgroundImage : `url(${news.imageUrl})`,
        backgroundRepeat : 'no-repeat',
        backgroundSize: 'cover',
        color : 'white',
        height: '100%',
        fontWeight : 'bold',
        borderRadius: '30px',
        borderRadius: '25px',
      }
    }

    return (
      <Card className = { 'news-card' }>
        <div
          style = { style.newsBackground }
          className = {'news-body'}
          onClick = { () =>
            onClick(news) } >
          <h3>{ news.title }</h3>
        </div>
      </Card>
    )
  }
}

NewsCardComponent.propTypes = {
  news : PropTypes.object,
  onClick : PropTypes.func
}

NewsCardComponent.defaultProps = {

}

export default NewsCardComponent
