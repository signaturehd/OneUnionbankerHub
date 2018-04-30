import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Cards } from '../../../../ub-components/'

import './styles.css'
import GenericButton  from './PlayButton'


class PodCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { news, onClick } = this.props
    return (
        <Cards>
          <div></div>
          <div className = {'news-body'}>
            <h3>{news.title}</h3>
          </div>
          <div className = {'card-footer'}>
            <small><a href = {news.linkUrl}><GenericButton text =""/> </a></small> {/*.linkurl for mapping for playing mp3 */} 
            <small><a onClick = { () => onClick(news) }>Read More</a></small>
          </div>
        </Cards>
    )
  }
}

PodCardComponent.propTypes = {
  news : PropTypes.object,
  onClick : PropTypes.func
}

PodCardComponent.defaultProps = {

}

export default PodCardComponent
