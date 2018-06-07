import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '../../../ub-components/'
import ConnectView from '../../../utils/ConnectView'
import Presenter from '../presenter/LibraryPresenter'
import BaseMVPView from '../../common/base/BaseMVPView'

import './styles/bookModal.css'

class BookBorrowModal extends BaseMVPView {
  constructor (props) {
    super(props)
  }
  ReserveBook (id,quantity) {
  this.props.presenter.ReserveBook(id,quantity)
    }

 submitForm (id, quantity) {
    this.presenter.ReserveBook(id, quantity)
  }

  render () {
    const { onClose, details, borrowed,detail } = this.props

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        <div>
          <h4>Title: {detail && detail.book && detail.book.title}</h4>
          <h4>ISBN #: {detail && detail.book && detail.book.isbnNumber}</h4>
          <h4>Application Date: {detail && detail.date && detail.date.application}</h4>
          <h4>Status: {detail && detail.status && detail.status}</h4>
          <h4>Reference #: {detail && detail.status && detail.referencenumber}</h4>
        </div>
      </Modal>
    )
  }
}

BookBorrowModal.propTypes = {
  onClose: PropTypes.func,
  detail: PropTypes.object,
}

export default ConnectView (BookBorrowModal, Presenter)
