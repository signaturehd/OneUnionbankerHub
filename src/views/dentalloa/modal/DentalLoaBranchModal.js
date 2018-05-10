import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components/'
import Button from '../components/DentalLoaButton'

class DentalLoaModal extends Component {
  constructor (props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
  }
  submitForm () {
  }

  render () {
  const { details, onClose, confirm, cancel, showHealthwayBranchModal } = this.props

  return (
    <Modal
      onClose = { onClose }
      isDismissable = { true }
    >
      <div className = { 'optical-description' }>
        <h2>Recipients</h2>
      </div>
      <div className = { 'optical-modal-footer' }>
      </div>
    </Modal>
    )
  }
}
DentalLoaModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.array,
  confirm : PropTypes.string,
  cancel : PropTypes.string,
}
DentalLoaModal.defaultProps = {
  confirm : 'Agree',
  cancel : 'Disagree',
}
export default DentalLoaModal
