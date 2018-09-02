import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/NoticePresenter'

import {
  InputModal,
  Card,
  Modal,
  GenericButton,
  GenericInput,
  CircularLoader,
  FloatingActionButton
 } from '../../ub-components'

import { RequiredNumberValidation } from '../../utils/validate/'
import ResponseModal from './NoticeResponseModal'
import './styles/notice-styles.css'


import store from '../../store'
import { NotifyActions } from '../../actions'

class NoticePinModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      enabledLoader : false,
      uniquePIN : '',
      showNoticeResponseModal : false,
      showPinCodeModal : true,
      noticeResponse: '',
    }
  }

  noticeResponseFunc (noticeResponse, showNoticeResponseModal, showPinCodeModal) {
    this.setState({ noticeResponse, showNoticeResponseModal, showPinCodeModal })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  isAgree (tranId, isAgree, benId) {
    this.presenter.updateNotice(tranId, isAgree, benId)
  }

  onSubmit (pin) {
    this.presenter.validateEmployeePin(pin)
  }

  render () {
    const {
      history,
      onClick,
      onClose,
      onSubmitAgreement
    } = this.props
    const {
      enabledLoader,
      noticeResponse,
      showNoticeResponseModal,
      showPinCodeModal,
      uniquePIN,
    } = this.state

    return (
      <div>
        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose = { () => {
              this.setState({ showNoticeResponseModal : false })
              onSubmitAgreement()
            }}
            noticeResponse = { noticeResponse }
          />
        }
        {
          showPinCodeModal &&
          <Modal
            width = { 40 }
            >
            <div>
              {
                enabledLoader ?
                <center className = { 'circular-loader-center' }>
                  <h2>Please wait while validating your registered pin</h2>
                  <br/>
                  <CircularLoader show = { enabledLoader }/>
                </center> :
                <center>
                  <div className = { 'grid-global-row' }>
                    <span className = { 'lock-icon lock-icon-settings' }/>
                    <h2 className = { 'font-size-12px' }>Please enter your registered digital signature (PIN).</h2>
                  </div>
                  <GenericInput
                    className = { 'generic-pin' }
                    hint = { '* * * * *' }
                    maxLength = { 5 }
                    type = { 'password' }
                    onChange = { (e) => {
                      new RequiredNumberValidation().isValid(e.target.value) ?
                      this.setState({ uniquePIN : e.target.value }) :
                      this.setState({ uniquePIN : '' })
                      }
                    }
                    value = { uniquePIN }
                    errorMessage = { 'Please enter your 5-digit PIN' }
                    />
                  <br/>
                  <GenericButton
                    type = { 'button' }
                    text = { 'Submit' }
                    onClick = {
                      () => {
                        this.onSubmit(uniquePIN)
                      }
                    }
                    className={ 'compliance-buttons compliance-submit' }
                    />
                </center>
              }
            </div>
          </Modal>
        }
      </div>
    )
  }
}

NoticePinModal.propTypes = {
  onClick: PropTypes.func,
  onSubmitAgreement: PropTypes.func,
  onClose: PropTypes.func,
  history: PropTypes.object,
}

export default ConnectView(NoticePinModal, Presenter)
