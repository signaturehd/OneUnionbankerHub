import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Rating from 'react-rating'

import './styles.css'

class BookCardComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating : 0
    }
  }

  render () {
    const { detail, onClick, rateBook } = this.props
    const { rating } = this.state


    return (
      <div className = {'card'} >
        <div className = {'card-header'} >
        </div>
        <div className = {'card-body'}>
          <h5>{ detail.title }</h5>
        </div>
        <div className = {'card-footer'}>
          <center>
            <Rating
              onChange = { e => {
 rateBook(detail.id, e), this.setState({ rating : e }) 
}}
              fractions = { 2 }
              initialRating = { rating ? rating : detail.rating }
            />
            <button onClick = { () => onClick(detail, true) }>Read More</button>
          </center>
        </div>
      </div>
    )
  }
}

BookCardComponent.propTypes = {
  detail : PropTypes.object,
  onClick : PropTypes.func,
  rateBook : PropTypes.func,
  description : PropTypes.string,
  id : PropTypes.string
}

BookCardComponent.defaultProps = {
  title : 'title',
  description : 'description',
  author : 'author',
  image : 'image',
  rating : 0,
}


export default BookCardComponent
