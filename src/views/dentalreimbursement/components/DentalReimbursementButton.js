import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

import  GenericButton  from  '../../../ub-components/UButton/GenericButton'

class DentalReimbursement extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { text, showDentalReimbursementModal, showConfirmation, onClick} = this.props
    return (
      <GenericButton
        text = { text }
        onClick = { onClick }
        className = { 'dentalreimbursement-button' }>
      </GenericButton>
    )
  }
}

DentalReimbursementButton.propTypes = {
  text : PropTypes.string,
  onClick : PropTypes.func,
  proceedModal : PropTypes.func,
}
DentalReimbursementButton.defaultProps ={
  text : 'Submit',
}
export default DentalReimbursementButton
