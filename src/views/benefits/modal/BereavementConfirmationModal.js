import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton} from '../../../ub-components/'

import './styles/modalStyle.css'

class BereavementConfirmationModal extends Component {
  constructor (props) {
    super (props)
    this.state = {
      disableSubmit : false,
      isDismisable : true
    }
  }

  render () {
    const {
      onYes,
      onClose
    } = this.props

    const {
       disableSubmit,
       isDismisable
    } = this.state

    return (
      <Modal
        onClose = { onClose }>
        <div>
          <center>
            <h2>Is the death certificate available?</h2>
            <br/>
            <p>We're sorry to hear about your loss. Please accept our sympathies. We'd like to help you on this time of need. Has the Death certificate been prepared?
            </p>
          </center>
          <div className = { 'confirmation-grid-action' } >
            <GenericButton
              onClick = { onClose }
              text = { 'no' } />
            <GenericButton
              onClick = { onYes }
              text = { 'yes' }
              disabled = {this.state.disabled}
            />
          </div>
        </div>
      </Modal>
    )
  }
}


BereavementConfirmationModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.func,
  yes : PropTypes.string,
  no : PropTypes.string,
}
BereavementConfirmationModal.defaultProps = {
  yes : 'Agree',
  no : 'Disagree',
}


export default BereavementConfirmationModal
