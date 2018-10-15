import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/NbiClearancePresenter'

import {
  Modal,
  GenericButton,
  CircularLoader,
  MultipleFileUploader,
  Card,
  Line,
} from '../../../ub-components/'

import { Progress } from 'react-sweet-progress'
import ResponseModal from '../../notice/NoticeResponseModal'

class NbiClearanceFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
      nbiClearance : [{
        name : 'NBI Clearance'
      }]
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(7)
  }

  submitForm (id) {
    const {
      nbiClearance
    } = this.state

    this.presenter.addNbiClearance(id, nbiClearance)
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
      nbiClearance,
      showNoticeResponseModal,
      noticeResponse
     } = this.state

    const { percentage, nbiArray } = this.props

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
            <h2 className={ 'header-margin-default text-align-left' }>NBI Clearance</h2>
            <h2>Please secure the transaction by attaching your latest NBI Clearance</h2>
          <br/>
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
          nbiArray.map((status) =>
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
                    NBI Clearance Attachments
                  </h4>
                  <br/>
                  <MultipleFileUploader
                    placeholder = { '' }
                    fileArray = { nbiClearance }
                    setFile = { (nbiClearance) =>
                      this.setState({ nbiClearance })
                      }
                    />
                  <center>
                    <GenericButton
                    text = { 'Upload' }
                    onClick = { () => this.submitForm(status.id) }/>
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

NbiClearanceFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func,
  nbiArray : PropTypes.array
}

export default ConnectView(NbiClearanceFragment, Presenter )
