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

import Presenter from './presenter/BirthCertificatePresenter'
import ResponseModal from '../../notice/NoticeResponseModal'

import "react-sweet-progress/lib/style.css"
import './styles/birthCertificateStyle.css'

class BirthCertificateFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
      birthDataFormData: [{
        name : 'Birth Certificate'
      }],
      pdfFile: '',
      count : 2
    }
    this.addAttachmentsFunc = this.addAttachmentsFunc.bind(this)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(3)
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
      birthCertifArray
    } = this.props
    birthCertifArray.map((resp) =>
    this.presenter.addBirthCertificateData(resp.id, birthDataFormData)
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
      birthArray,
      birthCertifArray
    } = this.props

    const {
      enabledLoader,
      showNoticeResponseModal,
      noticeResponse,
      birthDataFormData,
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
        <div>
          <center>
            <br/>
            <h2>Please wait while we we&#39;re validating your submitted documents</h2>
            <br/>
            <CircularLoader show = { enabledLoader }/>
            <br/>
          </center>
        </div>
      </Modal>
    }
      <div>
        <br/>
          <div className = { 'percentage-grid' }>
            <div>
              <h2 className={ 'header-margin-default text-align-left' }>Birth Certificate</h2>
              <h2>Please attach your Birth Certificate</h2>
            </div>
            <Progress
              type = { 'circle' }
              height = { 65 }
              width = { 65 }
              percent = { percentage } />
          </div>
        <br/>
        <Line />
        <br/>
        {
          birthCertifArray.length !== 0 &&
          birthCertifArray.map((status) =>
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
                    onClick = { () => this.addAttachmentsFunc(birthDataFormData, count) }
                    />
                </div>
              </div>
              <h4>
                Birth Certitificate Attachments
              </h4>
              <br/>
              <MultipleAttachments
                count = { count }
                countFunc = { (count) => this.setState({ count }) }
                placeholder = { '' }
                fileArray = { birthDataFormData }
                setFile = { (birthDataFormData) =>
                    this.setState({ birthDataFormData })
                }
                />
                <center>
                <GenericButton
                text = { 'Upload' }
                onClick = { () => this.submitForm()
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

BirthCertificateFragment.propTypes = {
  onSendPageNumberToView  : PropTypes.func,
  birthArray : PropTypes.array,
  birthCertifArray : PropTypes.array
}

BirthCertificateFragment.defaultProps = {
}

export default ConnectView(BirthCertificateFragment, Presenter)
