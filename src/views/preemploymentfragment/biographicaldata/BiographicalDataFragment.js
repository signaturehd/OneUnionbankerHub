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
import BiographicalDocumentPreviewModal from './modal/BiographicalDocumentPreviewModal'
import ResponseModal from '../../notice/NoticeResponseModal'

import "react-sweet-progress/lib/style.css"
import './styles/biographicalDataStyle.css'

class BiographicalDataFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      showPdfViewModal : false,
      enabledLoader : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
      biographicalDataFormData: [{
        name : 'Biographical Data Form'
      }],
      pdfFile: '',
      count : 2,
      biographicalName : ''
    }
    this.addAttachmentsFunc = this.addAttachmentsFunc.bind(this)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(2)
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
      name : 'Biographical Data Form ' + tempCount
    })
    this.setState({ biographicalDataFormData : attachmentTemp })
  }

  submitForm (id) {
    const {
      biographicalDataFormData
    } = this.state

    this.presenter.addBiographicalData(id, biographicalDataFormData)
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
      history,
      checkPEUndertaking,
      percentage,
      biographicalArray,
      showStatusSubmitted
    } = this.props

    const {
      enabledLoader,
      showNoticeResponseModal,
      noticeResponse,
      biographicalDataFormData,
      biographicalData,
      biographicalName,
      showPdfViewModal,
      pdfFile,
      count
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
      showPdfViewModal &&
      <BiographicalDocumentPreviewModal
        pdfFile = { pdfFile }
        onClose = { () => this.setState({ showPdfViewModal: false }) }
        />
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
      enabledLoader &&
      <Modal>
      <center>
      <CircularLoader show = { enabledLoader }/>
      </center>
      </Modal>
    }
      <div>
        <br/>
          <div className = { 'percentage-grid' }>
            <div>
              <h2 className={ 'header-margin-default text-align-left' }>Biographical Data</h2>
              <h2>Setup your work experience</h2>
            </div>
            <Progress
              type = { 'circle' }
              height = { 100 }
              width = { 100 }
              percent={ percentage } />
          </div>
        <br/>
        <div className = { 'biographical-grid-card' }>
          <Card
            onClick = { () => {
              this.onCheckedPdf('/2018-09-11/12345-Pre-employment Undertaking-1536641036614.pdf')
              this.setState({ showPdfViewModal : true  })
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
        </div>
        <br/>
        <Line />
        <br/>
        {
          biographicalDataFormData.length !== 0  &&

            biographicalArray.map((status) =>
              status.status === 2 ?
              <div>
                <h4 className = { 'font-size-14px font-weight-lighter' }>
                  Your documents has been submitted for confirmation.
                </h4>
              </div>
              :
              status.status === 4 ?
              <div>
                <h4 className = { 'font-size-14px font-weight-lighter' }>
                  Your documents are verified.
                </h4>
              </div>
              :
              <div>
                <h2></h2>
                <div className = { 'text-align-right' }>
                  <GenericButton
                    text = { 'Add Attachments' }
                    onClick = { () => this.addAttachmentsFunc(biographicalDataFormData, count) }
                    />
                </div>

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
                  text = { 'Save' }
                  onClick = { () => this.submitForm(status.id) }/>
                  </center>
              </div>
            )
         }
      </div>
    </div>
    )
  }
}

BiographicalDataFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
  biographicalArray : PropTypes.array
}

BiographicalDataFragment.defaultProps = {
}

export default ConnectView(BiographicalDataFragment, Presenter)
