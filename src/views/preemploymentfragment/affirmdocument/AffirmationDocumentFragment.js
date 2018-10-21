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

import { NotifyActions } from '../../../actions'
import store from '../../../store'

import { RequiredNumberValidation, RequiredValidation } from '../../../utils/validate/'

class AffirmationDocumentFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      affirmationPreEmploymentStatus : [],
      affirmationContent : [],
      previewDataPDF : [],
      showPdfViewComponent : false,
      showPinCodeModal: false,
      enabledLoaderPdfModal: false,
      noticeResponseModal: false,
      enabledLoaderPdf: false,
      pdfFile: '',
      noticeResponse : [],
      uniquePIN: '',
      preAffirmationEmpId: '',
      nodeStatus : '',
      affirmTitle : ''
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
    if(preAffirmationEmpId === 1) {
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
       this.presenter.postEnrollPinAffirmationsPolicy(pin)
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
       this.presenter.postEnrollPinAffirmationsConfidential(pin)
      }
    } else if (preAffirmationEmpId === 4) {
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

  setDocumentContents (data) {
    let oldArray = [...this.state.affirmationContent]
    oldArray.push(data)

    this.setState({ affirmationContent : oldArray })
  }

  onCheckedPdf (id) {
    let count = 1
    this.presenter.getPreEmploymentAffirmationId(id, count)
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

  showDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : true })
  }

  hideDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : false })
  }

  noticeResponse (noticeResponse, noticeResponseModal, showPinCodeModal) {
    this.setState({ noticeResponse, noticeResponseModal, showPinCodeModal })
    this.props.reloadPreEmploymentForm()
  }

  render() {
    const {
      checkPEUndertaking,
      percentage
    } = this.props

    const {
      affirmationPreEmploymentStatus,
      affirmationContent,
      previewDataPDF,
      showPdfViewComponent,
      showPinCodeModal,
      noticeResponseModal,
      enabledLoaderPdfModal,
      pdfFile,
      noticeResponse,
      enabledLoader,
      uniquePIN,
      preAffirmationEmpId,
      nodeStatus,
      affirmTitle
    } = this.state

    return(
    <div>
      { super.render() }
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
        enabledLoaderPdfModal &&
        <Modal>
          <div>
            <center>
              <br/>
              {
                showPdfViewComponent ?

                <h2>Please wait while we we&#39;re retrieving the documents</h2> :
                <h2>Please wait while we we&#39;re validating your submitted documents</h2>
              }
              <br/>
              <CircularLoader show = { enabledLoaderPdfModal }/>
              <br/>
            </center>
          </div>
        </Modal>
      }
      {
        showPinCodeModal &&
        <Modal
          isDismisable = { true }
          onClose = { () => this.setState({ showPinCodeModal : false }) }
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
                  affirmationContent &&
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
            height = { 65 }
            width = { 65 }
            percent = { percentage } />
        </div>
        <br/>
        <br/>
          {
            showPdfViewComponent ?
            <div>
              {
                affirmationContent && affirmationContent.map((resp, key) =>
                <Card
                  key = { key }
                  className = { 'affirmation-padding-documents' }>
                  {
                    <div dangerouslySetInnerHTML = {{ __html : resp }} />
                  }
                </Card>
                )
              }
              <br/>
              <center>
                {
                  nodeStatus === 0 ?
                  <div className = { 'affirm-acknowledge' }>
                    <GenericButton
                      onClick = { () => this.setState({ showPinCodeModal: true, showPdfViewComponent: false }) }
                      text = { 'I Acknowledge' }/>
                  </div>
                  :
                  <div>
                    <GenericButton
                      onClick = { () => this.setState({ showPdfViewComponent: false, affirmationContent : [] }) }
                      text = { 'Close' }/>
                  </div>
                }
              </center>
            </div>

            :
            <div className = { 'affirmation-grid-pdf-card' }>
              {
                affirmationPreEmploymentStatus.map((resp, key) => {
                  let respId = resp.id
                   return (
                     <Card
                       key = { key }
                       onClick = { () => {
                         this.onCheckedPdf(resp.id)
                         this.setState({
                           showPdfViewComponent : true ,
                           preAffirmationEmpId : resp.id,
                           nodeStatus : resp.nodeStatus,
                           affirmTitle : resp.title
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
                  )
                }
              </div>
          }

      </div>
    </div>
    )
  }
}

AffirmationDocumentFragment.propTypes = {
  onSendPageNumberToView  : PropTypes.func,
  refreshOptions  : PropTypes.func,
}

AffirmationDocumentFragment.defaultProps = {
}

export default ConnectView(AffirmationDocumentFragment, Presenter)
