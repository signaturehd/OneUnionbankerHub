import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, GenericInput }  from '../../../../ub-components/'

class CharacterUnemployedComponents extends Component {
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
