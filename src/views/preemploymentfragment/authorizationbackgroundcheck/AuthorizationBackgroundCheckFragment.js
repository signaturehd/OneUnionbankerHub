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

import Presenter from './presenter/AuthorizationBackgroundCheckPresenter'
import ResponseModal from '../../notice/NoticeResponseModal'

import "react-sweet-progress/lib/style.css"
import './styles/authorizationStyle.css'

class AuthorizationBackgroundCheckFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      showPdfViewModal : false,
      enabledLoader : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
      birthDataFormData: [{
        name : 'Birth Certificate'
      }],
      pdfFile: '',
      count : 2,
      biographicalName : ''
    }
    this.addAttachmentsFunc = this.addAttachmentsFunc.bind(this)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(8)
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
      name : 'Birth Certificate Attachments ' + tempCount
    })
    this.setState({ birthDataFormData : attachmentTemp })
  }

  submitForm () {
    const {
      birthDataFormData
    } = this.state

    const {
      birthArray
    } = this.props
    birthArray.map((bio) =>
      this.presenter.addBiographicalData(bio.id, birthDataFormData)
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
      birthArray
    } = this.props

    const {
      enabledLoader,
      showNoticeResponseModal,
      noticeResponse,
      birthDataFormData,
      biographicalData,
      biographicalName,
      showPdfViewModal,
      pdfFile,
      count
    } = this.state

    const bioAttachmentArray = [
      {
        name : 'Birth Certificate ' + count
      }
    ]

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
      <div>
        <br/>
          <div className = { 'percentage-grid' }>
            <div>
            <h2 className={ 'header-margin-default text-align-left' }>Authorization of Background Checks</h2>
            <h2>Make sure that you download the attached Data form before proceeding</h2>
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
              <h2>Birth Certificate</h2>
              <div>
                <span className = { 'abc-icon biographical-seemore-button' }/>
              </div>
            </div>
          </Card>
        </div>
        <br/>
        <Line />
        <br/>
        <div className = { 'grid-global' }>
          <h2></h2>
          <div className = { 'text-align-right' }>
            <GenericButton
              text = { 'Add Attachments' }
              onClick = { () => this.addAttachmentsFunc(birthDataFormData, count) }
              />
          </div>
        </div>
      </div>
    </div>
    )
  }
}

AuthorizationBackgroundCheckFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
  birthArray : PropTypes.array
}

AuthorizationBackgroundCheckFragment.defaultProps = {
}

export default ConnectView(AuthorizationBackgroundCheckFragment, Presenter)
