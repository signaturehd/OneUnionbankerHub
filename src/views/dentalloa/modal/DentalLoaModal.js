import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components/Modal/'
import Button from '../components/OpticalButton'
import './optical-modal.css'

class DentalLoaModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showOpticalModal : false,
    }

    this.submitForm = this.submitForm.bind(this)
  }
  submitForm ()
  {
  }

  render () {
    const { details, onClose, confirm, cancel } = this.props

    const Recipients = () => (
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

  const HealthWayBranch = () => (
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

  const Procedure = () => (
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

    return (
        <div render = {Procedure}>
        </div>
      )
  }
}
DentalLoaModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.func,
  confirm : PropTypes.string,
  cancel : PropTypes.string,
}
DentalLoaModal.defaultProps = {
  confirm : 'Agree',
  cancel : 'Disagree',
}
export default DentalLoaModal
