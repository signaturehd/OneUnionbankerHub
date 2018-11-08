import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
} from '../../../ub-components/'


class IsTaxPayerConfirmModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onSendPageNumberToView } = this.props

    return(
      <Modal>
        <h2 className = { 'font-weight-bold font-size-20px' }>Confirmation</h2>
        <br/>
        <h2>Is your Taxpayer Identification Number(TIN) available?</h2>
        <br/>
        <div className = { 'grid-global ' }>
          <GenericButton
            className = { 'global-button' }
            text = { 'No' }
            onClick = { () => onSendPageNumberToView(12) }
            />
          <GenericButton
            onClick = { () => onSendPageNumberToView(11) }
            className = { 'global-button' }
            text = { 'Yes' }
            />
        </div>
    </Modal>
    )
  }
}

IsTaxPayerConfirmModal.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default IsTaxPayerConfirmModal
