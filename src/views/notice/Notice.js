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
      showDisagreeModal : false,
      tranId : '',
      isAgree: '',
      benId : '',
      enabledLoader : false,
    }
  }

  componentDidMount () {
    try {
      this.presenter.getPinCode()

    } catch (e) {
      console.log(e)
    }
  }

  isAgree (tranId, isAgree, benId) {
    this.setState({ tranId, isAgree, benId })
  }

  isAgreementConfirm (tranId, isAgree, benId, code) {
    this.presenter.updateNotice(tranId, isAgree, benId, code)
  }

  onSuccess (response) {
    this.props.onDismiss(false, response)
  }

  onFailed () {
    this.setState({ disableSubmit : false, showPinCodeModal : false })
  }

  circularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  setPinCodeStatus (showPinCodeModal) {
    this.setState({ showPinCodeModal })
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
      benId,
      showDisagreeModal,
      enabledLoader
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
          enabledLoader &&
          <CircularLoader
            show = { enabledLoader }/>
        }
        {
          showDisagreeModal &&
          <Modal>
            <center>
              <h2>By disagreeing, your application will not proceed. Are you sure you want to cancel?</h2>
              <br/>
              <div className = { 'grid-global' }>
                <GenericButton
                  text = { 'Cancel' }
                  onClick = { () => this.setState({ showDisagreeModal : false }) }
                />
                <GenericButton
                  text = { 'Yes' }
                  onClick = { () => {
                    this.setState({ isDimissable : true, disableSubmit: true, showDisagreeModal: false })
                    this.presenter.updateNotice(noticeResponse.transactionId.toString(), 0, benefitId, '')
                  } }
                />
              </div>
            </center>
          </Modal>
        }
        {
          !showPinCodeModal &&
          <NoticePinModal
            onSubmitAgreement = { (code) => this.isAgreementConfirm(tranId, isAgree, benId, code) }
            enabledLoader = { enabledLoader }
          />
        }
        {
          disableSubmit ?
          <center>
          </center>   :
          <div>
          <center>
            <br/>
            <br/>
            <GenericButton text = {'Disagree'} className = { 'notice-button-modal notice-disagree' }
              onClick = { () =>
                this.setState({ showDisagreeModal : true })
              }
            />
            <GenericButton text = {'Agree'} className = { 'notice-button-modal notice-agree' }
              onClick = { () => {
                  try {
                    if(showPinCodeModal) {
                      this.setState({ disableSubmit: true, showPinCodeModal : true  })
                      this.presenter.updateNotice(noticeResponse.transactionId.toString(), 1, benefitId, '')
                    } else {
                      this.setState({ disableSubmit: true })
                      this.isAgree(noticeResponse.transactionId.toString(), 1, benefitId)
                    }
                  } catch (e) {
                    console.log(e)
                  }
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
