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
import RequestedGoalsComponent from '../mygoals/components/RequestedGoalsComponent'
import ApprovedGoalsComponent from '../mygoals/components/ApprovedGoalsComponent'
import MyGoalsFormComponent from '../mygoals/components/MyGoalsFormComponent'
import RequestCoachFragment from '../requestCoach/RequestCoachFragment'

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
    this.presenter.getGoals()
    this.presenter.getForApprovalGoals()
  }

  getRequestedGoals(goalsArray) {
    this.setState({ goalsArray })
  }

  getForApprovalGoals(approvalArray) {
    this.setState({ approvalArray })
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
    const { isLineManager } = this.props
    const {
      enabledLoader,
      showNoticeResponseModal,
      noticeResponse,
      goalsArray,
      approvalArray,
      showForm,
      showPriorityModal,
      showGoalTypeModal,
      editMode,
      forApproval,
      showApprovalForm,
      priorityArray,
      employeeName,
      goalId,
      goalTitle,
      description,
      startDate,
      dueDate,
      priorityId,
      priorityName,
      goalTypeId,
      goalType,
      goalTypeArray,
      approvalStatus,
      rejectedRemarks,
      showRejectRemarksModal,
      showRequestCoachForm
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
              this.resetValue(),
              this.setState({ showNoticeResponseModal : false })
            }}
            noticeResponse={ noticeResponse ? noticeResponse : 'You have successfully Approved this Goal Request.' }
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
        {
          showGoalTypeModal &&
          <SingleInputModal
            label = { 'Select Priority' }
            inputArray = { goalTypeArray }
            selectedArray = { (goalTypeId, goalType) => this.setState({
                goalTypeId,
                goalType,
                showGoalTypeModal: false
              })
            }
            onClose = { () => this.setState({ showGoalTypeModal: false }) }
          />
        }
        {
          showRequestCoachForm ?
          <RequestCoachFragment/>
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
              {
                !showForm ?
                <div className = { 'tabs-container' }>
                <input
                  className = { 'input-tab' }
                  id = { 'tab1' }
                  type = { 'radio' }
                  name = { 'tabs' }
                  defaultChecked = { true }
                  onClick = { () => {
                      this.setState({ showApprovalForm : false })
                      this.props.history.push('/mylearning/mygoals/request')
                    }
                  }/>
                <label className = { 'travel-icon-tab' } htmlFor='tab1'>Individual Goals</label>

                <label>
                    <input
                      className = { 'input-tab' }
                      id = { 'tab2' }
                      type = { 'radio' }
                      name = { 'tabs' }
                      onClick = { () => {
                          this.setState({ showApprovalForm : false })
                          this.props.history.push('/mylearning/mygoals/team')
                        }
                      }/>
                    <label className = { 'travel-icon-tab' } htmlFor='tab2'>Team Goals</label>
                </label>

                {
                  !isLineManager &&
                  <label>
                    <input
                      className = { 'input-tab' }
                      id = { 'tab3' }
                      type = { 'radio' }
                      name = { 'tabs' }
                      onClick = { () => {
                          this.setState({ forApproval : true })
                          this.props.history.push('/mylearning/mygoals/approved')
                        }
                      }/>
                    <label className = { 'travel-icon-tab' } htmlFor='tab3'>For Approval</label>
                  </label>
                }
                <section id='content1'>
                  <Switch>
                    <Route exact path='/mygoals/request/RequestedGoalsComponent'
                      render={ props => <RequestedGoalsComponent { ...props } /> }/>
                    <Route exact path='/mygoals/approved/ApprovedGoalsComponent'
                      render={ props => <ApprovedGoalsComponent { ...props } /> }/>
                   </Switch>
                </section>
                {
                  !showApprovalForm &&
                  <div className = { 'grid-filter margin-left' }>
                    <div>
                      <GenericInput
                      text = { 'Filter' }
                      />
                    </div>
                    <div></div>
                    {
                      !showForm &&
                      <div className = { 'text-align-right margin-right' }>
                        <br/>
                        <GenericButton
                          text = { 'ADD GOAL' }
                          className = { 'global-button profile-button-small' }
                          onClick = { () => this.setState({ showForm: true }) }
                        />
                      </div>
                    }
                  </div>
                }
                {
                  !forApproval ?
                  goalsArray.length !== 0 &&
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
                  :
                  showApprovalForm ?
                  <GoalApprovalFormComponent
                    employeeName = { employeeName }
                    goalId = { goalId }
                    goalTitle = { goalTitle }
                    approvalStatus = { approvalStatus }
                    description = { description }
                    priorityId = { priorityId }
                    startDate = { startDate }
                    dueDate = { dueDate }
                    goalTypeId = { goalTypeId }
                    rejectedRemarks = { rejectedRemarks }
                    showRejectRemarksModal = { showRejectRemarksModal }
                    showRejectRemarksFunc = { () => this.setState({ showRejectRemarksModal : true }) }
                    rejectedRemarksFunc = { (resp) => this.setState({ rejectedRemarks: resp }) }
                    onApprovalSubmit = { (goalId, isApproved, rejectedRemarks) => {
                        this.onApprovalSubmit(goalId, isApproved, rejectedRemarks)
                        this.resetValue()
                      }
                    }
                    onClose = { () => this.setState({ showRejectRemarksModal: false }) }
                  />
                  :
                    approvalArray.length !== 0 &&
                    approvalArray.map((resp, key) =>

                    <ApprovedGoalsComponent
                      employeeName = { resp.name }
                      imageUrl = { resp.imageUrl }
                      cardHolder = { resp.goalDetails }
                      priorityFunc = { (resp) => this.priorityFunc(resp) }
                      showApprovalFormFunc = {
                        (
                          employeeName,
                          goalId,
                          goalTitle,
                          approvalStatus,
                          description,
                          priorityId,
                          startDate,
                          dueDate,
                          goalTypeId
                        ) =>
                        this.setState ({
                          employeeName,
                          goalId,
                          goalTitle,
                          approvalStatus,
                          description,
                          priorityId,
                          startDate,
                          dueDate,
                          goalTypeId,
                          showApprovalForm : true
                        })
                      }
                    />

                    )

                }
              </div>
              :
              <MyGoalsFormComponent
              onCancel = { () => {
                  this.setState({ showForm : false })
                  this.resetValue()
                }
              }
              onSubmit = { () => this.onSubmit() }
              goalTitle = { goalTitle }
              goalTitleFunc = { (resp) => this.goalTitleFunc(resp) }
              description = { description }
              descriptionFunc = { (resp) => this.descriptionFunc(resp) }
              startDate = { startDate }
              startDateFunc = { (resp) => this.startDateFunc(resp) }
              dueDate = { dueDate }
              dueDateFunc = { (resp) => this.dueDateFunc(resp) }
              priorityName = { priorityName }
              goalType = { goalType }
              showPriorityModal = { showPriorityModal }
              showPriorityModalFunc = { () => this.setState({ showPriorityModal : true }) }
              showGoalTypeModal = { showGoalTypeModal }
              showGoalTypeModalFunc = { () => this.setState({ showGoalTypeModal : true }) }
              editMode = { editMode }
              onEdit = { () => this.onEdit() }
              />
            }
              <FloatingActionButton
                onClick = { () => this.setState({ showRequestCoachForm : true })
                }
              />
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
