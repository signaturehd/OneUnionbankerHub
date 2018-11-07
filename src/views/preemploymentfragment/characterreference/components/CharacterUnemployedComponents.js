import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, GenericInput }  from '../../../../ub-components/'

class CharacterUnemployedComponents extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      addressText,
      addressTextFunc,
      addressTextErrorMessage
    } = this.props

    return (
      <div>
        <GenericInput
          value = { addressText }
          onChange = { (e) => addressTextFunc(e.target.value) }
          maxLength = { 40 }
          errorMessage = { addressText ? '' : addressTextErrorMessage }
          text = { 'Address' } />
      </div>
    )
  }
}

CharacterUnemployedComponents.propTypes = {
}

CharacterUnemployedComponents.defaultProps = {
}

export default CharacterUnemployedComponents
