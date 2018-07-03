import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, Line } from '../../../ub-components/'

import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import { FaPlayCircleO } from 'react-icons/lib/fa/'
import Rating from 'react-rating'

import './styles/profileSettings.css'

class SettingsProfileDescriptions extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      performanceRating,
      profileDescriptions }=this.props
    const ratings = parseInt(performanceRating)
    
    return (
      <div className={ 'profile-others-card' }>
        <div className={ 'profile-padding' }>
          <h2 className={ 'unionbank-color font-weight-normal' }>
            Descriptions
          </h2>
          <br/>
          <div className={ 'font-size-14px' }>
            {
              profileDescriptions ? profileDescriptions :
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
          </div>
          <br/>
          <Line />
          <br/>
          <h2 className={ 'unionbank-color font-weight-normal' }>
            Performance Ratings
          </h2>
          <Rating
            emptySymbol={ <MdStarOutline style={{ fontSize: 35, color : '#c65e11' }} /> }
            fullSymbol={ <MdStar style={{ fontSize: 35,  color : '#c65e11' }} /> }
            fractions={ 2 }
            initialRating={ (ratings ? ratings : 0) || 0 }
            readonly
          />
        </div>
      </div>
    )
  }
}

SettingsProfileDescriptions.propTypes={
  profileDescriptions : PropTypes.string,
  performanceRating : PropTypes.string,
}

export default SettingsProfileDescriptions
