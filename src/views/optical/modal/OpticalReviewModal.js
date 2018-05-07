import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components/Modal/'
import Button from '../components/OpticalButton'
import './optical-modal.css'

import ConnectView from '../../../utils/ConnectView'
import Presenter from '../presenter/OpticalPresenter'
import BaseMVPView from '../../common/base/BaseMVPView'

class OpticalModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showOpticalModal : false,
    }

    this.submitForm = this.submitForm.bind(this)
  }
  submitForm () {
    const { fileReceived, fileReceived2 } = this.props
    this.presenter.addOptical(1000, fileReceived, fileReceived2)
  }

  render () {
    const { details, onClose, confirm, cancel, fileReceived, fileReceived2 } = this.props
    return (
        <Modal
          onClose = { onClose }>
          <div className = { 'optical-description' }>
              <h2>Description</h2>
          </div>
          <div className = { 'optical-modal-footer' }>
            <Button onClick = { () => this.submitForm() }
                    className = { 'optical-footer-left' }
                    text = { confirm } />
          </div>
          <div className = { 'optical-modal-footer' }>
            <Button className = { 'optical-footer-right' } text = { cancel } />
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
export default ConnectView(OpticalModal, Presenter)
