import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/SSSPresenter'

import {
  Modal,
  GenericButton,
  CircularLoader,
  MultipleFileUploader,
  GenericInput,
  Card,
  Line,
} from '../../../ub-components/'

import ResponseModal from '../../notice/NoticeResponseModal'
import ViewAttachmentModal from '../../preemployment/modals/ViewAttachmentModal'

import PreEmploymentViewAttachmentsComponent from '../../preemployment/components/PreEmploymentViewAttachmentsComponent'

import {
  RequiredNumberValidation
} from '../../../utils/validate'

import { Progress } from 'react-sweet-progress'

import './styles/sssStyle.css'

class SSSFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeResponseModal : false,
      showViewModal : false,
      noticeResponse : '',
      sssInput : '',
      sssAttachment : [{
        name : 'SSS ID / E1 Form',
      }],
      attachments: [],
      viewFile : '',
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(10)
    this.presenter.getEmployeeSSS()
    this.checkAttachments()
  }

  setSSSAttachments () {
    this.setState({
      sssAttachment : [{
        name : 'SSS ID / E1 Form',
    }] })
    this.props.reloadPreEmploymentForm()
  }

  checkAttachments () {
    const {
      sssArray
    } = this.props

    this.presenter.getSelectedAttachments(sssArray)
  }

  showAttachmentsFileView (data) {
    let arrayNew = [...this.state.attachments]
    const objectArray = {
      file : data
    }
    arrayNew.push(objectArray)
    this.setState({ attachments : arrayNew })
  }

  showEmployeeSSSData (sssData) {
    this.setState({ sssInput : sssData.sss })
  }

  setFileAttachments (sssAttachment) {
    this.setState({ sssAttachment })
  }

  saveForm () {
    const {
      sssInput
    } = this.state
    this.presenter.saveEmployeeSSS(sssInput)
  }

  uploadForm () {
    const {
      sssAttachment
    } = this.state

    const {
      sssArray
    } = this.props

    sssArray.map((sss) =>
      this.presenter.uploadEmployeeSSS(sss.id, sssAttachment)
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

  inputSSSValidate (e) {
    const validate = new RequiredNumberValidation().isValid(e)
    this.setState({ sssInput : validate ? e : '' })
  }

  render () {

    const {
      enabledLoader,
      showViewModal,
      showNoticeResponseModal,
      noticeResponse,
      sssInput,
      sssAttachment,
      attachments,
      viewFile,
    } = this.state

    const { percentage, sssArray } = this.props

    return (
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
          <center>
          <br/>
          <h2>Please wait while we we&#39;re validating your submitted documents</h2>
          <br/>
          <CircularLoader show = { enabledLoader }/>
          </center>
          </Modal>
        }
        {
          showViewModal &&
          <ViewAttachmentModal
            file = { viewFile }
            onClose = { () => this.setState({ showViewModal : false }) }
          />
        }
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'header-margin-default text-align-left' }>SSS Form</h2>
            <h2>Please input your SSS number and attach the missing requirements to settle the transaction.</h2>
          <br/>
          </div>
          <Progress
            type = { 'circle' }
            height = { 65 }
            width = { 65 }
            percent = { percentage } />
        </div>
        <br/>
          <GenericInput
            value = { sssInput }
            text = { 'SSS Number' }
            maxLength = { 10 }
            onChange = { e => this.inputSSSValidate(e.target.value) }
          />
        <br/>
        <center>
          <GenericButton
          text = { 'Save' }
          onClick = { () => this.saveForm() }/>
        </center>
        <br/>
        <Line />
        <br/>
        {
          sssArray.map((status) =>
          <div>
            {
              attachments.length !== 0 &&
                enabledLoader ?
                <center>
                <CircularLoader show = { enabledLoader } />
                </center>
                :
                attachments.map((resp) =>
                <div className = { 'sss-grid-attachment' }>
                  <PreEmploymentViewAttachmentsComponent
                    file = { resp.file }
                    onClick = { (viewFile) => this.setState({ viewFile, showViewModal : true }) }/>
                </div>
              )
            }
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
                <h4>
                  SSS Attachments
                </h4>
                <br/>
                <MultipleFileUploader
                  placeholder = { '' }
                  fileArray = { sssAttachment }
                  setFile = { (resp) => this.setFileAttachments(resp) }
                  />
                <center>
                  <GenericButton
                  text = { 'Upload' }
                  onClick = { () => this.uploadForm() }/>
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

SSSFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func,
  sssArray : PropTypes.array
}

export default ConnectView(SSSFragment, Presenter )
