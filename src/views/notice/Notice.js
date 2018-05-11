import React from 'react'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/NoticePresenter'
import ConnectView from '../../utils/ConnectView'

import PropTypes from 'prop-types'

import { Modal, GenericTextBox, GenericButton } from '../../ub-components/'

class Notice extends BaseMVPView {
  constructor (props) {
    super(props)
    this.onFailed = this.onFailed.bind(this)
  }

  isAgree (tranId, isAgree, benId) {
    this.presenter.updateNotice(tranId, isAgree, benId)
  }

  onSuccess (response) {
    this.props.onDismiss(false, response)
  }

  onFailed (response) {
    this.props.onDismiss(false)
  }

  render () {
    const { noticeResponse, onClose, back, benefitId, onDismiss } = this.props
    return (
      <Modal
        isDismissable = { false }
        onClose = { onClose }
      >
      { super.render() }
        {
          noticeResponse.forms &&
          noticeResponse.forms.map((form, key)=>
            <div key = { key }>
              <div dangerouslySetInnerHTML = {{__html : form.form}}></div>
            </div>
          )
        }
          <GenericButton text = {'Agree'} onClick = { () => this.isAgree(noticeResponse.transactionId, 1, benefitId)}/>
          <GenericButton text = {'Disagree'} onClick = { () => this.isAgree(noticeResponse.transactionId, 0, benefitId)}/>
      </Modal>
    )
  }
}

export default ConnectView(Notice, Presenter)
