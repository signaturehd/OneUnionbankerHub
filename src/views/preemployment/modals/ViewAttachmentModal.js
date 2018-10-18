import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
} from '../../../ub-components/'


class ViewAttachmentModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      file,
      onClose
    } = this.props
    return(
      <Modal
      isDismissable = { true }
      width = { 80 }>
        <div>
          <img src = { file } width = { '100%' } height = { '100%' }/>
          <br/>
          <center>
            <GenericButton
              text = { 'Close' }
             onClick = { () => onClose() }
            />
          </center>
        </div>
      </Modal>
    )
  }
}

ViewAttachmentModal.propTypes = {
  onClose : PropTypes.func
}

export default ViewAttachmentModal
