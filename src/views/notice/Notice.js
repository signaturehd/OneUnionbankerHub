import React from 'react'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/NoticePresenter'
import ConnectView from '../../utils/ConnectView'

import PropTypes from 'prop-types'

import {
  Modal,
  GenericTextBox,
  GenericButton,
  CircularLoader,
  Card,
} from '../../ub-components/'
import NoticePinModal from './NoticePinModal'
import './styles/notice-styles.css'

class Notice extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      disableSubmit : false,
      showValidatedCofirmation: false,
      showCancelCofirmation: false,
      showPinCodeModal : false,
      tranId : '',
      isAgree: '',
      benId : '',
    }
    this.onFailed = this.onFailed.bind(this)
  }

  isAgree (tranId, isAgree, benId) {
    this.setState({ tranId, isAgree, benId })
  }

  isAgreementConfirm (tranId, isAgree, benId) {
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
    const {
      isDismissable,
      disableSubmit,
      showValidatedCofirmation,
      showCancelCofirmation,
      showPinCodeModal,
      tranId,
      isAgree,
      benId
    } = this.state

    return (
    <Modal
        width={ 45 }
        isDismissable = { isDismissable }
        onClose = { onClose }
      >
      { super.render() }
        {
          noticeResponse.forms &&
          noticeResponse.forms.map((form, key) =>
            <div key = { key }>
              <div dangerouslySetInnerHTML = {{ __html : form.form }}></div>
              <br/>
              {
              form.aggregateMessage ?
                <Card>
                  <div dangerouslySetInnerHTML = {{ __html : form.aggregateMessage }}></div>
                </Card> :
                <div></div>
              }
            </div>
          )
        }
        {
          showPinCodeModal &&
          <NoticePinModal
            onSubmitAgreement = { () => this.isAgreementConfirm(tranId, isAgree, benId) }
          />
        }
        {
          disableSubmit || isDismissable ?
          <center>
            <CircularLoader show={true}/>
          </center>          :
          <div>
          <center>
            <br/>
            <br/>
            <GenericButton text = {'Disagree'} className = { 'notice-button-modal notice-disagree' }
              onClick = { () => {
                this.setState({ isDimissable : true, disableSubmit: true, showPinCodeModal : true })
                this.isAgree(noticeResponse.transactionId.toString(), 0, benefitId)
                }
              }
            />
            <GenericButton text = {'Agree'} className = { 'notice-button-modal notice-agree' }
              onClick = { () => {
                this.setState({ isDimissable : true, disableSubmit: true, showPinCodeModal : true  })
                this.isAgree(noticeResponse.transactionId.toString(), 1, benefitId)
              }
              }
            />
          </center>
        </div>
      }
    </Modal>
    )
  }
}

export default ConnectView(Notice, Presenter)
