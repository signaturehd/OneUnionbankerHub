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
  addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
  }
 

  render () {
    const { detail, news, onClick, rateBook } = this.props
    const { rating } = this.state

    return (
        <Cards>
       
          <div className = {'news-body'}>
            <h2> {news.imageUrl} </h2>
            <h3>{news.title}</h3>
          </div>
          <div className = {'card-footer'}>
          <center>
           <Rating
          rateBook = { (id, rating) => this.addRating(id, rating) }
           
              onChange = { e => {
                rateBook(news.id, e)
                this.setState({ rating : e })
              }}
              fractions = { 2 }
              initialRating = { rating ? rating : news.rating }
            />
         
            </center>
            <small><a href = {news.linkUrl}><GenericButton text =""/> </a></small> {/*.linkurl for mapping for playing mp3 */} 
            <small><a onClick = { () => onClick(news) }>Read More</a></small>
          </div>
        </Cards>
    )
  }
}

PodCardComponent.propTypes = {
  
  onClick : PropTypes.func,
  rateBook : PropTypes.func,

}

PodCardComponent.defaultProps = {

}

export default PodCardComponent
