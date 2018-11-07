import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import { Progress } from 'react-sweet-progress'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/AuthorizationBackgroundCheckPresenter'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
  Line,
  MultipleAttachments
} from '../../../ub-components/'

import ResponseModal from '../../notice/NoticeResponseModal'

import PreEmploymentViewAttachmentsComponent from '../../preemployment/components/PreEmploymentViewAttachmentsComponent'
import ViewAttachmentModal from '../../preemployment/modals/ViewAttachmentModal'

import AuthorizationBackgroundCheckViewPdfComponent from './components/AuthorizationBackgroundCheckViewPdfComponent'

import "react-sweet-progress/lib/style.css"
import './styles/authorizationStyle.css'

class AuthorizationBackgroundCheckFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      enabledLoaderPdfModal : false,
      showPdfViewComponent : false,
      showViewModal : false,
      showNoticeResponseModal : false,
      pdfFile: '',
      noticeResponse : '',
      authorizationDataFormData: [{
        name : 'Authorization of Background Checks Data Form'
      }],
      count : 2,
      viewFile : '',
      attachments : []
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(8)
    this.checkAttachments()
  }

  onCheckedPdf (link) {
    this.presenter.getOnBoardingDocument(link)
  }

  showPdfFileView (pdfFile) {
    this.setState({ pdfFile })
  }

  noticeResponseResp (noticeResponse) {
    this.setState({ noticeResponse , showNoticeResponseModal : true})
  }

  showDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : true })
  }

  hideDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : false })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  checkAttachments () {
    const {
      authorizationArray
    } = this.props

    this.presenter.getSelectedAttachments(authorizationArray)
  }

  showAttachmentsFileView (data) {
    let arrayNew = [...this.state.attachments]
    const objectArray = {
      file : data
    }
    arrayNew.push(objectArray)
    this.setState({ attachments : arrayNew })
  }

  addAttachmentsFunc (attachment, tempCount) {
    const attachmentTemp = [...attachment]
    let newCount = tempCount + 1
    this.setState({ count : newCount })
    attachmentTemp.push({
      name : 'Authorization of Background Checks Data Form ' + tempCount
    })
    this.setState({ authorizationDataFormData : attachmentTemp })
  }

  submitForm (id) {
    const {
      authorizationDataFormData
    } = this.state

    this.presenter.addAuthorizationData(id, authorizationDataFormData)
    this.setState({ enabledLoader : false })
  }

  render() {
    const {
      percentage,
      authorizationArray
    } = this.props

    const {
      enabledLoader,
      enabledLoaderPdfModal,
      showPdfViewComponent,
      showViewModal,
      showNoticeResponseModal,
      pdfFile,
      noticeResponse,
      authorizationDataFormData,
      count,
      viewFile,
      attachments
    } = this.state

    const authorizationAttachmentArray = [
      {
        name : 'Authorization of Background Checks Data Form ' + count
      }
    ]

    return(
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
      <div>
        <br/>
          <div className = { 'percentage-grid' }>
            <div>
            <h2 className={ 'header-margin-default text-align-left' }>Authorization of Background Checks</h2>
            <h2>Make sure that you download the attached Data form before proceeding</h2>
            </div>
            <Progress
              type = { 'circle' }
              height = { 65 }
              width = { 65 }
              percent = { percentage } />
          </div>
        <br/>
        <div className = { 'abc-grid-card' }>
        <Card
          className = { 'abc-card' }
          onClick = { () => {
            this.onCheckedPdf('/2018-10-01/12345-Authorization - Background Check-1538362916663.pdf')
            this.setState({ showPdfViewComponent : true  })
            }
          }>
          <div className = { 'abc-grid-x2' }>
            <h2> Authorization of Background Check </h2>
            <div>
              <span
                className = { 'abc-icon biographical-seemore-button' }/>
            </div>
          </div>
        </Card>
        {
          showPdfViewComponent &&
          <AuthorizationBackgroundCheckViewPdfComponent
            pdfFile = { pdfFile }
            onClose = { () => this.setState({ showPdfViewComponent: false }) }
          />
        }
        </div>
      </div>
      <br/>
      <Line />
      <br/>
      {
        authorizationDataFormData.length !== 0  &&
          authorizationArray.map((status) =>
          <div>
            {
              status.status === 1 &&
              <div className = { 'text-align-right' }>
                <GenericButton
                  text = { 'Add Attachments' }
                  onClick = { () => this.addAttachmentsFunc(authorizationDataFormData, count) }
                  />
              </div>
            }
            {
              status.status === 2 ?
              attachments.length !== authorizationArray.length &&
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
                  title = { 'Authorization of Background Checks' }
                  file = { attachments }
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
                  Authorization of Background Checks Data Attachments
                </h4>
                <br/>
                <MultipleAttachments
                  count = { count }
                  countFunc = { (count) => this.setState({ count }) }
                  placeholder = { '' }
                  fileArray = { authorizationDataFormData }
                  setFile = { (authorizationDataFormData) =>
                      this.setState({ authorizationDataFormData })
                  }
                />
                <center>
                  <GenericButton
                  text = { 'Upload' }
                  onClick = { () => {
                    this.setState({ enabledLoader : true })
                    this.submitForm(status.id)
                  }
                }/>
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

AuthorizationBackgroundCheckFragment.propTypes = {
  onSendPageNumberToView  : PropTypes.func,
  birthArray : PropTypes.array
}

AuthorizationBackgroundCheckFragment.defaultProps = {
}

export default ConnectView(AuthorizationBackgroundCheckFragment, Presenter)
