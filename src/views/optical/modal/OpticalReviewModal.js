import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components/Modal/'
import Button from '../components/OpticalButton'
import './optical-modal.css'

class OpticalModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details, onClose, confirm, cancel } = this.props
    return (

        <Modal
          onClose = { onClose }>
          <div className = { 'optical-description' }>
              <h2>Description</h2>
          </div>
          <div className = { 'optical-modal-review' }>
            <div className = { 'optical-image-view' }>
              <div className = { 'optical-image-layer' }></div>
            </div>
            <div className = { 'optical-image-view' }>
              <div className = {  'optical-image-layer' }></div>
            </div>
          </div>
          <div className = { 'optical-modal-footer' }>
            <Button className = { 'optical-footer-left' } text = { confirm }></Button>
          </div>
          <div className = { 'optical-modal-footer' }>
            <Button className = { 'optical-footer-right' } text = { cancel } ></Button>
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
  confirm : 'Submit',
  cancel : 'Cancel',
}
export default OpticalModal
