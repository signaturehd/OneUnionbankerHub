import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/RequestCoachPresenter'

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
      preferredTime : '',
      preferredTimeErrorMessage: ''
    }
  }

  preferredTimeFunc(preferredTime) {
    const { preferredDate } = this.setState
    if(moment(preferredDate).format('MM/DD/YYYY') === moment().format('MM/DD/YYYY')) {
      preferredTime <= moment().format('HH:mm') ?
        this.setState({ preferredTime, preferredTimeErrorMessage: 'Please select present time.' })
        :
        this.setState({ preferredTime, preferredTimeErrorMessage: '' })
    }
    else {
      this.setState({ preferredTime, preferredTimeErrorMessage: '' })
    }
  }

  noticeResponse (noticeResponse) {
    this.setState({ noticeResponse, showNoticeResponseModal : true })
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

  onSubmit() {
    const {
      description,
      preferredDate,
      preferredTime
    } = this.state

    this.presenter.requestCoach(
      description,
      moment(preferredDate).format('YYYY-MM-DD'),
      preferredTime
    )
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
      preferredTime,
      preferredTimeErrorMessage
    } = this.state

    const { onClose } = this.props
    return (
      <div>
        { super.render() }
        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false })
              onClose()
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


          <h2 className={ 'header-margin-default text-align-left' }>Request For Coaching</h2>
          <div className = { 'grid-global' }>
            <h2 className={ 'font-size-16px text-align-left' }>Write a short message to your line manager about the help you need.</h2>
          </div>
        <br/>
        <br/>
        <Line />
        <br/>
          <RequestCoachFormFragment
          description = { description }
          descriptionFunc = { (description) => this.setState({ description }) }
          preferredDate = { preferredDate }
          preferredDateFunc = { (preferredDate) => this.setState({ preferredDate }) }
          preferredTime = { preferredTime }
          preferredTimeFunc = { (preferredTime) => this.preferredTimeFunc(preferredTime) }
          preferredTimeErrorMessage = { preferredTimeErrorMessage }
          onClose = { () => onClose() }
          onSubmit = { () => this.onSubmit() }
          />
      </div>
    )
  }
}

RequestCoachFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(RequestCoachFragment, Presenter )
