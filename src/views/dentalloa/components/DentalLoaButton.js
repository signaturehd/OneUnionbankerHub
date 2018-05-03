import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

import  GenericButton  from  '../../../ub-components/UButton/GenericButton'

class DentalLoaButton extends Component {
  constructor (props) {
    super(props)
  }


  render () {
    const { text, showModal, showConfirmation} = this.props
    return (
      <GenericButton
        text = { text }
        className = { 'dentalloa-button' }>
      </GenericButton>
    )
  }
}

DentalLoaButton.propTypes = {
  text : PropTypes.string,
  onClick : PropTypes.func,
  proceedModal : PropTypes.func,
}
DentalLoaButton.defaultProps ={
  text : 'Submit',
}
export default DentalLoaButton
