import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/PhilHealthPresenter'

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

import PhilHealthPdfViewerComponents from './components/PhilHealthPdfViewerComponents'

import './styles/phStyle.css'

class PhilHealthFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
      pdfFile: '',
      showPdfViewComponent : false,
      enabledLoaderPdfModal : false,
      philHealthAttachment : [{
        name : 'PhilHealth'
      }],
      count : 2
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(13)
  }

  onCheckedPdf (link) {
    this.presenter.getOnBoardingDocument(link)
  }

  showPdfFileView (pdfFile) {
    this.setState({ pdfFile })
  }

  showDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : true })
  }

  hideDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : false })
  }

  addAttachmentsFunc (attachment, tempCount) {
    const attachmentTemp = [...attachment]
    let newCount = tempCount + 1
    this.setState({ count : newCount })
    attachmentTemp.push({
      name : 'PhilHealth Form ' + tempCount
    })
    this.setState({ philHealthAttachment : attachmentTemp })
  }

  uploadForm () {
    const {
      philHealthAttachment
    } = this.state

    const {
      philHealthArray
    } = this.props
    philHealthArray.map((phil) =>
      this.presenter.uploadPhilHealthForm(phil.id, philHealthAttachment)
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

  render () {
    const {
      enabledLoader,
      pdfFile,
      showPdfViewComponent,
      enabledLoaderPdfModal,
      count,
      noticeResponse,
      showNoticeResponseModal,
      philHealthAttachment
    } = this.state

    const { percentage, philHealthArray } = this.props

    return (
      <div>
        { super.render() }
        {
          enabledLoader &&
          <Modal>
          <center>
          <CircularLoader show = { enabledLoader }/>
          </center>
          </Modal>
        }
        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false})
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
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'header-margin-default text-align-left' }>PhilHealth</h2>
            <h2>Setup your PhilHealth</h2>
          <br/>
          </div>
          <Progress
            type = { 'circle' }
            height = { 65 }
            width = { 65 }
            percent = { percentage } />
        </div>
        <br/>
        <div className = { 'ph-grid-card' }>
          <Card
            className = { 'ph-card' }
            onClick = { () => {
              this.onCheckedPdf('/2018-09-28/12345-PhilHealth Form-1538123169079.pdf')
              this.setState({ showPdfViewComponent : true  })
              }
            }>
            <div className = { 'ph-grid-x2' }>
              <h2>PhilHealth Form</h2>
              <div>
                <span
                  className = { 'ph-icon biographical-seemore-button' }/>
              </div>
            </div>
          </Card>
        </div>
        {
          showPdfViewComponent &&
          <PhilHealthPdfViewerComponents
            pdfFile = { pdfFile }
            onClose = { () => this.setState({ showPdfViewComponent: false }) }
          />
        }
        <br/>
        <Line />
        <br/>
        {
          philHealthAttachment.length !== 0  &&
          philHealthArray.map((status) =>
          <div>
          {
            status.status === 2 &&
              <div>
              <center>
                <h4 className = { 'font-size-14px font-weight-lighter' }>
                  Your documents has been <b>submitted for confirmation</b>.
                </h4>
              </center>
              </div>
          }
          {
            status.status === 4 &&
            <div>
            <center>
              <h4 className = { 'font-size-14px font-weight-lighter' }>
                Your documents are <b>verified</b>.
              </h4>
            </center>
            </div>
          }
          {
            status.status === 1 &&
            <div>
            <div className = { 'grid-global' }>
              <h2></h2>
              <div className = { 'text-align-right' }>
                <GenericButton
                  text = { 'Add Attachments' }
                  onClick = { () => this.addAttachmentsFunc(philHealthAttachment, count) }
                  />
              </div>
            </div>
            <h4>
              <br/>
              Form Attachments
            </h4>
            <MultipleAttachments
              count = { count }
              countFunc = { (count) => this.setState({ count }) }
              placeholder = { '' }
              fileArray = { philHealthAttachment }
              setFile = { (philHealthAttachment) =>
                  this.setState({ philHealthAttachment })
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

PhilHealthFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(PhilHealthFragment, Presenter )
