import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components'

class CarUnavailableContentModal extends Component {

  constructor (props) {
      super(props)
  }

  render () {
    const { onClose, onClick } = this.props

    return (
      <Modal
        onClose={ onClose }
      >
        <center><h2>The current feature is not available yet.</h2></center>
        <br/>
        <br/>
        <center>
          <GenericButton
            onClick={ onClick }
            text={ 'Ok' }/>
        </center>
      </Modal>
    )
  }
}

CarUnavailableContentModal.propTypes = {
  onClose : PropTypes.func,
  onUserConfirmation : PropTypes.func
}

export default CarUnavailableContentModal
