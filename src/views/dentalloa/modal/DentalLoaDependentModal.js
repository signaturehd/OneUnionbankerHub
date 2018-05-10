import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components/'
import Button from '../components/DentalLoaButton'

class DentalLoaDependentModal extends Component {
  constructor (props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
  }
  submitForm () {
  }

  render () {
  const { details, onClose, confirm, cancel, showDependentModal } = this.props

  return (
    <Modal
     onClose = { onClose }
     isDismissable = { true }
   >
      <div className = { 'optical-description' }>
        <h2>Dependent</h2>
      </div>
      <div className = { 'optical-modal-footer' }>
      </div>
    </Modal>
    )
  }
}
DentalLoaDependentModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.array,
  confirm : PropTypes.string,
  cancel : PropTypes.string,
}
DentalLoaDependentModal.defaultProps = {
  confirm : 'Agree',
  cancel : 'Disagree',
}
export default DentalLoaDependentModal
