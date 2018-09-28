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
    cityText,
    cityTextFunc,
    townText,
    townTextFunc
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
            value = { buildingNameText }
            onChange = { (e) => buildingNameFunc(e.target.value) }
            text = { 'Building Name' } />
        </div>
        <GenericInput
          value = { streeText }
          text = { 'Street' }
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
