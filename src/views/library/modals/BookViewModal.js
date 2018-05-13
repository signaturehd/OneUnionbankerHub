import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GenericButton } from '../../../ub-components'
import { Modal } from '../../../ub-components/'
import ConnectView from '../../../utils/ConnectView'
import Presenter from '../presenter/LibraryPresenter'
import BaseMVPView from '../../common/base/BaseMVPView'

import './styles.css'
import staticImage from '../../../images/education_bg.jpg'

class BookViewModal extends BaseMVPView {
  constructor (props) {
    super(props)

  }
  ReserveBook(id,quantity){
  this.props.presenter.ReserveBook(id,quantity)
    }

 submitForm (id, quantity) {
    this.presenter.ReserveBook(id, quantity)
  }

  render () {
    const { onClose, details} = this.props
    console.log(details)

    const style = {
      background : `rgba(0,0,0,0.5) url(${staticImage}) no-repeat center center`,
      backgroundSize : '450px 200px',
      width: '-webkit-fill-available',
    }

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        <div className = { 'library-view-container' }>
          <div style = {style} />
        <div className = { 'library-details' }>
          <div className ="title">
            <h4>Title: {details.title}</h4>
            <h4>Description: {details.descriptions}</h4>
            <h4>ISBN #: {details.isbnNumber}</h4>
            <h4>Author: {details.author}</h4>
            <h4>Publisher: {details.publisher}</h4>
            <h4>Available Copies: {details.availableCopies}</h4>
        </div>
        </div>
        <div className = { 'center' } >
         <GenericButton onClick = { () => this.submitForm(details.id, 1) }
           text = { "Reserve" } />
          </div>
        </div>
      </Modal>
    )
  }
}

BookViewModal.propTypes = {
  onClose: PropTypes.func,
  detail: PropTypes.object,
}

export default ConnectView (BookViewModal, Presenter)
