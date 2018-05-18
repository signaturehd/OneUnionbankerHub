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
        <GenericButton text = {'OK'} onClick = { onClose }/>
      </Modal>
    )
  }
}

export default NoticeResponseModal
