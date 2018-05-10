import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import './styles.css'
import { GenericButton }  from '../../../../ub-components/'

import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import { FaPlayCircleO } from 'react-icons/lib/fa/'
import Rating from 'react-rating'

class PodcastCardDetailsComponent extends Component {

  constructor (props) {
    super(props)
     this.state = {
      rating : 0,
      imageUrl : ''
    }
  }
  addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
  }

  render () {
    const { detail, podcasts, onClick, rateBook, history } = this.props
    const { rating,  } = this.state
    const style = {
      styles : {
        background: `url(${podcasts.image}) rgba(0,0,0,0.7)`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'color',
      },
      titleStyle : {
        color : '#ffffff',
        fontWeight: 'bold,'
      },
      authorStyle : {
        color : '#ffffff',
        fontSize : '12px',
        float : 'right',
      }
    } 
    return (
        <Card >
          <div style = {style.styles} 
               className = {'podcasts-details-side-right'}>
              <h2 style = { style.titleStyle }> {'Title'} </h2>
              <h2 style = { style.authorStyle }> -{podcasts.speaker} </h2>
          <center>
            <FaPlayCircleO                  
              className = { 'fa-play-button-details' }
              onClick = { onClick }/>
          </center>
          </div>
          <div className = {'card-footer'}>
          <center>
           <Rating 
              rateBook = { (id, rating) => this.addRating(id, rating) }
              emptySymbol = {<MdStarOutline style={{ fontSize: 25, color : '#c65e11' }} />}
              fullSymbol = {<MdStar style={{ fontSize: 25,  color : '#c65e11' }} />}
              onChange = { e => {
                rateBook(detail.id, e)
                this.setState({ rating : e })
              }}

              fractions = { 2 }
              initialRating = { rating ? rating : podcasts.rating } />
            </center> 
          </div>
        </Card>
    )
  }
}

PodcastCardDetailsComponent.propTypes = {

  onClick : PropTypes.func,
  rateBook : PropTypes.func,

}

PodcastCardDetailsComponent.defaultProps = {

}

export default PodcastCardDetailsComponent
