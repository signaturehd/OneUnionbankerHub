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

import RequestCoachFormFragment from './components/RequestCoachFormFragment'

import ResponseModal from '../notice/NoticeResponseModal'

import { format } from '../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/requestCoachStyles.css'

class RequestCoachFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeResponseModal : false,
      noticeResponse: '',
      description : '',
      preferredDate : '',
      preferredTime : ''
    }
  }

  componentDidMount() {
  }

  noticeResponse (noticeResponse) {
    this.setState({ noticeResponse, showNoticeResponseModal : true })
  }

  submit (requestId, isApprove, rejectedRemarks) {
    isApprove ?
    this.presenter.addApproval(
      requestId,
      isApprove,
      ''
    )
    :
    this.presenter.addApproval(
      requestId,
      isApprove,
      rejectedRemarks
    )
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  navigate () {
    this.props.history.push('/mylearning/mygoals')
  }

  noticeResponse (noticeResponse) {
    this.setState({
      noticeResponse,
      showNoticeResponseModal : true
    })
  }

  resetValue () {
    this.setState({
      description : '',
      preferredTime : '',
      preferredDate : ''
    })
  }

  render () {
    const {
      enabledLoader,
      showNoticeResponseModal,
      noticeResponse,
      description,
      preferredDate,
      preferredTime
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
        {
          enabledLoader &&
          <Modal>
            <center>
              <h2>Please wait...</h2>
              <CircularLoader show = { enabledLoader } />
            </center>
          </Modal>
        }
        <div>
          <i
          className={ 'back-arrow' }
          onClick={ () => this.navigate() }>
          </i>
        </div>
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'font-size-30px text-align-left' }>Request For Coaching</h2>
            <br/>
            <h4></h4>
          </div>
        </div>
        <br/>
        <br/>
        <Line />
        <br/>
          <RequestCoachFormFragment

          />
      </div>
    )
  }
}

RequestCoachFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(RequestCoachFragment, Presenter )
