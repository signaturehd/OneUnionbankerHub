import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/TinPresenter'

import {
  Modal,
  GenericButton,
  CircularLoader,
  MultipleFileUploader,
  GenericInput,
  Card,
  Line,
} from '../../../ub-components/'

import {
  RequiredNumberValidation
} from '../../../utils/validate'

import ResponseModal from '../../notice/NoticeResponseModal'

import { Progress } from 'react-sweet-progress'

class TinFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
      tinInput : '',
      tinAttachment : [{
        name : 'TIN ID/ BIR FORM',
      }]
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(11)
    this.presenter.getEmployeeTin()
  }

  showEmployeeTinData (tinData) {
    this.setState({ tinInput : tinData.tin })
  }

  saveForm () {
    const {
      tinInput
    } = this.state
    this.presenter.saveEmployeeTin(tinInput)
  }

  uploadForm () {
    const {
      tinAttachment
    } = this.state

    const {
      tinArray
    } = this.props
    tinArray.map((tin) =>
      this.presenter.uploadEmployeeTin(tin.id, tinAttachment)
    )
  }

  setTinAttachments () {
    this.setState({
      tinAttachment : [{
        name : 'TIN ID/ BIR FORM',
    }] })
    this.props.reloadPreEmploymentForm()
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

  inputTinValidate (e) {
    const validate = new RequiredNumberValidation().isValid(e)

    this.setState({ tinInput : validate ? e : '' })
  }

  setFileAttachments (tinAttachment) {
    this.setState({ tinAttachment })
  }

  render () {

    const {
      enabledLoader,
      showNoticeResponseModal,
      noticeResponse,
      tinInput,
      tinAttachment
    } = this.state
    const { percentage, tinArray } = this.props

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
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'header-margin-default text-align-left' }>TIN Form</h2>
            <h2></h2>
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
            text = { 'Taxpayer Identification Number(TIN)' }
            value = { tinInput }
            minLength = { 9 }
            onChange = { e => this.inputTinValidate(e.target.value) }
          />
          <center>
          <GenericButton
            text = { 'Save' }
            onClick = { () => this.saveForm() }/>
          </center>
        <br/>
        <Line />
        <br/>
        {
          tinArray.map((status) =>
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
              <h4>
                TIN Attachments
              </h4>
              <br/>
            <MultipleFileUploader
              placeholder = { '' }
              fileArray = { tinAttachment }
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

TinFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func,
  tinArray : PropTypes.array
}

export default ConnectView(TinFragment, Presenter )
