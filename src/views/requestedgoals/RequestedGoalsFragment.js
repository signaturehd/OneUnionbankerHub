import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/RequestedGoalsPresenter'

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

import RequestedGoalsComponent from './components/RequestedGoalsComponent'

import ResponseModal from '../notice/NoticeResponseModal'

import { format } from '../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/requestedGoalStyles.css'

class RequestedGoalsFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeResponseModal : false,
      editMode: false,
      showForm: false,
      noticeResponse: '',
      goalId: '',
      goalTitle: '',
      description: '',
      startDate: '',
      dueDate: '',
      priorityName: '',
      goalsArray : [
        {
          description: "Test Description",
          endDate: "2019-11-24",
          forDeletion: false,
          id: 84,
          isArchive: false,
          priority: 3,
          startDate: "2018-11-24",
          title: "Sample Title",
          type: 2
        }
      ]
    }
  }

  componentDidMount() {
    // this.presenter.getGoals()
  }

  getRequestedGoals(goalsArray) {
    this.setState({ goalsArray })
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

  priorityFunc(priority) {
    let lmh = ''
    if(priority === 1) {
      lmh = 'Low'
    } else if (priority === 2) {
      lmh = 'Medium'
    } else if (priority === 3) {
      lmh = 'High'
    } else {
      lmh = 'Priority not set'
    }
    return lmh
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
      editMode,
      showForm,
      goalId,
      goalTitle,
      description,
      startDate,
      dueDate,
      priorityName,
      goalsArray
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
        <div className = { 'grid-filter margin-left' }>
          <div>
            <GenericInput
            text = { 'Filter' }
            />
          </div>
          <div></div>
          <div className = { 'text-align-right margin-right grid-global' }>
            <GenericButton
              text = { 'Add Goal' }
              className = { 'global-button' }
              onClick = { () => this.setState({ showForm: true }) }
            />
            <GenericButton
              text = { 'Request for Coaching' }
              className = { 'global-button' }
              onClick = { () => this.setState({ showRequestCoachForm : true })}
            />
          </div>
        </div>
        <RequestedGoalsComponent
          cardHolder = { goalsArray }
          priorityFunc = { (resp) => this.priorityFunc(resp) }
          onEditFormFunc = { (
            goalId,
            goalTitle,
            description,
            startDate,
            dueDate,
            priorityName,
            editMode,
            showForm
          ) => this.setState({
            goalId,
            goalTitle,
            description,
            startDate,
            dueDate,
            priorityName,
            editMode,
            showForm
           }) }
          />
      </div>
    )
  }
}

RequestedGoalsFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(RequestedGoalsFragment, Presenter )
