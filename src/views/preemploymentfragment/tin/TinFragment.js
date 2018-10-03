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
            height = { 100 }
            width = { 100 }
            percent={ percentage } />
        </div>
        <br/>
          <GenericInput
            text = { 'Taxpayer Identification Number(TIN)' }
            value = { tinInput }
            maxLength = { 9 }
            minLength = { 9 }
            onChange = { e => this.setState({ tinInput : e.target.value }) }
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
          tinArray.map((status) =>
          status.status === 3 ?
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
            <h4>
              TIN Attachments
            </h4>
            <br/>
          <MultipleFileUploader
            placeholder = { '' }
            fileArray = { tinAttachment }
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

TinFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func,
  tinArray : PropTypes.array
}

export default ConnectView(TinFragment, Presenter )
