import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
} from '../../../ub-components/'


class IsFinancialObilgationConfirmModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onSendPageNumberToView } = this.props

    return(
      <Modal>
        <h2 className = { 'font-weight-bold font-size-20px' }>Financial Obligation</h2>
        <br/>
        <h2>Do you have any financial obligation/s with any bank, financial institution, or individual?</h2>
        <br/>
        <div className = { 'grid-global ' }>
          <GenericButton
            className = { 'global-button' }
            text = { 'No' }
            onClick = { () => onSendPageNumberToView(2) }
            />
          <GenericButton
            onClick = { () => onSendPageNumberToView(1) }
            className = { 'global-button' }
            text = { 'Yes' }
            />
        </div>
    </Modal>
    )
  }
}

IsFinancialObilgationConfirmModal.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default IsFinancialObilgationConfirmModal
