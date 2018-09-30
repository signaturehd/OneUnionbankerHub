import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
} from '../../../ub-components/'


class IsMarriedConfirmModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onSendPageNumberToView, showChildrenConfirmModalFunc } = this.props

    return(
      <Modal>
        <h2>Are you married?</h2>
        <br/>
        <div className = { 'grid-global ' }>
          <GenericButton
            className = { 'global-button' }
            text = { 'No' }
            onClick = { () => showChildrenConfirmModalFunc() }
            />
          <GenericButton
            onClick = { () => onSendPageNumberToView(17) }
            className = { 'global-button' }
            text = { 'Yes' }
            />
        </div>
    </Modal>
    )
  }
}

IsMarriedConfirmModal.propTypes = {
  onSendPageNumberToView : PropTypes.func,
  showChildrenConfirmModalFunc : PropTypes.func
}

export default IsMarriedConfirmModal
