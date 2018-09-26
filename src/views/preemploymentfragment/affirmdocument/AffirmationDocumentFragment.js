import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  Modal,
  GenericButton,
  CircularLoader,
  GenericInput,
  Card
} from '../../../ub-components/'

import Presenter from './presenter/AffirmDocumentPresenter'

import { Progress } from 'react-sweet-progress'

import 'react-sweet-progress/lib/style.css'
import './styles/affirmDocumentStyle.css'

import AffirmationDocumentPreviewModal from './modals/AffirmationDocumentPreviewModal'

import { NotifyActions } from '../../../actions'
import store from '../../../store'

import { RequiredNumberValidation, RequiredValidation } from '../../../utils/validate/'

class AffirmationDocumentFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      affirmationPreEmploymentStatus : [],
      previewDataPDF : [],
      showPdfViewModal : false,
      showPinCodeModal: false,
      enabledLoader: false,
      noticeResponseModal: false,
      pdfFile: '',
      noticeResponse : [],
      uniquePIN: '',
      preAffirmationEmpId: '',
      nodeStatus : ''
    }
    this.onCheckedPdf = this.onCheckedPdf.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(0)
    this.presenter.getAffirmationsStatus()
  }

  validator (input) {
   return new RequiredValidation().isValid(input)
  }

  onSubmit (pin) {
    const { preAffirmationEmpId } = this.state
    if(preAffirmationEmpId === 0) {
      if(!this.validator(pin)) {
        store.dispatch(NotifyActions.addNotify({
           title : 'Authentication' ,
           message : 'Pin is required',
           type : 'warning',
           duration : 2000
         })
       )
     } else {
       this.presenter.postEnrollPinAffirmationsEmployment(pin)
      }
    } else if (preAffirmationEmpId === 1) {
      if(!this.validator(pin)) {
        store.dispatch(NotifyActions.addNotify({
           title : 'Authentication' ,
           message : 'Pin is required',
           type : 'warning',
           duration : 2000
         })
       )
     } else {
       this.presenter.postEnrollPinAffirmationsPolicy(pin)
      }
    } else if (preAffirmationEmpId === 2) {
      if(!this.validator(pin)) {
        store.dispatch(NotifyActions.addNotify({
           title : 'Authentication' ,
           message : 'Pin is required',
           type : 'warning',
           duration : 2000
         })
       )
     } else {
       this.presenter.postEnrollPinAffirmationsConfidential(pin)
      }
    } else if (preAffirmationEmpId === 3) {
      if(!this.validator(pin)) {
        store.dispatch(NotifyActions.addNotify({
           title : 'Authentication' ,
           message : 'Pin is required',
           type : 'warning',
           duration : 2000
         })
       )
     } else {
       this.presenter.postEnrollPinAffirmationsSecrecy(pin)
      }
    }
  }


  checkedAffirmationPreEmploymentStatus (affirmationPreEmploymentStatus) {
    this.setState({ affirmationPreEmploymentStatus })
  }

  onCheckedPdf (link) {
    this.presenter.getOnBoardingDocument(link)
  }

  showPdfFileView (pdfFile) {
    this.setState({ pdfFile })
  }

  showPinLoader () {
    this.setState({ enabledLoader : true })
  }

  hidePinLoader () {
    this.setState({ enabledLoader : false })
  }

  noticeResponse (noticeResponse, noticeResponseModal, showPinCodeModal) {
    this.setState({ noticeResponse, noticeResponseModal, showPinCodeModal })
  }

  render() {
    const {
      history,
      checkPEUndertaking,
      percentage
    } = this.props

    const {
      affirmationPreEmploymentStatus,
      previewDataPDF,
      showPdfViewModal,
      showPinCodeModal,
      noticeResponseModal,
      pdfFile,
      noticeResponse,
      enabledLoader,
      uniquePIN,
      preAffirmationEmpId,
      nodeStatus,
    } = this.state

    return(
    <div>
      { super.render() }
      {
        showPdfViewModal &&
        <AffirmationDocumentPreviewModal
          enabledLoader = { enabledLoader }
          nodeStatus = { nodeStatus }
          pdfFile = { pdfFile }
          showPinCodeModalFunc = { () => this.setState({ showPinCodeModal: true, showPdfViewModal: false }) }
          onClose = { () => this.setState({ showPdfViewModal: false }) }
          />
      }
      {
        noticeResponseModal &&
        <Modal>
          <center>
            <h2>{ noticeResponse }</h2>
            <br/>
            <GenericButton
              onClick = { () => this.setState({ noticeResponseModal : false }) }
              text = { 'Ok' }
              />
            <br/>
          </center>
        </Modal>
      }
      {
        showPinCodeModal &&
        <Modal
          isDismisable = { true }
          >
          {
            enabledLoader ?
            <center className = { 'circular-loader-center' }>
              <h2>Please wait while we validate your PIN</h2>
              <br/>
              <CircularLoader show = { enabledLoader }/>
            </center> :
            <center>
              <div>
                <div className = { 'grid-global-row' }>
                  <span className = { 'pinlock-icon lock-icon-settings' }/>
                  <h2 className = { 'font-size-12px' }>Please enter your registered digital signature (PIN).</h2>
                </div>
                <GenericInput
                  className = { 'generic-pin' }
                  hint = { '* * * * *' }
                  maxLength = { 5 }
                  type = { 'password' }
                  onChange = { (e) =>
                    {
                     new RequiredNumberValidation().isValid(e.target.value) ?
                     this.setState({ uniquePIN: e.target.value }) :
                     this.setState({ uniquePIN : '' })
                    }
                  }
                  value = { uniquePIN }
                  errorMessage = { 'Please enter your 5-digit PIN' }
                  />
                <br/>
                {
                  pdfFile &&
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
                }
                <br/>
                <br/>
              </div>
            </center>
          }
        </Modal>
      }
      <div>
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'font-size-30px text-align-left' }> Pre Employment Documents Affirmation </h2>
            <br/>
            <h4>Please click and read all documents below and affirm each one. Documents that are marked with checked are already affirmed</h4>
          </div>
          <Progress
            type = { 'circle' }
            height = { 100 }
            width = { 100 }
            percent = { percentage } />
        </div>
        <br/>
        <div className = { 'affirmation-grid-card' }>
          {
            affirmationPreEmploymentStatus.map((resp, key) =>
            <Card
              key = { key }
              onClick = { () => {
                this.onCheckedPdf(resp.link)
                this.setState({
                  showPdfViewModal : true ,
                  preAffirmationEmpId : resp.id,
                  nodeStatus : resp.nodeStatus
                  })
                }
              }
              className = { 'affirmation-card' }>
              <div className = { 'affirmation-grid-x2' }>
                <h2> { resp.title } </h2>
                <div>
                  {
                    resp.nodeStatus === 1 ?
                    <span className = { 'affirmation-icon affirmation-success float-right' }/>
                    :
                    <span
                      className = { 'affirmation-icon affirmation-seemore-button float-right' }/>
                  }
                </div>
              </div>
            </Card>
            )
          }
        </div>
      </div>
    </div>
    )
  }
}

AffirmationDocumentFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

AffirmationDocumentFragment.defaultProps = {
}

export default ConnectView(AffirmationDocumentFragment, Presenter)
