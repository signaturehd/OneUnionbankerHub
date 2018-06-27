import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../ub-components/'

class NoticeResponseModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { noticeResponse, onClose } = this.props
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
        <br/>
        <center><GenericButton text = {'OK'} onClick = { onClose }/></center>
        <br/>
        <br/>
      </Modal>
    )
  }
}

export default NoticeResponseModal
