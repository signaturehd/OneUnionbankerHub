import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/PagIbigPresenter'

import {
  Modal,
  GenericButton,
  CircularLoader,
  MultipleAttachments,
  GenericInput,
  Card,
  Line,
} from '../../../ub-components/'

import { Progress } from 'react-sweet-progress'
import ResponseModal from '../../notice/NoticeResponseModal'

import PreEmploymentViewAttachmentsComponent from '../../preemployment/components/PreEmploymentViewAttachmentsComponent'
import ViewAttachmentModal from '../../preemployment/modals/ViewAttachmentModal'

import PagIbigViewPdfComponent from './components/PagIbigViewPdfComponent'

class PagIbigFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      enabledLoaderPdfModal : false,
      showNoticeResponseModal : false,
      showViewModal : false,
      noticeResponse : '',
      showPdfViewComponents : false,
      pdfFile: '',
      pagibigAttachment : [{
        name : 'Pag-IBIG Form'
      }],
      count : 2,
      viewFile : '',
      attachments : []
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(14)
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
      pagibigArray
    } = this.props

    this.presenter.getSelectedAttachments(pagibigArray)
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
      name : 'Pag-IBIG Form ' + tempCount
    })
    this.setState({ pagibigAttachment : attachmentTemp })
  }

  uploadForm () {
    const {
      pagibigAttachment
    } = this.state

    const {
      pagibigArray
    } = this.props
    pagibigArray.map((pagibig) =>
      this.presenter.uploadPagibigForm(pagibig.id, pagibigAttachment)
    )
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

  render () {
    const {
      enabledLoader,
      enabledLoaderPdfModal,
      showPdfViewComponents,
      showViewModal,
      pdfFile,
      count,
      noticeResponse,
      showNoticeResponseModal,
      pagibigAttachment,
      viewFile,
      attachments
    } = this.state

    const { percentage, pagibigArray } = this.props

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
            <div>
              <center>
                <br/>
                {
                  showPdfViewComponents ?

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
        <div className = { 'percentage-grid' }>
          <div>
          <h2 className={ 'header-margin-default text-align-left' }>Pag-IBIG Form</h2>
          <br/>
          <h2>Set up your Pag-IBIG</h2>
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
              this.onCheckedPdf('/2018-09-28/12345-Pagibig Form-1538123144111.pdf')
              this.setState({ showPdfViewComponents : true  })
              }
            }>
            <div className = { 'abc-grid-x2' }>
              <h2>PAG-IBIG MDR Form</h2>
              <div>
                <span
                  className = { 'abc-icon biographical-seemore-button' }/>
              </div>
            </div>
          </Card>
        </div>
        {
          showPdfViewComponents &&
          <PagIbigViewPdfComponent
            pdfFile = { pdfFile }
            onClose = { () => this.setState({ showPdfViewComponents: false }) }
          />
        }
        <br/>
        <Line />
        <br/>
          {
            pagibigAttachment.length !== 0  &&
            pagibigArray.map((status) =>
            <div>
              {
                status.status === 2 || status.status === 4 &&
                <div className = { 'text-align-right' }>
                  <GenericButton
                    text = { 'Add Attachments' }
                    onClick = { () => this.addAttachmentsFunc(pagibigAttachment, count) }
                    />
                </div>
              }
              {
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
                    title = { 'Pag-IBIG' }
                    onClick = { (viewFile) => this.setState({ viewFile, showViewModal : true }) }/>
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
                status.status ===1 &&
                <div>
                <h4>
                  <br/>
                  Form Attachments
                </h4>
                <MultipleAttachments
                  count = { count }
                  countFunc = { (count) => this.setState({ count }) }
                  placeholder = { '' }
                  fileArray = { pagibigAttachment }
                  setFile = { (pagibigAttachment) =>
                      this.setState({ pagibigAttachment })
                  }
                  />
                  <center>
                   <GenericButton
                     text = { 'Upload' }
                     onClick = { () => this.uploadForm()  }
                   />
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

PagIbigFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(PagIbigFragment, Presenter )
