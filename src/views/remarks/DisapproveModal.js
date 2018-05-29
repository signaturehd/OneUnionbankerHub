import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter/RemarksPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'

import './styles/remarks.css'

import { Modal, CircularLoader, GenericButton, GenericTextBox } from '../../ub-components/'

class DisapproveModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showCircular : false,
      approve : false,
      showOthers : false,
      remarks : null,
      remarksText : null
    }
  }

  componentDidMount () {
    this.presenter.getRemarks(this.props.benefitId)
  }

  onDisapprove (remarks) {
    this.presenter.updateRemarks(this.props.transactionId , false, remarks)
    this.setState({ showCircular : true, isDismisable : false })
  }

  onSuccess () {
    this.props.history.push('/mybenefits/transactions/approval')
    this.props.onClose()
  }

  onFailed () {
    this.setState({ showCircular : false, isDismisable : true })
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
      remarks,
      showOthers,
      remarksText,
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
            <CircularLoader show = {true} />
          </center>
          :
            showOthers ?
            <div>
              <GenericTextBox
                onChange = { (e) => this.setState({ remarksText : e.target.value }) }
              />
              <div className = {'remarks-button-grid'}>
                <GenericButton
                  className = { 'remarks-button' }
                  text = { 'Back' }
                  onClick = { () => this.setState({ showOthers : false })}
                />
                <GenericButton
                  className = { 'remarks-button' }
                  text = { 'Submit' }
                  onClick = { () => this.onDisapprove(remarksText)}
                />
              </div>
            </div>
            :
              remarks ?
                remarks.map((remark, key) => (
                  <div>
                    { remark.id !== 9 ?
                      <GenericButton
                        key = { key }
                        className = { 'remarks-button' }
                        text = {remark.remarks}
                        onClick = { () => this.onDisapprove(remark.remarks)}
                      />
                      :
                      <GenericButton
                          key = { key }
                          className = { 'remarks-button' }
                          text = { 'Otheres (Please Specify)' }
                          onClick = { () => this.setState({showOthers : true})}
                      />
                    }
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
