import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, CircularLoader, GenericButton } from '../../ub-components/'

import Presenter from './presenter/RemarksPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'
import './styles/remarks.css'

class ConfirmationModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showCircular : false,
      approve: true,
      remarks: ' ',
      isDismisable : true,
    }
  }

  onApprove () {
    this.presenter.updateRemarks(this.props.transactionId , true, ' ')
    this.setState({ showCircular : true, isDismisable : false })
  }

  onSuccess () {
    this.props.onClose()
    this.props.history.push('/mybenefits/transactions/approval')
  }

  onFailed () {
    this.setState({ showCircular : false, isDismisable : true })
  }

  render () {
    const {
      onClose,
      onYes,
    } = this.props

    const {
      showCircular,
      isDismisable
    } = this.state

    return (
      <Modal
        isDismisable = { isDismisable }
        onClose = { onClose }
      >
        {
          showCircular ?
          <center>
            <h3>Submitting Your Remarks</h3>
            <CircularLoader show = { true }/>
          </center>          :
          <div>
            <center>
            <h3>Are you sure you want to approve this request?</h3>
            <br/>
            <GenericButton className = { 'remarks-button-modal' }
              onClick = { () => this.onApprove() }
              text = { 'Yes' } />
            <GenericButton className = { 'remarks-button-modal' }
              onClick = { onClose }
              text = { 'Cancel' } />
            </center>
          </div>
        }

      </Modal>
    )
  }
}

ConfirmationModal.propTypes = {
  onYes : PropTypes.func,
  onClose : PropTypes.func,
}

ConfirmationModal.defaultProps = {

}

export default ConnectPartial(ConfirmationModal, Presenter)
