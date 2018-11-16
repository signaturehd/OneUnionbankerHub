import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/MyGoalsPresenter'

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

import RequestedGoalsComponent from '../mygoals/components/RequestedGoalsComponent'
import ApprovedGoalsComponent from '../mygoals/components/ApprovedGoalsComponent'
import MyGoalsFormComponent from '../mygoals/components/MyGoalsFormComponent'

import ResponseModal from '../notice/NoticeResponseModal'

import { format } from '../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/myGoals.css'

class MyGoalsFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeResponseModal : false,
      showForm : false,
      showPriorityModal : false,
      goalTitle : '',
      description : '',
      startDate : '',
      dueDate : '',
      priorityId : '',
      priorityName : '',
      noticeResponse : '',
      goalsArray : [
        {
          "goal": "Goal title 1",
          "description": "this is a test description",
          "startDate": "11/16/2018",
          "dueDate": "12/17/2018",
          "priority": "1"
        },
        {
          "goal": "Goal title 2",
          "description": "this is a test description",
          "startDate": "04/16/2018",
          "dueDate": "06/17/2018",
          "priority": "2"
        },
        {
          "goal": "Goal title 3",
          "description": "this is a test description",
          "startDate": "02/16/2018",
          "dueDate": "03/17/2018",
          "priority": "3"
        }
      ],
      priorityArray : [
        {
          id: 1,
          name: 'Low'
        },
        {
          id: 2,
          name: 'Medium'
        },
        {
          id: 3,
          name: 'High'
        }
      ]
    }
  }

  componentDidMount() {

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
    this.props.history.push('/mylearning')
  }

  goalTitleFunc (goalTitle) {
    this.setState({ goalTitle })
  }

  descriptionFunc (description) {
    this.setState({ description })
  }

  startDateFunc (startDate) {
    this.setState({ startDate })
  }

  dueDateFunc (dueDate) {
    this.setState({ dueDate })
  }

  priorityFunc(priority) {
    let lmh = ''
    if(priority === '1') {
      lmh = 'Low'
    } else if (priority === '2') {
      lmh = 'Medium'
    } else if (priority === '3') {
      lmh = 'High'
    } else {
      lmh = 'Priority not set'
    }
    return lmh
  }

  submit() {

  }

  render () {
    const {
      enabledLoader,
      showNoticeResponseModal,
      noticeResponse,
      goalsArray,
      showForm,
      showPriorityModal,
      priorityArray,
      goalTitle,
      description,
      startDate,
      dueDate,
      priorityId,
      priorityName
    } = this.state

    return (
      <div>
        {
          enabledLoader ?
          <Modal>
            <center>
              <h2>Please wait...</h2>
              <CircularLoader show = { enabledLoader }/>
            </center>
          </Modal>
          :
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false })
            }}
            noticeResponse={ noticeResponse }
          />
        }
        {
          showPriorityModal &&
          <SingleInputModal
            label = { 'Select Priority' }
            inputArray = { priorityArray }
            selectedArray = { (priorityId, priorityName) => this.setState({
                priorityId,
                priorityName,
                showPriorityModal: false
              })
            }
            onClose = { () => this.setState({ showPriorityModal: false }) }
          />
        }
        <div className = { 'grid-container' }>
          <div className={ 'header-margin-container' }>
            <i className = { 'back-arrow' } onClick = { this.navigate.bind(this) }></i>
          </div>
          <div>
            <div>
              <h2 className={ 'header-margin-default text-align-left' }>My Goals</h2>
              <div className = { 'grid-global' }>
                <h2 className={ 'font-size-16px text-align-left' }>Descriptionnnnn description description description</h2>
                {
                  !showForm &&
                  <div className = { 'text-align-right margin-right' }>
                    <GenericButton
                      text = { 'ADD GOAL' }
                      className = { 'global-button profile-button-small' }
                      onClick = { () => this.setState({ showForm: true }) }
                    />
                  </div>
                }
              </div>
            </div>

          </div>
        </div>
        <br/>
        <Line/>
        <br/>
            {
              showForm ?
              <MyGoalsFormComponent
                onCancel = { () => this.setState({ showForm : false }) }
                submit = { () => this.submit() }
                goalTitle = { goalTitle }
                goalTitleFunc = { (resp) => this.goalTitleFunc(resp) }
                description = { description }
                descriptionFunc = { (resp) => this.descriptionFunc(resp) }
                startDate = { startDate }
                startDateFunc = { (resp) => this.startDateFunc(resp) }
                dueDate = { dueDate }
                dueDateFunc = { (resp) => this.dueDateFunc(resp) }
                priorityName = { priorityName }
                showPriorityModal = { showPriorityModal }
                showPriorityModalFunc = { () => this.setState({ showPriorityModal : true }) }
              />
              :
              goalsArray.length !== 0 &&
              <RequestedGoalsComponent
              cardHolder = { goalsArray }
              priorityFunc = { (resp) => this.priorityFunc(resp) }/>
            }
      </div>
    )
  }
}

MyGoalsFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(MyGoalsFragment, Presenter )
