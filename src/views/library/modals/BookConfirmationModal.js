import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, CircularLoader, GenericButton } from '../../../ub-components/'

class BookConfirmationModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showCircular : false
    }

    this.onYes = this.onYes.bind(this)

  }

  onYes () {
    this.setState({showCircular : true})
    this.props.onYes()
  }

  render () {
    const {
      onClose,
      onYes,
      title
    } = this.props

    const {
      showCircular
    } = this.state

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        {
          showCircular ?
          <center>
            <h3>Submitting Your Request</h3>
            <CircularLoader show = {true}/>
          </center>
          :
          <div>
            <h3>Are you sure you want to {title} this book?</h3>
            <GenericButton
              onClick = { () => this.onYes()  }
              text = { 'Yes' } />
            <GenericButton
              onClick = { onClose }
              text = { 'Cancel' } />
          </div>
        }

      </Modal>
    )
  }
}

BookConfirmationModal.propTypes = {
  onYes : PropTypes.func,
  onClose : PropTypes.func,
  title : PropTypes.string
}

BookConfirmationModal.defaultProps = {

}

export default BookConfirmationModal
