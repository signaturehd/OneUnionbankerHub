import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../ub-components/'


class BookViewModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { onClose, details } = this.props
    return (
      <Modal
        onClose = { onClose }
      >
        <h1>{ details.title }</h1>
      </Modal>
    )
  }
}

BookViewModal.propTypes = {
  onClose: PropTypes.func,
  detail: PropTypes.object
}

BookViewModal.defaultProps = {

}

export default BookViewModal
