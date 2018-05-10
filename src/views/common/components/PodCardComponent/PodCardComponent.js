import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

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
    const { detail, news, onClick, rateBook, history } = this.props
    const { rating } = this.state

    return (
        <Card>
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
            <small>
            <GenericButton 
              text ="awdaw" 
              onClick = { () => this.props.history.push('/podcast/player') }/>
            </small> 
            <small><a>Read More</a></small>
          </div>
        </Card>
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
