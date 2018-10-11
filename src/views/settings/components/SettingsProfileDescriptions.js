import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, Line, GenericInput, GenericButton } from '../../../ub-components/'

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
      descriptionEditMode,
      descriptionTextFunc,
      descriptionText,
      onChangeToEditMode,
      profileDescriptions,
      onUpdateDescription
    }=this.props

    const ratings = parseInt(performanceRating)

    return (
      <div className={ 'profile-others-card' }>
        <div className={ 'profile-padding' }>
          <div className = { 'grid-global' }>
            <div className = { 'grid-global' }>
              <h2 className={ 'unionbank-color font-weight-normal' }>
                Description
              </h2>
              <div className = { 'text-align-right' }>
                <span
                  onClick = { () => onChangeToEditMode(true) }
                  className = { 'profile-icon-settings editIconImage' }/>
              </div>
            </div>
            <div></div>
          </div>
          <br/>
          {
            descriptionEditMode ?
            <div className = { 'profile-grid-description' }>
              <GenericInput
                text = { 'Add Description' }
                onChange = { (e) => descriptionTextFunc(e.target.value) }
                value = { descriptionText }
                />
              <GenericButton
                onClick = { () => onUpdateDescription() }
                text = { 'Update' }
                />
            </div>
            :
            <h2
              className={ 'font-size-14px' }>
              {
                profileDescriptions ? profileDescriptions :
                '(Add Description)'
              }
            </h2>
          }
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
