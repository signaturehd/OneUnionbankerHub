import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components/'
import Button from '../components/OpticalButton'
import './optical-modal.css'

class OpticalModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showOpticalModal : false,
    }
  }


  render () {
    const { details, onClose, confirm, cancel, fileReceived, fileReceived2, amount, submitForm } = this.props
    return (
        <Modal
          isDismisable = { true }
          onClose = { onClose }>
          <div className = { 'optical-description' }>
              <h2>Description</h2>

          </div>
          <div className = { 'optical-modal-footer' } >
            <Button
              onClick = { () => submitForm(fileReceived, fileReceived2, amount) }
              className = { 'optical-footer-left' }
              text = { confirm }
            />
          </div>
          <div className = { 'optical-modal-footer' }>
            <Button className = { 'optical-footer-right' } text = { cancel } onClick = { () => onClose } />
          </div>
        </Modal>
      )
  }
}
OpticalModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.func,
  confirm : PropTypes.string,
  cancel : PropTypes.string,
}
OpticalModal.defaultProps = {
  confirm : 'Agree',
  cancel : 'Disagree',
}
export default OpticalModal
