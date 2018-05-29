import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, CircularLoader, GenericButton } from '../../ub-components/'

import Presenter from './presenter/RemarksPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'


class ConfirmationModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showCircular : false,
      approve: true,
      remarks: " ",
    }
  }

  onApprove () {
    this.presenter.updateRemarks(this.props.transactionId , true, ' ')
    this.setState({ showCircular : true })
  }

  onSuccess () {
    this.props.onClose()
    this.props.history.push('/mybenefits/transactions/approval')
  }

  onFailed () {
    this.setState({ showCircular : true })
  }

  render () {
    const {
      onClose,
      onYes,
    } = this.props

    const {
      showCircular
    } = this.state

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        {
          showCircular ?
          <center>
            <h3>Submitting Your Remarks</h3>
            <CircularLoader show = {true}/>
          </center>
          :
          <div>
            <h3>Are you sure you want to approve this request?</h3>
            <GenericButton
              onClick = { () => this.onApprove() }
              text = { 'Yes' } />
            <GenericButton
              onClick = { onClose }
              text = { 'Cancel' } />
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
