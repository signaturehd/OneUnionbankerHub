import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, CircularLoader, GenericButton } from '../../../ub-components/'

class ConfirmationModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showCircular : false,
      approve: true,
      remarks: " ",
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
            <h3>Submitting Your Response</h3>
            <CircularLoader show = {true}/>
          </center>
          :
          <div>
            <h3>Are you sure you want to approve this request?</h3>
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

ConfirmationModal.propTypes = {
  onYes : PropTypes.func,
  onClose : PropTypes.func,
}

ConfirmationModal.defaultProps = {

}

export default ConfirmationModal
