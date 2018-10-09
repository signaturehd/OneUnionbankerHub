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

import {
  RequiredNumberValidation
} from '../../../utils/validate'

import { Progress } from 'react-sweet-progress'

class SSSFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
      sssInput : '',
      sssAttachment : [{
        name : 'SSS ID / E1 Form',
      }]
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(10)
    this.presenter.getEmployeeSSS()
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
      showNoticeResponseModal,
      noticeResponse,
      sssInput,
      sssAttachment
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
          <CircularLoader show = { enabledLoader }/>
          </center>
          </Modal>
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
            height = { 100 }
            width = { 100 }
            percent={ percentage } />
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
            <h4>
              SSS Attachments
            </h4>
            <br/>
          <MultipleFileUploader
            placeholder = { '' }
            fileArray = { sssAttachment }
            setFile = { (resp) => this.setAttachments(resp) }
            />
          <center>
          <GenericButton
          text = { 'Upload' }
          onClick = { () => this.uploadForm() }/>
          </center>
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
