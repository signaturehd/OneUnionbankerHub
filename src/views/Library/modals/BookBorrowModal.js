import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, GenericButton } from '../../../ub-components/'
import ConnectView from '../../../utils/ConnectView'
import Presenter from '../presenter/LibraryPresenter'
import BaseMVPView from '../../common/base/BaseMVPView'
import moment from 'moment'

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

  checkedDate (date) {
    return moment(date).format('dddd, MMMM DD, YYYY, hh:mm:ss A')
  }

  checkStatus (status) {
    if(status.toLowerCase() === 'pending') {
      return true
    } else if (status.toLowerCase() === 'for pickup') {
       return true
    } else {
      return false
    }
  }

  render () {
    const {
      onClose,
      details,
      borrowed,
      detail,
      cancelRequest,
      showConfirmation,
      confirmation
    } = this.props

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        <div>
          <h4 className = { 'font-weight-lighter font-size-14px' }>Title: {detail && detail.book && detail.book.title}</h4>
          <h4 className = { 'font-weight-lighter font-size-14px' }>ISBN #: {detail && detail.book && detail.book.isbnNumber}</h4>
          <h4 className = { 'font-weight-lighter font-size-14px' }>Application Date: {detail && detail.date && this.checkedDate(detail.date.application)}</h4>
          <h4 className = { 'font-weight-lighter font-size-14px' }>Status: {detail && detail.status && detail.status}</h4>
          <h4 className = { 'font-weight-lighter font-size-14px' }>Reference #: {detail && detail.status && detail.referenceNumber}</h4>
          <br/>
          <center>
            {
              showConfirmation ?
              <div>
                <h4 className = { 'font-weight-lighter font-size-14px' }>Are you sure you want to cancel?</h4>
                <br/>
                <div className = { 'grid-global' }>
                  <GenericButton
                    className = { 'profile-button-medium cursor-pointer global-button' }
                    text = { 'Cancel' }
                    onClick = { () => cancelRequest(false) }
                    />
                  <GenericButton
                    text = { 'Submit' }
                    className = { 'profile-button-medium cursor-pointer global-button' }
                    onClick = { () => confirmation(detail && detail.id) }
                    />
                </div>
              </div>
            :

            <div>
              {
                this.checkStatus (detail && detail.status) &&
                <GenericButton
                  className = { 'profile-button-medium cursor-pointer global-button' }
                  text = { 'Cancel Request' }
                  onClick = { () =>
                    cancelRequest(true)
                  }
                />
              }
            </div>
            }
          </center>
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
