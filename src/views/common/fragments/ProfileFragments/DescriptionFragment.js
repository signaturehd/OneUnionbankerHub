import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, Line, GenericInput, GenericButton } from '../../../../ub-components/'

import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import { FaPlayCircleO } from 'react-icons/lib/fa/'
import Rating from 'react-rating'

class DescriptionFragment extends Component {

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
      <Card className={ 'profile-others-card padding-profileFragment' }>
        <div className={ 'profile-padding' }>
          <div className = { 'grid-global' }>
            <div className = { 'grid-global' }>
              <h2 className={ 'unionbank-color font-weight-normal padding-profileFragment-name' }>
                Description
              </h2>
              <div className = { 'text-align-right' }>
                <span
                  onClick = { () => {
                    if(descriptionEditMode) {
                      onChangeToEditMode(false)
                    } else {
                      onChangeToEditMode(true)
                    }
                  }  }
                  className = { 'profile-icon-settings editIconImage padding-profileFragment-name' }/>
              </div>
            </div>
          </div>
          <br/>
          {
            descriptionEditMode ?
            <div className = { 'profile-grid-description' }>
              <GenericInput
                type = { 'textarea' }
                text = { 'Add Description' }
                onChange = { (e) => descriptionTextFunc(e.target.value) }
                value = { descriptionText }
                />
              <GenericButton
                className = { 'profile-button-small' }
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
      </Card>
    )
  }
}

DescriptionFragment.propTypes={
  profileDescriptions : PropTypes.string,
  performanceRating : PropTypes.string,
}

export default DescriptionFragment
