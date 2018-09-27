import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CharacterEmployedComponents extends Component {
  constructor (props) {
    super(props)
  }

  render () {
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

CharacterEmployedComponents.propTypes = {
}

CharacterEmployedComponents.defaultProps = {
}

export default CharacterEmployedComponents
