import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { MdStarOutline, MdStar } from 'react-icons/lib/md'

import { Card, GenericButton } from '../../../../ub-components'

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

    const  styles = {
      cardHeader : {
        backgroundImage : `url(${$(detail.imageUrl)  })`,
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat'
      },
      authorStyle : {
        fontSize : '2px',
      }
    }

    return (
      <Card className = {'book-card'}>
        <div style = {styles.cardHeader} >
        </div>
        <div className = {'card-body'}>
          <span>{ detail.title }</span>
          <h2 style = { styles.authorStyle }>-{ detail.author }</h2>
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
              readonly
            />
            <GenericButton onClick = { () => onClick(detail, true) } text = { 'Read More' } />
          </center>
        </div>
      </Card>
    )
  }
}

BookCardComponent.propTypes = {
  detail : PropTypes.object,
  onClick : PropTypes.func,
  rateBook : PropTypes.func,
}

export default BookCardComponent
