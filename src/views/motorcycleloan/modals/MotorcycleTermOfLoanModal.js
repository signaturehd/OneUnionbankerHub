import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

import './styles/motorModalStyle.css'

class MotorcycleTermOfLoan extends Component {
  render () {
    const { onClose, term, onSubmit } = this.props

  return (
    <Modal
      onClose = { onClose }
      isDismisable = { true }>
      <div>
        <center>
          <span className={ 'mpl-icons mpl-term-icon' }/>
          <h2 className={ 'font-weight-normal' }>
            Term of Loan
          </h2>
          <h5 className={ 'font-size-14px font-weight-lighter' }>Choose your desired term of loan</h5>
            <br/>
        </center>
      </div>
      <div>
        {
          term && term.map((resp, key) =>
          <GenericButton
            className = { 'mpl-poa-modal-button' }
            key = { key }
            text = {`${resp && resp.term} Months, (${resp && resp.rate}% Interest)` }
            onClick = { () => onSubmit(resp, false) }/>
          )
        }
      </div>
    </Modal>
      )
    }
}
MotorcycleTermOfLoan.propTypes = {
  onClose : PropTypes.func,
  term : PropTypes.array,
  onSubmit : PropTypes.func
}

export default MotorcycleTermOfLoan
