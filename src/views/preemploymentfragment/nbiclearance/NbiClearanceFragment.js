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
            percent={ percentage } />
        </div>
        <br/>
        <Line />
        <br/>
        {
          nbiArray.map((status) =>
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
                text = { 'Save' }
                onClick = { () => this.submitForm(status.id) }/>
              </center>
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
