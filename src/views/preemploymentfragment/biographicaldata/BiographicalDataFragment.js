import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import { Progress } from 'react-sweet-progress'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
  Line,
  MultipleAttachments
} from '../../../ub-components/'

import Presenter from './presenter/BiographicalDataPresenter'

import BiographicalViewerComponent from './components/BiographicalViewerComponent'

import ResponseModal from '../../notice/NoticeResponseModal'

import PreEmploymentViewAttachmentsComponent from '../../preemployment/components/PreEmploymentViewAttachmentsComponent'
import ViewAttachmentModal from '../../preemployment/modals/ViewAttachmentModal'

import "react-sweet-progress/lib/style.css"
import './styles/biographicalDataStyle.css'

class BiographicalDataFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      showPdfViewComponent : false,
      enabledLoaderPdfModal : false,
      enabledLoader : false,
      showNoticeResponseModal : false,
      showViewModal : false,
      noticeResponse : '',
      biographicalDataFormData: [{
        name : 'Biographical Data Form'
      }],
      pdfFile: '',
      count : 2,
      biographicalName : '',
      viewFile : '',
      attachments : [],
    }
    this.addAttachmentsFunc = this.addAttachmentsFunc.bind(this)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(2)
    this.checkAttachments()
  }

  onCheckedPdf (link) {
    this.presenter.getOnBoardingDocument(link)
  }

  showPdfFileView (pdfFile) {
    this.setState({ pdfFile })
  }

  checkAttachments () {
    const {
      biographicalArray
    } = this.props

    this.presenter.getSelectedAttachments(biographicalArray)
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
      name : 'Biographical Data Form ' + tempCount
    })
    this.setState({ biographicalDataFormData : attachmentTemp })
  }

  submitForm (id) {
    const {
      biographicalDataFormData
    } = this.state

    this.presenter.addBiographicalData(id, biographicalDataFormData)
    this.setState({ enabledLoader : false })
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

  render() {
    const {
      checkPEUndertaking,
      percentage,
      biographicalArray,
      showStatusSubmitted
    } = this.props

    const {
      enabledLoader,
      enabledLoaderPdfModal,
      showNoticeResponseModal,
      noticeResponse,
      showViewModal,
      biographicalDataFormData,
      biographicalData,
      biographicalName,
      showPdfViewComponent,
      pdfFile,
      count,
      viewFile,
      attachments
    } = this.state

    const bioAttachmentArray = [
      {
        name : 'Biographical Data Form ' + count
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
      {
        showViewModal &&
        <ViewAttachmentModal
          file = { viewFile }
          onClose = { () => this.setState({ showViewModal : false }) }
        />
      }
      <div>
        <br/>
          <div className = { 'percentage-grid' }>
            <div>
              <h2 className={ 'header-margin-default text-align-left' }>Biographical Data</h2>
              <h2>Setup your biographical data</h2>
            </div>
            <Progress
              type = { 'circle' }
              height = { 65 }
              width = { 65 }
              percent = { percentage } />
          </div>
        <br/>
        <div className = { 'biographical-grid-card' }>
          <Card
            onClick = { () => {
              this.onCheckedPdf('/2018-10-30/12345-BSP Biographical Data-1539596592662.pdf')
              this.setState({ showPdfViewComponent : true  })
              }
            }
            className = { 'biographical-card' }>
            <div className = { 'biographical-grid-x2' }>
              <h2>Biographical Data Form</h2>
              <div>
                <span className = { 'biographical-icon biographical-seemore-button' }/>
              </div>
            </div>
          </Card>
          {
            showPdfViewComponent &&
            <BiographicalViewerComponent
              pdfFile = { pdfFile }
              onClose = { () => this.setState({ showPdfViewComponent: false }) }
            />
          }
        </div>
        <br/>
        <Line />
        <br/>
        {
          biographicalDataFormData.length !== 0  &&
            biographicalArray.map((status) =>
            <div>
              {
                status.status === 1  &&
                <div className = { 'text-align-right' }>
                  <GenericButton
                    text = { 'Add Attachments' }
                    onClick = { () => this.addAttachmentsFunc(biographicalDataFormData, count) }
                    />
                </div>
              }
              {
                status.status === 2 ?
                attachments.length !== biographicalArray.length &&
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
                    title = { 'Biographical' }
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
                    Biographical Data Attachments
                  </h4>
                  <br/>
                  <MultipleAttachments
                    count = { count }
                    countFunc = { (count) => this.setState({ count }) }
                    placeholder = { '' }
                    fileArray = { biographicalDataFormData }
                    setFile = { (biographicalDataFormData) =>
                        this.setState({ biographicalDataFormData })
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
    </div>
    )
  }
}

BiographicalDataFragment.propTypes = {
  onSendPageNumberToView  : PropTypes.func,
  biographicalArray : PropTypes.array
}

BiographicalDataFragment.defaultProps = {
}

export default ConnectView(BiographicalDataFragment, Presenter)
