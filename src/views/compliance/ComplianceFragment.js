import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/CompliancePresenter'
import ResponseModal from '../notice/NoticeResponseModal'
import {
  InputModal,
  Card,
  Modal,
  GenericButton,
  GenericInput,
  CircularLoader,
  FloatingActionButton,
  Line
 } from '../../ub-components'

import './styles/compliancesStyle.css'


import store from '../../store'
import { NotifyActions } from '../../actions'

class ComplianceFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      enabledLoader : false,
      compliancesData : null,
      showEnterPin : false,
      pin : '',
      noticeResponse : null,
      showNoticeResponseModal : false,
      loadingModal : false,
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(9)
    this.presenter.getCompliancesPdf()
  }

  onSubmit () {
    const { pin, showEnterPin } = this.state

    if (pin === null || pin === '') {
      store.dispatch(NotifyActions.addNotify({
         title : 'Code of Conduct' ,
         message : 'Pin is empty',
         type : 'warning',
         duration : 2000
       })
     )
   } else if (String(pin).length < 5) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Code of Conduct' ,
         message : 'Please enter your 5-digits code',
         type : 'warning',
         duration : 2000
       })
     )
    } else {
      this.presenter.submitPin(String(pin))
      this.setState({ showEnterPin : false, pin : '' })
    }
  }

  circularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  modalLoader (loadingModal) {
    this.setState({ loadingModal })
  }

  setCompliancesPdf (compliancesData) {
    this.setState({ compliancesData })
  }

  noticeResponse (noticeResponse, showNoticeResponseModal) {
    this.setState({ noticeResponse, showNoticeResponseModal, showEnterPin : false })
  }

  navigate () {
    this.props.history.push('/')
  }

  render () {
    const { history, onClick } = this.props
    const {
      compliancesData,
      enabledLoader,
      showEnterPin,
      pin,
      noticeResponse,
      showNoticeResponseModal,
      loadingModal,
    } = this.state

    return (
      <div>
      <h2 className = { 'header-margin-default' }>My Compliance</h2>
      <br/>
      <br/>
      {
        loadingModal &&
        <Modal>
          <center>
            <h3>Please wait while Loading...</h3>
            <br/>
            <br/>
            <CircularLoader show={true}/>
           </center>
         </Modal>
      }
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
      {
        showEnterPin &&
        <Modal
          onClose={ () => this.setState({ showEnterPin : false }) }
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
              disabled = { (String(pin).length < 5) }
              onClick = {
                () => {
                  this.onSubmit()
                }
              }
              className={ (String(pin).length < 5) ? 'compliance-disabled' : 'compliance-submit' }
              />
          </div>
        </Modal>
      }
      {
        enabledLoader ?
        <center className = { 'circular-loader-center' }>
          <CircularLoader show = { enabledLoader }/>
        </center> :
        <div className={ 'compliance-body' }>
          <div></div>
          <div>
              {
                compliancesData &&
                compliancesData.map((compliance, key) => <div key = { key } dangerouslySetInnerHTML = {{ __html : compliance.content }}></div>)
              }
            <br/>
            <div className={ 'compliance-body' }>
              <div></div>
              <GenericButton
                type = { 'button' }
                text = { 'I Acknowledge' }
                onClick = {
                  () => this.setState({ showEnterPin : true })
                }
                className={ 'compliance-submit' }
                />
            </div>
          </div>
        </div>
      }
      </div>
    )
  }
}

ComplianceFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
  onClick: PropTypes.func,
  history: PropTypes.object,
}

export default ConnectView(ComplianceFragment, Presenter)
