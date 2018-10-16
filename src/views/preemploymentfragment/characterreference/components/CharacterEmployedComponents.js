import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, GenericInput }  from '../../../../ub-components/'

class CharacterEmployedComponents extends Component {
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
  } = this.props

   return (
      <div>
        <GenericInput
          value = { positionText }
          maxLength = { 20 }
          onChange = { (e) => positionTextFunc(e.target.value) }
          text = { 'Position' } />
        <GenericInput
          value = { companyNameText }
          maxLength = { 30 }
          onChange = { (e) => companyNameTextFunc(e.target.value) }
          text = { 'Company Name' } />
        <div className = { 'character-grid-input' }>
          <GenericInput
            value = { floorText }
            maxLength = { 10 }
            onChange = { (e) => floorTextFunc(e.target.value) }
            text = { 'Floor' } />
          <GenericInput
            maxLength = { 20 }
            onChange = { (e) => buildingNameTextFunc(e.target.value) }
            value = { buildingNameText }
            text = { 'Building Name' } />
        </div>
        <GenericInput
          text = { 'Street' }
          value = { streetText }
          onChange = { (e) => streetTextFunc(e.target.value) }
          />
          <GenericInput
            value = { cityText }
            onChange = { (e) => cityTextFunc(e.target.value) }
            text = { 'City/Municipality' }
          />
          <GenericInput
            value = { townText }
            onChange = { (e) => townTextFunc(e.target.value) }
            text = { 'Town' }
          />

        <div className = { 'character-grid-input' }>
          <GenericInput
            value = { districtText }
            onChange = { (e) => districtTextFunc(e.target.value) }
            text = { 'Disctrict' } />
          <GenericInput
            value = { barangayText }
            onChange = { (e) => barangayTextFunc(e.target.value) }
            text = { 'Barangay' } />
        </div>
      </div>
    )
  }
}

CharacterEmployedComponents.propTypes = {
}

CharacterEmployedComponents.defaultProps = {
}

export default CharacterEmployedComponents
