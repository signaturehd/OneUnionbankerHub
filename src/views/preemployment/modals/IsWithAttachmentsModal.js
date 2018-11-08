import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
} from '../../../ub-components/'


class IsWithAttachmentsModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return(
      <Modal>
        <h2 className = { 'font-weight-bold font-size-20px' }>Confirmation</h2>
        <br/>
        <h2>Are you sure you want to submit ?</h2>
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

export default IsWithAttachmentsModal
