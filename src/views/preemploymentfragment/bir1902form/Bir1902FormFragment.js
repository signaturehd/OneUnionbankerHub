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

import "react-sweet-progress/lib/style.css"
import './styles/birStyle.css'

class Bir1902FormFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      showPdfViewModal : false,
      enabledLoader : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
      bir1902FormData: [{
        name : 'BIR 1902 Form'
      }],
      pdfFile: '',
      count : 2
    }
    this.addAttachmentsFunc = this.addAttachmentsFunc.bind(this)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(12)
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
      history,
      checkPEUndertaking,
      percentage,
      bir1902Array
    } = this.props

    const {
      enabledLoader,
      showNoticeResponseModal,
      noticeResponse,
      bir1902FormData,
      showPdfViewModal,
      pdfFile,
      count
    } = this.state

    return(
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
      <div>
        <br/>
          <div className = { 'percentage-grid' }>
            <div>
            <h2 className={ 'header-margin-default text-align-left' }>BIR 1902 Form</h2>
            <h2>Please download the BIR 1902 form by clicking the button below</h2>
            </div>
            <Progress
              type = { 'circle' }
              height = { 100 }
              width = { 100 }
              percent={ percentage } />
          </div>
        <br/>
        <div className = { 'abc-grid-card' }>
          <Card
            onClick = { () => {
              this.onCheckedPdf('/2018-09-11/12345-Pre-employment Undertaking-1536641036614.pdf')
              this.setState({ showPdfViewModal : true  })
              }
            }
            className = { 'abc-card' }>
            <div className = { 'abc-grid-x2' }>
              <h2>Download BIR 1902 Form</h2>
              <div>
                <span className = { 'abc-icon biographical-seemore-button' }/>
              </div>
            </div>
          </Card>
        </div>
        <br/>
        <Line />
        <br/>

        <br/>
        {
          bir1902FormData.length !== 0  &&
          bir1902Array.map((status) =>
            status.status === 2 ?
            <div>
            <center>
              <h4 className = { 'font-size-14px font-weight-lighter' }>
                Your documents has been <b>submitted for confirmation</b>.
              </h4>
            </center>
            </div>
            :
            status.status === 4 ?
            <div>
            <center>
              <h4 className = { 'font-size-14px font-weight-lighter' }>
                Your documents are <b>verified</b>.
              </h4>
            </center>
            </div>
            :
            <div>
            <div className = { 'grid-global' }>
              <h2></h2>
              <div className = { 'text-align-right' }>
                <GenericButton
                  text = { 'Add Attachments' }
                  onClick = { () => this.addAttachmentsFunc(bir1902FormData, count) }
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
              fileArray = { bir1902FormData }
              setFile = { (bir1902FormData) =>
                  this.setState({ bir1902FormData })
              }
              />
              <center>
               <GenericButton
                 text = { 'Upload' }
                 onClick = { () => this.uploadForm()  }
               />
             </center>
            </div>
          )
         }
      </div>
    </div>
    )
  }
}

Bir1902FormFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
  birthArray : PropTypes.array
}

Bir1902FormFragment.defaultProps = {
}

export default ConnectView(Bir1902FormFragment, Presenter)
