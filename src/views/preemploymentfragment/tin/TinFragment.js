import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/TinPresenter'

import {
  Modal,
  GenericButton,
  CircularLoader,
  MultipleFileUploader,
  GenericInput,
  Card,
  Line,
} from '../../../ub-components/'

import {
  RequiredNumberValidation
} from '../../../utils/validate'

import ResponseModal from '../../notice/NoticeResponseModal'

import PreEmploymentViewAttachmentsComponent from '../../preemployment/components/PreEmploymentViewAttachmentsComponent'
import ViewAttachmentModal from '../../preemployment/modals/ViewAttachmentModal'

import { NotifyActions } from '../../../actions'
import store from '../../../store'
import { Progress } from 'react-sweet-progress'

class TinFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      enabledLoaderPdfModal : false,
      showNoticeResponseModal : false,
      showViewModal : false,
      noticeResponse : '',
      tinInput : '',
      tinAttachment : [{
        name : 'TIN ID/ BIR FORM',
      }],
      viewFile : '',
      attachments : [],
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(11)
    this.presenter.getEmployeeTin()
    this.checkAttachments()
  }

  checkAttachments () {
    const {
      tinArray
    } = this.props

    this.presenter.getSelectedAttachments(tinArray)
  }

  showAttachmentsFileView (data) {
    let arrayNew = [...this.state.attachments]
    const objectArray = {
      file : data
    }
    arrayNew.push(objectArray)
    this.setState({ attachments : arrayNew })
  }

  showEmployeeTinData (tinData) {
    this.setState({ tinInput : tinData.tin })
  }

  saveForm () {
    const {
      tinInput
    } = this.state
    this.presenter.saveEmployeeTin(tinInput)
  }

  uploadForm () {
    const {
      tinAttachment
    } = this.state

    const {
      tinArray
    } = this.props

    let validateAttachments = false
    tinAttachment && tinAttachment.map(
      (attachment, key) => {
        if(!attachment.file) {
          validateAttachments = true
        }
      }
    )

    tinArray.map((tin) => {
      if(tin.status === 1) {
        if (!tinAttachment.length) {
         store.dispatch(NotifyActions.resetNotify())
          store.dispatch(NotifyActions.addNotify({
             title : 'Warning' ,
             message : 'Attachments is required',
             type : 'warning',
             duration : 2000
           })
         )
        } else if (validateAttachments) {
         store.dispatch(NotifyActions.resetNotify())
         tinAttachment && tinAttachment.map(
           (attachment, key) => {
             if(!attachment.file) {
               store.dispatch(NotifyActions.addNotify({
                  title : 'Warning' ,
                  message : attachment.name + ' is required',
                  type : 'warning',
                  duration : 2000
                })
              )
             }
           }
          )
        } else {
          this.presenter.uploadEmployeeTin(tin.id, tinAttachment)
        }
      } else {
        this.presenter.uploadEmployeeTin(tin.id, tinAttachment)
      }
    })
  }

  setTinAttachments () {
    this.setState({
      tinAttachment : [{
        name : 'TIN ID/ BIR FORM',
    }] })
  }

  noticeResponseResp (noticeResponse) {
    this.setState({ noticeResponse , showNoticeResponseModal : true})
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  showDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : true })
  }

  hideDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : false })
  }

  inputTinValidate (e) {
    const validate = new RequiredNumberValidation().isValid(e)

    this.setState({ tinInput : validate ? e : '' })
  }

  setFileAttachments (tinAttachment) {
    this.setState({ tinAttachment })
  }

  render () {

    const {
      enabledLoader,
      enabledLoaderPdfModal,
      showNoticeResponseModal,
      noticeResponse,
      showViewModal,
      tinInput,
      tinAttachment,
      viewFile,
      attachments
    } = this.state
    const { percentage, tinArray } = this.props

    return (
      <div>
        { super.render() }
        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false})
              this.props.reloadPreEmploymentForm()
            }}
            noticeResponse={ noticeResponse }
          />
        }
        {
          enabledLoaderPdfModal &&
          <Modal>
          <center>
          <br/>
          <h2>Please wait while we we&#39;re validating your submitted documents</h2>
          <br/>
          <CircularLoader show = { enabledLoaderPdfModal }/>
          </center>
          </Modal>
        }
        {
          showViewModal &&
          <ViewAttachmentModal
            file = { viewFile }
            onClose = { () => this.setState({ showViewModal : false }) }
          />
        }
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'header-margin-default text-align-left' }>Tax Identification Number(TIN) Form</h2>
            <h2>Please input your Taxpayer Identification Number(TIN) and attach your BIR 1902 Form or TIN Form.</h2>
          <br/>
          </div>
          <Progress
            type = { 'circle' }
            height = { 65 }
            width = { 65 }
            percent = { percentage } />
        </div>
        <br/>
          <GenericInput
            text = { 'Taxpayer Identification Number(TIN)' }
            value = { tinInput }
            minLength = { 9 }
            onChange = { e => this.inputTinValidate(e.target.value) }
          />
          <center>
          <GenericButton
            text = { 'Save' }
            onClick = { () => this.saveForm() }/>
          </center>
        <br/>
        <Line />
        <br/>
        {
          tinArray.map((status) =>
          <div>
          {
            status.status === 2 ?
            attachments.lenght !== 0 &&
              enabledLoader ?
              <center>
                <br/>
                <h2>Please wait while we we&#39;re retrieving your documents </h2>
                <br/>
                <CircularLoader show = { enabledLoader } />
                <br/>
              </center>
              :
              <PreEmploymentViewAttachmentsComponent
                file = { attachments }
                title = { 'TIN' }
                onClick = { (viewFile) => this.setState({ viewFile, showViewModal : true }) }/>
              :
              <div></div>
          }
          {
            status.status === 2 &&
            <div>
            <center>
              <h4 className = { 'font-size-14px font-weight-lighter' }>
                Your documents has been submitted for confirmation.
              </h4>
            </center>
            </div>
          }
          {
            status.status === 4 &&
            <div>
            <center>
              <h4 className = { 'font-size-14px font-weight-lighter' }>
                Your documents are verified.
              </h4>
            </center>
            </div>
          }
          {
            status.status === 1 &&
            <div>
              <h4>
                TIN Attachments
              </h4>
              <br/>
            <MultipleFileUploader
              placeholder = { '' }
              fileArray = { tinAttachment }
              setFile = { (resp) => this.setFileAttachments(resp) }
              />
              <center>
              <GenericButton
              text = { 'Upload' }
              onClick = { () => this.uploadForm() }/>
              </center>
            </div>
          }
          </div>
        )
      }
      </div>
    )
  }
}

TinFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func,
  tinArray : PropTypes.array
}

export default ConnectView(TinFragment, Presenter )
