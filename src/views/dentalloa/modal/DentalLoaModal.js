import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components/Modal/'
import Button from '../components/DentalLoaButton'

class DentalLoaModal extends Component {
  constructor (props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
  }
  submitForm () {
  }

  render () {
  const { details, onClose, confirm, cancel, showRecipientModal, showHealthwayBranchModal, showProcedureModal } = this.props

  const Recipients = (
        <div>
          <div className = { 'optical-description' }>
            <h2>Recipients</h2>
        </div>
        <div className = { 'optical-modal-footer' }>
        </div>
      </div>
  )

  const HealthWayBranch = (
        <div>
        <div className = { 'optical-description' }>
            <h2>Health Way Branch</h2>
        </div>
        <div className = { 'optical-modal-footer' }>
        </div>
        </div>
  )

  const Procedure = (
      <div>
      <div className = { 'optical-description' }>
          <h2>Procedures</h2>
      </div>
      <div className = { 'optical-modal-footer' }>
      </div>
      </div>
)

    return (
      <Modal onClose = { onClose }>
        {
          showRecipientModal &&
            Recipients
        }
        {
          showHealthwayBranchModal &&
            HealthWayBranch
        }
        {
          showProcedureModal &&
            Procedure
        }
      </Modal>
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
