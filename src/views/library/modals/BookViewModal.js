import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GenericButton } from '../../../ub-components' 
import { Modal } from '../../../ub-components/'
import ConnectView from '../../../utils/ConnectView'
import Presenter from '../presenter/LibraryPresenter'

import './styles.css'

class BookViewModal extends Component {
  constructor (props) {
    super(props)
    this.submitForm = this.submitForm.bind(this)
  }
 submitForm () {
    const { id, quantity } = this.props
    this.presenter.postBooksReservation(id, quantity)
  }
  render () {
    const { onClose, details } = this.props
    console.log(details)

    const style = {
      background : `url(${details.imageUrl}) rgba(0,0,0,0.5)`,
      backgroundSize : 'cover',
      backgroundPosition : 'center',
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
         <GenericButton onClick = { () => this.submitForm() }
                    
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

export default BookViewModal
