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

import './styles/notice-styles.css'


import store from '../../store'
import { NotifyActions } from '../../actions'

class NoticePinModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      enabledLoader : false,
      pin : '',
      showNoticeResponseModal : false,
    }
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  render () {
    const { history, onClick } = this.props
    const {
      enabledLoader,
      showEnterPin,
      noticeResponse,
      showNoticeResponseModal,
    } = this.state

    return (
      <div>
      {
        showNoticeResponseModal &&
        <ResponseModal
          onClose = { () => {
            this.setState({ showNoticeResponseModal : false })
            this.navigate()
          }}
          noticeResponse = { noticeResponse }
        />
      }
        <Modal
          onClose={ onClose }
          isDismisable={ true }
          >
          <div>
            <p className = { 'pin-label' }>Please enter your registered digital signature (PIN).</p>
            <GenericInput
              autocomplete = { 'off' }
              value = { pin }
              onChange = { e => this.setState({ pin : parseInt(e.target.value) || '' }) }
              text = { 'Password' }
              type = { 'password' }
              maxLength = { 5 }
              inputProps = { 'pin-label' }
            />
            <p className={ 'pin-label font-12' }>Please enter your 5-digits code</p>
            <br/>
            <GenericButton
              type = { 'button' }
              text = { 'Submit' }
              onClick = {
                () => {
                  this.onSubmit()
                }
              }
              className={ 'compliance-buttons compliance-submit' }
              />
          </div>
        </Modal>
      {
        enabledLoader ?
        <center className = { 'circular-loader-center' }>
          <CircularLoader show = { enabledLoader }/>
        </center> :
      }
      </div>
    )
  }
}

NoticePinModal.propTypes = {
  setSelectedNavigation: PropTypes.func,
  onClick: PropTypes.func,
  history: PropTypes.object,
}

export default ConnectView(NoticePinModal, Presenter)
