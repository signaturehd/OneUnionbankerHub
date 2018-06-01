import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../ub-components/'

class NoticeResponseModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { noticeResponse, onClose, onDismiss } = this.props
    return (
      <Modal
        isDismissable = { false }
        onClose = { onClose }
      >
        {
          noticeResponse &&
          noticeResponse.message
        }
        <br/>
        <center><GenericButton text = {'OK'} onClick = { onClose }/></center>
      </Modal>
    )
  }
}

export default NoticeResponseModal
