import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, GenericInput }  from '../../../../ub-components/'

class CharacterSelfEmployedComponents extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      positionText,
      positionTextFunc,
      companyNameText,
      companyNameTextFunc,
      floorText,
      floorTextFunc,
      buildingNameText,
      buildingNameTextFunc,
      streetText,
      streetTextFunc,
      districtText,
      districtTextFunc,
      barangayText,
      barangayTextFunc,
      townTextFunc,
      townText,
      cityText,
      cityTextFunc,
      townTextErrorMessage,
      cityTextErrorMessage,
      streetTextErrorMessage,
      floorTextErrorMessage,
      barangayTextErrorMessage,
      districtTextErrorMessage,
      companyNameTextErrorMessage,
      buildingNameTextErrorMessage,
      positionTextErrorMessage,
    } = this.props

    return (
      <div>
        <GenericInput
          value = { positionText }
          maxLength = { 20 }
          onChange = { (e) => positionTextFunc(e.target.value) }
          errorMessage = { positionText ? '' : positionTextErrorMessage }
          text = { 'Position' } />
        <GenericInput
          value = { companyNameText }
          maxLength = { 30 }
          onChange = { (e) => companyNameTextFunc(e.target.value) }
          errorMessage = { companyNameText ? '' : companyNameTextErrorMessage }
          text = { 'Company Name' } />
        <div className = { 'character-grid-input' }>
          <GenericInput
            value = { floorText }
            maxLength = { 10 }
            onChange = { (e) => floorTextFunc(e.target.value) }
            errorMessage = { floorText ? '' : floorTextErrorMessage }
            text = { 'Floor' } />
          <GenericInput
            maxLength = { 20 }
            onChange = { (e) => buildingNameTextFunc(e.target.value) }
            errorMessage = { buildingNameText ? '' : buildingNameTextErrorMessage }
            value = { buildingNameText }
            text = { 'Building Name' } />
        </div>
        <GenericInput
          text = { 'Street' }
          value = { streetText }
          maxLength = { 20 }
          onChange = { (e) => streetTextFunc(e.target.value) }
          errorMessage = { streetText ? '' : streetTextErrorMessage }
          />
          <GenericInput
            value = { cityText }
            maxLength = { 20 }
            onChange = { (e) => cityTextFunc(e.target.value) }
            errorMessage = { cityText ? '' : cityTextErrorMessage }
            text = { 'City/Municipality' }
          />
          <GenericInput
            value = { townText }
            maxLength = { 20 }
            onChange = { (e) => townTextFunc(e.target.value) }
            errorMessage = { townText ? '' : townTextErrorMessage }
            text = { 'Town' }
          />

        <div className = { 'character-grid-input' }>
          <GenericInput
            value = { districtText }
            maxLength = { 20 }
            errorMessage = { districtText ? '' : districtTextErrorMessage }
            onChange = { (e) => districtTextFunc(e.target.value) }
            text = { 'Disctrict' } />
          <GenericInput
            value = { barangayText }
            maxLength = { 20 }
            errorMessage = { barangayText ? '' : barangayTextErrorMessage }
            onChange = { (e) => barangayTextFunc(e.target.value) }
            text = { 'Barangay' } />
        </div>
      </div>
    )
  }
}

CharacterSelfEmployedComponents.propTypes = {
}

CharacterSelfEmployedComponents.defaultProps = {
}

export default CharacterSelfEmployedComponents
