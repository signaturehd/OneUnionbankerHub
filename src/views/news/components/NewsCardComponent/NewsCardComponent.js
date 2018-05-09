import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import './styles.css'


class NewsCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { news, onClick } = this.props
    return (
        <Card>
          <div></div>
          <div className = {'news-body'}>
            <h3>{news.title}</h3>
          </div>
          <div className = {'card-footer'}>
            <small><a href = {news.linkUrl}>See More</a></small>
            <small><a onClick = { () => onClick(news) }>Read More</a></small>
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
