import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

import './styles/mplModalStyle.css'

class MplTermOfLoan extends Component {
render () {
  const { onClose, term, onSubmit } = this.props

return (
  <Modal
    onClose = { onClose }
    isDismisable = { true }>
    <div>
      <center>
        <h2>
          Term of Loan
          <br/>
          Housing Assistance Loan
        </h2>
        <h4>
        </h4>
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
MplTermOfLoan.propTypes = {
  onClose : PropTypes.func,
  term : PropTypes.array,
  onSubmit : PropTypes.func
}

export default MplTermOfLoan
