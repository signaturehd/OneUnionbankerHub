import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/ApprovalPresenter'

import {
  Modal,
  GenericButton,
  GenericInput,
  SingleInputModal,
  CircularLoader,
  DatePicker,
  Card,
  Line,
  FloatingActionButton
} from '../../ub-components/'

import ApprovalComponent from './components/ApprovalComponent'

import ResponseModal from '../notice/NoticeResponseModal'

import { format } from '../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/approvalStyles.css'

class ApprovalFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
      approvalArray : []
    }
  }

  componentDidMount() {
    this.presenter.getTravels()
  }

  getTravels(approvalArray) {
    this.setState({ approvalArray })
  }

  noticeResponse (noticeResponse) {
    this.setState({ noticeResponse, showNoticeResponseModal : true })
  }

  submit () {
    const {

    } = this.state

    this.presenter.addRequestFlight(

    )
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
      approvalArray
    } = this.state

    const { percentage } = this.props
    return (
      <div>
        { super.render() }
        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false })
            }}
            noticeResponse={ noticeResponse }
          />
        }
        <div className = { 'percentage-grid' }>
          <div>
          <i
          className={ 'back-arrow' }
          onClick={ () => this.navigate() }>
          </i>
            <h2 className={ 'font-size-30px text-align-left' }>Travel Approvals</h2>
            <br/>
            <h4>Below are the list travels for approval.</h4>
          </div>
        </div>
        <br/>
        <br/>
        <Line />
        <br/>
            {
              enabledLoader ?
              <center>
                <CircularLoader show = { enabledLoader }/>
              </center>
              :
                approvalArray.length !==0 ?
                  <ApprovalComponent
                    cardDataHolder = { approvalArray }/>
                :
                <center>
                  <h2>No records</h2>
                </center>
            }
      </div>
    )
  }
}

ApprovalFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(ApprovalFragment, Presenter )
