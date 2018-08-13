import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/phenomCardComponentStyle.css'

import Card from '../../ub-components/Card/Card'
import GenericButton from '../../ub-components/UButton/GenericButton'

import moment from 'moment'

class PhenomCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      onClick,
      className,
    } = this.props

    return (
      <div>adwad</div>
    )
  }
}

PhenomCardComponent.propTypes = {
  onClick : PropTypes.func,
  className : PropTypes.string,
}

PhenomCardComponent.defaultProps = {
  children : null,
  className : 'card',
}

export default PhenomCardComponent
