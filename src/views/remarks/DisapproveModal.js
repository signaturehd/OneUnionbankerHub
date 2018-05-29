import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter/RemarksPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'

import './styles/remarks.css'

import { Modal, CircularLoader, GenericButton } from '../../ub-components/'

class DisapproveModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showCircular : false,
      approve : false,
      remarks : null
    }
  }

  componentDidMount () {
    // console.log(this.presenter)
    this.presenter.getRemarks(this.props.benefitId)
  }

  onDisapprove (remarks) {
    this.presenter.updateRemarks(this.props.transactionId , false, remarks)
    this.props.onClose()
    // TODO show loading here
  }

  getRemarks (remarks) {
    this.setState({remarks})
  }

  render () {
    const {
      onClose,
      onNo,
    } = this.props

    const {
      showCircular,
      remarks
    } = this.state

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        {
          remarks ?
            remarks.map((remark, key) => (
              <div>
                <GenericButton
                    key = { key }
                    className = { 'remarks-button' }
                    text = {remark.remarks}
                    onClick = { () => this.onDisapprove(remark.remarks)}
                />
              </div>
            ))
            :
            <center>
              <h3>Please wait a moment</h3>
              <CircularLoader show = {true} />
            </center>
        }

      </Modal>
    )
  }
}

DisapproveModal.propTypes = {
  onNo : PropTypes.func,
  onClose : PropTypes.func,
}

DisapproveModal.defaultProps = {

}

export default ConnectPartial(DisapproveModal, Presenter)
