import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/podcast-card-component.css'
import { Card }  from '../../../../ub-components/'

import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import { FaPlayCircleO } from 'react-icons/lib/fa/'
import Rating from 'react-rating'

class PodcastCardComponent extends Component {
  constructor (props) {
    super(props)
     this.state = {
      rating : 0,
    }
  }
  addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
  }

  render () {
    const { detail, searchPodcast, onClick, rateBook, history } = this.props
    const { rating } = this.state

    const style = {
      styles : {
        background: `url(${searchPodcast && searchPodcast.image}) rgba(0,0,0,0.7)`,
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
               className = {'news-body'}>
            <h2 style = { style.titleStyle }> {'Title'} </h2>
            <h2 style = { style.authorStyle }> -{ searchPodcast && searchPodcast.speaker } </h2>
          </div>
          <div className = {'card-footer'}>
          <center>
           <Rating
              rateBook = { (id, rating) => this.addRating(id, rating) }
              emptySymbol = {<MdStarOutline style={{ fontSize: 35, color : '#c65e11' }} />}
              fullSymbol = {<MdStar style={{ fontSize: 35,  color : '#c65e11' }} />}
              onChange = { e => {
                rateBook(detail.id, e)
                this.setState({ rating : e })
              }}
              fractions = { 2 }
              initialRating = { searchPodcast && searchPodcast.rating || 0 }
              readonly
            />

            </center>
            <small>
            <FaPlayCircleO
              className = { 'fa-play-button' }
              onClick = { onClick }/>
            </small>
          </div>
        </Card>
    )
  }
}

PodcastCardComponent.propTypes = {
  onClick : PropTypes.func,
  rateBook : PropTypes.func,
}

PodcastCardComponent.defaultProps = {

}

export default PodcastCardComponent
