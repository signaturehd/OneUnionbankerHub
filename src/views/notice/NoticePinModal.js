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

import { RequiredNumberValidation, RequiredValidation } from '../../utils/validate/'
import ResponseModal from './NoticeResponseModal'
import './styles/notice-styles.css'


import store from '../../store'
import { NotifyActions } from '../../actions'

class NoticePinModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      uniquePIN : '',
      showNoticeResponseModal : false,
      showPinCodeModal : true,
      noticeResponse: '',
    }
  }

  noticeResponseFunc (noticeResponse, showPinCodeModal) {
    this.setState({ noticeResponse, showPinCodeModal })
    this.submitAgreement(noticeResponse)
  }

  submitAgreement(data) {
    this.props.onSubmitAgreement(data)
  }

  validator (input) {
   return new RequiredValidation().isValid(input)
  }

  onSubmit (pin) {
    if(!this.validator(pin)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Authentication' ,
         message : 'Pin is required',
         type : 'warning',
         duration : 2000
       })
     )
   } else {
     this.presenter.validateEmployeePin(pin)
    }
  }

  render () {
    const {
      history,
      onClick,
      onClose,
      onSubmitAgreement,
      enabledLoader,
    } = this.props

    const {
      noticeResponse,
      showNoticeResponseModal,
      showPinCodeModal,
      uniquePIN,
    } = this.state

    return (
      <div>
        {
          enabledLoader ?
            <CircularLoader show = { enabledLoader }/>
         :
         <div>
           {
             showPinCodeModal &&
             <Modal
               width = { 40 }
               >
               <center>
                 <div className = { 'grid-global-row' }>
                   <span className = { 'pinlock-icon lock-icon-settings' }/>
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
             </Modal>
           }
         </div>
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
