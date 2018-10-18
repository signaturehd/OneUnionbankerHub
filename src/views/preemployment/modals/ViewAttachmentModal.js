import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
} from '../../../ub-components/'

import './styles/modalStyles.css'

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
      width = { 80 }
      >
      <center>
      <iframe src = { file }  className = { 'image-size' }/>
      </center>
          <br/>
          <center>
            <GenericButton
              text = { 'Close' }
             onClick = { () => onClose() }
            />
          </center>
      </Modal>
    )
  }
}

ViewAttachmentModal.propTypes = {
  onClose : PropTypes.func
}

export default ViewAttachmentModal
