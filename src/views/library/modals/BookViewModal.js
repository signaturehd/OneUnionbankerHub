import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GenericButton } from '../../../ub-components'
import { Modal } from '../../../ub-components/'
import ConnectView from '../../../utils/ConnectView'
import Presenter from '../presenter/LibraryPresenter'
import BaseMVPView from '../../common/base/BaseMVPView'

import './styles.css'

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
      background : `rgba(0,0,0,0.5) url(${details.imageUrl})`,
      backgroundSize : 'cover',
    }

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        <div className = { 'library-view-container' }>
          <div style = {style}>
          </div>
          <div className = { '' } >
         <GenericButton onClick = { () => this.submitForm(details.id, 1) }
           text = { "Reserve" } />
          </div>
          <div className = { '' } >
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
