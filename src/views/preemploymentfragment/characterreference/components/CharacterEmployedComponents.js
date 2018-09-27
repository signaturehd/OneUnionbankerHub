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
    positionFunc, 
    companyNameText,
    companyNameFunc,
    floarText,
    floorTextFunc,
    buildingNameText,
    buildingNameFunc,
    streeText,
    streetTextFunc,
    districtText,
    districtTextFunc,
    barangayText,
    barangayTextFunc,
  } = this.props
  
    return (
      <div>
        <GenericInput
          value = { positionText }
          onChange = { (e) => positionFunc(e.target.value) }
          text = { 'Position' } />
        <GenericInput
          onChange = { (e) => companyNameFunc(e.target.value) }
          text = { 'Company Name' } />
        <div className = { 'character-grid-input' }>
          <GenericInput
            onChange = { (e) => floorTextFunc(e.target.value) }
            text = { 'Floor' } />
          <GenericInput
            onChange = { () => {} }
            text = { 'Building Name' } />
        </div>
        <GenericInput
          text = { 'Street' }
          onChange = { () => {} }
          />
        <div className = { 'character-grid-input' }>
          <GenericInput
            onChange = { () => {} }
            text = { 'Disctrict' } />
          <GenericInput
            onChange = { () => {} }
            text = { 'Barangay' } />
        </div>
      </div>
    )
  }
}

CharacterEmployedComponents.propTypes = {
  positionText : PropTypes.string,
   positionFunc : PropTypes.func, 
  companyNameText : PropTypes.string,
  companyNameFunc : PropTypes.func,
  floarText : PropTypes.string,
  floorTextFunc : PropTypes.func,
  buildingNameText : PropTypes.string,
  buildingNameFunc : PropTypes.func,
  streeText : PropTypes.string,
  streetTextFunc : PropTypes.func,
  districtText : PropTypes.string,
  districtTextFunc : PropTypes.func,
  barangayText : PropTypes.string,
  barangayTextFunc : PropTypes.func,
}

CharacterEmployedComponents.defaultProps = {
}

export default CharacterEmployedComponents
