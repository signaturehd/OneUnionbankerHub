import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'

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

import GoalApprovalFormComponent from '../mygoals/components/GoalApprovalFormComponent'
import RequestedGoalsFragment from '../requestedgoals/RequestedGoalsFragment'
import ApprovalGoalsFragment from '../approvalgoals/ApprovalGoalsFragment'
import RequestCoachFragment from '../requestCoach/RequestCoachFragment'
import TeamGoalsFragment from '../teamgoal/TeamGoalsFragment'

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
      showGoalTypeModal : false,
      editMode : false,
      forApproval : false,
      showApprovalForm : false,
      showRejectRemarksModal : false,
      showRequestCoachForm : false,
      showTeamGoal: false,
      employeeName: '',
      goalId : '',
      goalTitle : '',
      description : '',
      startDate : '',
      dueDate : '',
      priorityId : '',
      priorityName : '',
      noticeResponse : '',
      goalTypeId : '',
      goalType : '',
      approvalStatus: '',
      rejectedRemarks: '',
      goalsArray : [],
      approvalArray : [],
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
      ],
      goalTypeArray : [
        {
          id: 1,
          name: 'Performance'
        },
        {
          id: 2,
          name: 'Developemental'
        }
      ]
    }
  }

  componentDidMount() {
    this.props.setSelectedNavigation(14)
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
    this.props.history.push('/')
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

  onSubmit() {
    const {
      goalTitle,
      description,
      startDate,
      dueDate,
      priorityId,
      goalTypeId
    } = this.state
    this.presenter.addRequestedGoals (
      goalTitle,
      description,
      moment(startDate).format('YYYY-MM-DD'),
      moment(dueDate).format('YYYY-MM-DD'),
      priorityId,
      goalTypeId
    )
  }

  onEdit() {
    const { goalId, dueDate } = this.state
    this.presenter.updateGoals (
      goalId,
      moment(dueDate).format('YYYY-MM-DD')
    )
  }

  onApprovalSubmit(goalId, isApprove, rejectedRemarks) {
    isApprove ?
    this.presenter.approveGoal(
      goalId,
      isApprove,
      ''
    )
    :
    this.presenter.approveGoal(
      goalId,
      isApprove,
      rejectedRemarks
    )
  }

  resetValue() {
    this.setState({
      goalTitle: '',
      description: '',
      startDate: '',
      dueDate: '',
      priorityId: '',
      priorityName: '',
      goalTypeId: '',
      goalType: '',
      rejectedRemarks: '',
      showForm: false,
      showApprovalForm : false
    })
  }

  render () {
    const { isLineManager, isPO, employeeNumber } = this.props
    const {
      enabledLoader,
      showNoticeResponseModal,
      noticeResponse,
      goalsArray,
      showForm,
      showPriorityModal,
      showGoalTypeModal,
      editMode,
      forApproval,
      showApprovalForm,
      priorityArray,
      showRequestCoachForm,
      showTeamGoal
    } = this.state

    return (
      <div>
        {
          showRequestCoachForm ?
          <RequestCoachFragment
          onClose = { () => this.setState({ showRequestCoachForm: false }) }
          />
          :
          <div className = { 'grid-container' }>
            <div className={ 'header-margin-container' }>
              <i className = { 'back-arrow' } onClick = { this.navigate.bind(this) }></i>
            </div>
            <div>
              <div>
                <h2 className={ 'header-margin-default text-align-left' }>My Goals</h2>
                <div className = { 'grid-global' }>
                  <h2 className={ 'font-size-16px text-align-left' }>Below are the list of your goals</h2>
                </div>
              </div>
              <br/>
              <div className = { 'mygoal-tabs-container' }>
                <input
                  className = { 'mygoal-input-tab' }
                  id = { 'mygoal-tab1' }
                  type = { 'radio' }
                  name = { 'tabs' }
                  defaultChecked = { true }
                  onClick = { () => {
                      this.setState({ showTeamGoal: false, forApproval : false, showApprovalForm : false })
                      this.props.history.push('/mygoals/request')
                    }
                  }/>
                <label className = { 'mygoal-icon-tab' } htmlFor='mygoal-tab1'>Individual Goals</label>

                <input
                  className = { 'mygoal-input-tab' }
                  id = { 'mygoal-tab2' }
                  type = { 'radio' }
                  name = { 'tabs' }
                  onClick = { () => {
                      this.setState({ showTeamGoal: true, forApproval : false, showApprovalForm : false })
                      this.props.history.push('/mygoals/team')
                    }
                  }/>
                  {
                    isLineManager &&
                    <label className = { 'mygoal-icon-tab' } htmlFor='mygoal-tab2'>Team Goals</label>
                  }

                  <input
                    className = { 'mygoal-input-tab' }
                    id = { 'mygoal-tab3' }
                    type = { 'radio' }
                    name = { 'tabs' }
                    onClick = { () => {
                        this.setState({ forApproval : true })
                        this.props.history.push('/mygoals/approved')
                      }
                    }/>
                  {
                    isLineManager &&
                    <label className = { 'mygoal-icon-tab' } htmlFor='mygoal-tab3'>For Approval</label>
                  }
                <section>
                  <Switch>
                    <Route exact path='/mygoals/request/RequestedGoalsFragment'
                      render={ props => <RequestedGoalsFragment { ...props } /> }/>
                    <Route exact path='/mygoals/team/TeamGoalsFragment'
                      render={ props => <TeamGoalsFragment { ...props } /> }/>
                    <Route exact path='/mygoals/approved/ApprovedGoalsComponent'
                      render={ props => <ApprovedGoalsComponent { ...props } /> }/>
                   </Switch>
                </section>

                {
                  !forApproval ?
                    showTeamGoal ?
                    <TeamGoalsFragment
                      employeeNumber = { employeeNumber }
                      isLineManager = { isLineManager }
                      isPO = { isPO }
                    />
                    :
                    <RequestedGoalsFragment
                      employeeNumber = { employeeNumber }
                      isLineManager = { isLineManager }
                      showRequestCoachForm = { showRequestCoachForm }
                      showRequestCoachFunc = { (resp) => this.setState({ showRequestCoachForm : resp }) }/>
                  :
                  <ApprovalGoalsFragment/>
                }
              </div>
            </div>
          </div>
        }
        </div>
    )
  }
}

MyGoalsFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(MyGoalsFragment, Presenter )
