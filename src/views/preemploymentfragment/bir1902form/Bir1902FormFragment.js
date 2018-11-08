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

import Presenter from './presenter/Bir1902FormPresenter'
import ResponseModal from '../../notice/NoticeResponseModal'

import PreEmploymentViewAttachmentsComponent from '../../preemployment/components/PreEmploymentViewAttachmentsComponent'
import ViewAttachmentModal from '../../preemployment/modals/ViewAttachmentModal'

import "react-sweet-progress/lib/style.css"
import './styles/birStyle.css'

import Bir1902ViewPdfComponent from './components/Bir1902ViewPdfComponent'

class Bir1902FormFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      showPdfViewComponent : false,
      enabledLoader : false,
      enabledLoaderPdfModal : false,
      showNoticeResponseModal : false,
      showViewModal : false,
      noticeResponse : '',
      bir1902FormData: [{
        name : 'BIR 1902 Form'
      }],
      pdfFile: '',
      count : 2,
      viewFile : '',
      attachments : []
    }
    this.addAttachmentsFunc = this.addAttachmentsFunc.bind(this)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(12)
    this.checkAttachments()
  }

  checkAttachments () {
    const {
      bir1902Array
    } = this.props

    this.presenter.getSelectedAttachments(bir1902Array)
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

  showDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : true })
  }

  hideDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : false })
  }

  showPdfFileView (pdfFile) {
    this.setState({ pdfFile })
  }

  addAttachmentsFunc (attachment, tempCount) {
    const attachmentTemp = [...attachment]
    let newCount = tempCount + 1
    this.setState({ count : newCount })
    attachmentTemp.push({
      name : 'BIR 1902 Form ' + tempCount
    })
    this.setState({ bir1902FormData : attachmentTemp })
  }

  uploadForm () {
    const {
      bir1902FormData
    } = this.state

    const {
      bir1902Array
    } = this.props
    bir1902Array.map((bir) =>
      this.presenter.uploadBir1902Form(bir.id, bir1902FormData)
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

  render() {
    const {
      checkPEUndertaking,
      percentage,
      bir1902Array
    } = this.props

    const {
      enabledLoader,
      showNoticeResponseModal,
      enabledLoaderPdfModal,
      noticeResponse,
      showViewModal,
      bir1902FormData,
      showPdfViewComponent,
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
            <h2 className={ 'header-margin-default text-align-left' }>Bureau of Internal Revenue(BIR) Form</h2>
            <h2>Please download the BIR 1902 form by clicking the button below</h2>
            </div>
            <Progress
              type = { 'circle' }
              height = { 65 }
              width = { 65 }
              percent = { percentage } />
          </div>
        <br/>
        <div className = { 'bir-grid-card' }>
          <Card
            onClick = { () => {
              this.onCheckedPdf('/2018-11-07/12345-BIR Form-1538123091552.pdf')
              this.setState({ showPdfViewComponent : true  })
              }
            }
            className = { 'bir-card' }>
            <div className = { 'bir-grid-x2' }>
              <h2>BIR 1902 Form</h2>
              <div>
                <span className = { 'bir-icon biographical-seemore-button' }/>
              </div>
            </div>
          </Card>
        </div>
        {
          showPdfViewComponent &&
          <Bir1902ViewPdfComponent
            pdfFile = { pdfFile }
            onClose = { () => this.setState({ showPdfViewComponent: false }) }
          />
        }
        <br/>
        <Line />
        <br/>
        {
          bir1902FormData.length !== 0  &&
          bir1902Array.map((status) =>
            <div>
              {
                status.status === 2 || status.status === 4 &&
                <div className = { 'text-align-right' }>
                  <GenericButton
                    text = { 'Add Attachments' }
                    onClick = { () => this.addAttachmentsFunc(bir1902FormData, count) }
                    />
                </div>
              }
              {
                status.status === 2 ?
                attachments.lenght !== 0 &&
                  enabledLoader ?
                  <center>
                  <CircularLoader show = { enabledLoader } />
                  </center>
                  :
                  <PreEmploymentViewAttachmentsComponent
                    title = { 'BIR' }
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
               status.status  === 1 &&
                <div>
                  <h4>
                    <br/>
                    Form Attachments
                  </h4>
                  <MultipleAttachments
                    count = { count }
                    countFunc = { (count) => this.setState({ count }) }
                    placeholder = { '' }
                    fileArray = { bir1902FormData }
                    setFile = { (bir1902FormData) =>
                        this.setState({ bir1902FormData })
                    }
                    />
                    <center>
                     <GenericButton
                       text = { 'Upload' }
                       onClick = { () => this.uploadForm()
                     }
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

Bir1902FormFragment.propTypes = {
  onSendPageNumberToView  : PropTypes.func,
  birthArray : PropTypes.array
}

Bir1902FormFragment.defaultProps = {
}

export default ConnectView(Bir1902FormFragment, Presenter)
