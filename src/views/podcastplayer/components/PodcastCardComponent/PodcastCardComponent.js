import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/podcast-card-component.css'
import { Card }  from '../../../../ub-components/'

import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import { FaPlayCircleO } from 'react-icons/lib/fa/'
import Rating from 'react-rating'

class PodcastCardComponent extends Component {

  render () {
    const { podcast, onClick } = this.props

    const style = {
      styles : {
        background: `url(${podcast && podcast.image}) rgba(0,0,0,0.7)`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'color',
      },
    }

    return (
      <Card onClick={ onClick } className = { 'podcast-card' }>
        <div style = { style.styles }
             className = { 'podcast-body' }>
          <h2 className = { 'podcast-title' }>{ podcast && podcast.title}</h2>
          <h2 className={ 'podcast-author' }>-{ podcast && podcast.speaker }</h2>
        </div>
        <div className = { 'card-footer' }>
          <center>
            <Rating
              emptySymbol = { <MdStarOutline style={{ fontSize: 35, color : '#c65e11' }} /> }
              fullSymbol = { <MdStar style={{ fontSize: 35,  color : '#c65e11' }} /> }
              fractions = { 2 }
              initialRating = { (podcast && podcast.rating) || 0 }
              readonly
            />
          </center>
        </div>
      </Card>
    )
  }
}

PodcastCardComponent.propTypes = {
  onClick: PropTypes.func,
  podcast: PropTypes.object,
}

export default PodcastCardComponent
