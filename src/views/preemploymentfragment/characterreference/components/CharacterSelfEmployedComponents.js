import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../../utils/numberUtils'
import { Card }  from '../../../../ub-components/'

import moment from 'moment'

class CharacterSelfEmployedComponents extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
    } = this.props

    return (
      <div> 
        <GenericInput
          onChange = { () => {} }
          text = { 'Position' } />
        <GenericInput
          onChange = { () => {} }
          text = { 'Company Name' } />
        <div className = { 'character-grid-input' }>
          <GenericInput
            onChange = { () => {} }
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

CharacterSelfEmployedComponents.propTypes = {
}

CharacterSelfEmployedComponents.defaultProps = {
}

export default CharacterSelfEmployedComponents
