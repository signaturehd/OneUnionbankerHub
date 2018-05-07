import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { MdStarOutline, MdStar } from 'react-icons/lib/md';

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
      <div className = {'book-card'} >
        <div className = {'card-header'} >
        </div>
        <div className = {'card-body'}>
          <h5>{ detail.title }</h5>
        </div>
        <div className = {'card-footer'}>
          <center>
            <Rating
              emptySymbol = {<MdStarOutline style={{fontSize: 40, color : "#c65e11"}} />}
              fullSymbol = {<MdStar style={{fontSize: 40,  color : "#c65e11"}} />}
              onChange = { e => {
                rateBook(detail.id, e)
                this.setState({ rating : e })
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
}

export default BookCardComponent
