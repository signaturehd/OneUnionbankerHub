import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Cards } from '../../../../ub-components/'

import './styles.css'
import GenericButton  from './PlayButton'

import Rating from 'react-rating'

class PodCardComponent extends Component {
  constructor (props) {
    super(props)
     this.state = {
      rating : 0
    }
  }

  render () {
    const { detail,news, onClick } = this.props
      const { rating } = this.state
    return (
        <Cards>
          <div></div>
          <div className = {'news-body'}>
            <h2> {news.imageUrl} </h2>
            <h3>{news.title}</h3>
          </div>
          <div className = {'card-footer'}>
          <Rating
              onChange = { e => {
                rateBook(detail.id, e)
                this.setState({ rating : e })
              }}
              fractions = { 2 }
              initialRating = { rating ? rating : detail.rating }
            />
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
