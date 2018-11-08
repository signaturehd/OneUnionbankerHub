import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

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

import Presenter from './presenter/BspCertificationPresenter'
import BspCertificationViewPdfComponent from './components/BspCertificationViewPdfComponent'

import ResponseModal from '../../notice/NoticeResponseModal'

import PreEmploymentViewAttachmentsComponent from '../../preemployment/components/PreEmploymentViewAttachmentsComponent'
import ViewAttachmentModal from '../../preemployment/modals/ViewAttachmentModal'

import { Progress } from 'react-sweet-progress'

import "react-sweet-progress/lib/style.css"
import './styles/bspCertificateStyle.css'

class BspCertificationFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showViewModal : false,
      showNoticeResponseModal : false,
      enabledLoaderPdfModal : false,
      showPdfViewComponent : false,
      pdfFile: '',
      noticeResponse : '',
      bspDataFormData: [{
        name : 'Banko Sentral ng Pilipinas(BSP) Data Form'
      }],
      count : 2,
      viewFile : '',
      attachments : []
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(9)
    this.checkAttachments()
  }

  onCheckedPdf (link) {
    this.presenter.getOnBoardingDocument(link)
  }

  showPdfFileView (pdfFile) {
    this.setState({ pdfFile, showPdfViewComponent : true })
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

  checkAttachments () {
    const {
      bspArray
    } = this.props

    this.presenter.getSelectedAttachments(bspArray)
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
      name : 'Banko Sentral ng Pilipinas(BSP) Data Form ' + tempCount
    })
    this.setState({ bspDataFormData : attachmentTemp })
  }

  submitForm (id) {
    const {
      bspDataFormData
    } = this.state

    this.presenter.addBspData(id, bspDataFormData)
    this.setState({ enabledLoader : false })
  }

  render() {
    const {
      percentage,
      bspArray
    } = this.props

    const {
      enabledLoader,
      showViewModal,
      showNoticeResponseModal,
      enabledLoaderPdfModal,
      showPdfViewComponent,
      pdfFile,
      noticeResponse,
      bspDataFormData,
      count,
      viewFile,
      attachments
    } = this.state

    const documentCardOptions = [
      {
        id: 0,
        title: 'Banko Sentral ng Pilipinas(BSP) Certificate',
        link: '/2018-11-07/12345-BSP Certification-1539624445855.pdf',
      }
    ]

    const bspAttachmentArray = [
      {
        name : 'Banko Sentral ng Pilipinas(BSP) Data Form ' + count
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
            <h2 className={ 'header-margin-default text-align-left' }>Bangko Sentral ng Pilipinas(BSP) Certificate</h2>
            <h2>Please download the Banko Sentral Pilipinas(BSP) Certificate by clicking the button below.</h2>
          </div>
          <Progress
            type = { 'circle' }
            height = { 65 }
            width = { 65 }
            percent = { percentage } />
        </div>
        <br/>
        <div className = { 'bsp-grid-card' }>
          {
            documentCardOptions.map((resp, key) =>
            <Card
              key = { key }
              className = { 'bsp-card' }
              onClick = { () => {
                this.onCheckedPdf(resp.link)
                this.setState({ showPdfViewModal : true  })
                }
              }>
              <div className = { 'bsp-grid-x2' }>
                <h2> { resp.title } </h2>
                <div className = { 'text-align-right' }>
                  <span
                    className = { 'bsp-icon biographical-seemore-button' }/>
                </div>
              </div>
            </Card>
            )
          }
        </div>
        {
          showPdfViewComponent &&
          <BspCertificationViewPdfComponent
            pdfFile = { pdfFile }
            onClose = { () => this.setState({ showPdfViewComponent: false }) }
          />
        }
      </div>
      <br/>
      <Line />
      <br/>
      {
        bspDataFormData.length !== 0  &&
          bspArray.map((status) =>
          <div>
            {
              status.status === 1 &&
              <div className = { 'text-align-right' }>
                <GenericButton
                  text = { 'Add Attachments' }
                  onClick = { () => this.addAttachmentsFunc(bspDataFormData, count) }
                  />
              </div>
            }
            {
              status.status === 2 ?
              attachments.length !== bspArray.length &&
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
                  title = { 'Banko Sentral ng Pilipinas' }
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
                  Banko Sentral ng Pilipinas(BSP) Data Attachments
                </h4>
                <br/>
                <MultipleAttachments
                  count = { count }
                  countFunc = { (count) => this.setState({ count }) }
                  placeholder = { '' }
                  fileArray = { bspDataFormData }
                  setFile = { (bspDataFormData) =>
                      this.setState({ bspDataFormData })
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

BspCertificationFragment.propTypes = {
  onSendPageNumberToView  : PropTypes.func,
}

BspCertificationFragment.defaultProps = {
}

export default ConnectView(BspCertificationFragment, Presenter)
