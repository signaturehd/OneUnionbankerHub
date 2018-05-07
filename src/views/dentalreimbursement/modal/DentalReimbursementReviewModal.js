import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components/Modal/'
import Button from '../components/DentalReimbursementButton'
import './dentalreimbursement-modal.css'

class DentalReimbursementModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDentalReimbursementModal : false,
    }

    this.submitForm = this.submitForm.bind(this)
  }
  submitForm ()
  {
    console.log(this.props.fileReceived)
    console.log(this.props.fileReceived2)
  }

  render () {
    const { details, onClose, confirm, cancel, fileReceived, fileReceived2 } = this.props
    return (
        <Modal
          onClose = { onClose }>
          <div className = { 'dentalreimbursement-description' }>
              <h2>Description</h2>
          </div>
          <div className = { 'dentalreimbursement-modal-footer' }>
            <Button onClick = { () => this.submitForm() }
                    className = { 'dentalreimbursement-footer-left' }
                    text = { confirm } />
          </div>
          <div className = { 'dentalreimbursement-modal-footer' }>
            <Button className = { 'dentalreimbursement-footer-right' } text = { cancel } />
          </div>
        </Modal>
      )
  }
}
DentalReimbursementModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.func,
  confirm : PropTypes.string,
  cancel : PropTypes.string,
}
DentalReimbursementModal.defaultProps = {
  confirm : 'Agree',
  cancel : 'Disagree',
}
export default DentalReimbursementModal
