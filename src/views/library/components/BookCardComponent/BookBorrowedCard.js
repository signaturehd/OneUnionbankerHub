import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { MdStarOutline, MdStar } from 'react-icons/lib/md'

import { Card, GenericButton } from '../../../../ub-components'

import Rating from 'react-rating'

import staticImage from '../../../../images/education_bg.jpg'
import './styles.css'

class BookBorrowedCard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      rating : 0
    }
  }

  render () {
    const { detail, onClick, rateBook } = this.props
    const { rating } = this.state

    const  styles = {
      cardHeader : {
        backgroundImage :`rgba(0,0,0,0.5) url(${staticImage}) no-repeat center center`,
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat'
      }
    }

    return (
      <Card className = {'book-card'}>
        <div style = {styles.cardHeader} >
        </div>
        <div className = {'card-body'}>
          <span>{ detail.title }</span>
        </div>
        <div className = {'card-footer'}>
          <center>
            <Rating
              emptySymbol = {<MdStarOutline style={{ fontSize: 30, color : '#c65e11' }} />}
              fullSymbol = {<MdStar style={{ fontSize: 30,  color : '#c65e11' }} />}
              onChange = { e => {
                rateBook(detail.id, e)
                this.setState({ rating : e })
              }}
              fractions = { 2 }
              initialRating = { rating ? rating : detail.rating }
            />
          <GenericButton
            onClick = { () => onClick(detail, true) }
            text = { 'Read More' } />
          </center>
        </div>
      </Card>
    )
  }
}

BookBorrowedCard.propTypes = {
  detail : PropTypes.object,
  onClick : PropTypes.func,
  rateBook : PropTypes.func,
}

export default BookBorrowedCard
