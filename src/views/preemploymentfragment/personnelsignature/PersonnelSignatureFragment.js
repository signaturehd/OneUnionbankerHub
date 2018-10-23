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

import Presenter from './presenter/PersonnelSignaturePresenter'
import ResponseModal from '../../notice/NoticeResponseModal'

import PreEmploymentViewAttachmentsComponent from '../../preemployment/components/PreEmploymentViewAttachmentsComponent'
import ViewAttachmentModal from '../../preemployment/modals/ViewAttachmentModal'

import "react-sweet-progress/lib/style.css"
import './styles/signatureStyle.css'

import PersonnelSignatureViewPdfComponent from './components/PersonnelSignatureViewPdfComponent'

class PersonnelSignatureFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      showPdfViewComponents : false,
      enabledLoaderPdfModal : false,
      enabledLoader : false,
      showViewModal : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
      personnelFormData: [{
        name : 'Personnel Signature'
      }],
      pdfFile: '',
      count : 2,
      viewFile : '',
      attachments : []
    }
    this.addAttachmentsFunc = this.addAttachmentsFunc.bind(this)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(16)
    this.checkAttachments()
  }

  checkAttachments () {
    const {
      personnelArray
    } = this.props

    this.presenter.getSelectedAttachments(personnelArray)
  }

  showAttachmentsFileView (data) {
    let arrayNew = [...this.state.attachments]
    const objectArray = {
      file : data
    }
    arrayNew.push(objectArray)
    this.setState({ attachments : arrayNew })
  }

  onCheckedPdf (link) {
    this.presenter.getOnBoardingDocument(link)
  }

  showAttachments (pdfFile) {
    this.setState({ pdfFile })
  }

  addAttachmentsFunc (attachment, tempCount) {
    const attachmentTemp = [...attachment]
    let newCount = tempCount + 1
    this.setState({ count : newCount })
    attachmentTemp.push({
      name : 'Personnel Signature ' + tempCount
    })
    this.setState({ personnelFormData : attachmentTemp })
  }

  uploadForm () {
    const {
      personnelFormData
    } = this.state

    const {
      personnelArray
    } = this.props
    personnelArray.map((personnel) =>
      this.presenter.addPersonnelSignature(personnel.id, personnelFormData)
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

  render() {
    const {
      history,
      checkPEUndertaking,
      percentage,
      personnelArray
    } = this.props

    const {
      enabledLoader,
      enabledLoaderPdfModal,
      showNoticeResponseModal,
      noticeResponse,
      showViewModal,
      personnelFormData,
      showPdfViewComponents,
      pdfFile,
      count,
      viewFile,
      attachments
    } = this.state

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
            <h2 className={ 'header-margin-default text-align-left' }>Personnel Signature</h2>
            <h2>Setup your Personnel Signature.</h2>
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
            onClick = { () => {
              this.onCheckedPdf('/2018-10-15/12345-Employee Specimen Signature-1539596489673.pdf')
              this.setState({ showPdfViewComponents : true  })
              }
            }
            className = { 'abc-card' }>
            <div className = { 'abc-grid-x2' }>
              <h2>Personnel Signature Card</h2>
              <div>
                <span className = { 'abc-icon biographical-seemore-button' }/>
              </div>
            </div>
          </Card>
        </div>
        {
          showPdfViewComponents &&
          <PersonnelSignatureViewPdfComponent
            pdfFile = { pdfFile }
            onClose = { () => this.setState({ showPdfViewComponents: false }) }
          />
        }
        <br/>
        <Line />
        <br/>
        {
          personnelFormData.length !== 0  &&
          personnelArray.map((status) =>
          <div>
            {
              status.status === 2 || status.status === 4 &&
              <div className = { 'text-align-right' }>
                <GenericButton
                  text = { 'Add Attachments' }
                  onClick = { () => this.addAttachmentsFunc(personnelFormData, count) }
                  />
              </div>
            }
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
                  title = { 'Personnel Signature' }
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
                <br/>
                Form Attachments
              </h4>
              <MultipleAttachments
                count = { count }
                countFunc = { (count) => this.setState({ count }) }
                placeholder = { '' }
                fileArray = { personnelFormData }
                setFile = { (personnelFormData) =>
                    this.setState({ personnelFormData })
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
    </div>
    )
  }
}

PersonnelSignatureFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
  personnelArray : PropTypes.array
}

PersonnelSignatureFragment.defaultProps = {
}

export default ConnectView(PersonnelSignatureFragment, Presenter)
