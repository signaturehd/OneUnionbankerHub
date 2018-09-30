import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
} from '../../../ub-components/'


class IsChildrenConfirmModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onSendPageNumberToView } = this.props
    console.log('test')
    return(
      <Modal>
        <br/>
        <h2>Do you have any children?</h2>
        <br/>
        <div className = { 'grid-global ' }>
          <GenericButton
            className = { 'global-button' }
            text = { 'No' }
            onClick = { () => onSendPageNumberToView(18) }
            />
          <GenericButton
            onClick = { () => onSendPageNumberToView(19) }
            className = { 'global-button' }
            text = { 'Yes' }
            />
        </div>
    </Modal>
    )
  }
}

IsChildrenConfirmModal.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default IsChildrenConfirmModal
