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
import AddGoalsFormComponent from './components/AddGoalsFormComponent'
import TasksListComponent from './components/TasksListComponent'
import RequestCoachFragment from '../requestCoach/RequestCoachFragment'

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
      submitLoader: false,
      showNoticeResponseModal : false,
      editMode: false,
      showForm: false,
      noticeResponse: '',
      showPriorityModal : false,
      showGoalTypeModal : false,
      addTask: false,
      taskDescription: '',
      goalId: '',
      goalTitle: '',
      goalTitleErrorMessage: '',
      description: '',
      descriptionErrorMessage: '',
      startDate: '',
      startDateErrorMessage: '',
      dueDate: '',
      dueDateErrorMessage: '',
      priorityId: '',
      priorityName: '',
      priorityErrorMessage: '',
      approvalStatus : '',
      goalTypeId : '',
      goalType : '',
      goalTypeErrorMessage : '',
      taskArray: [],
      goalsArray : [
        {
          "id": 4,
          "title": "test goal title 1",
          "description": "this is a test description",
          "startDate": "11/15/2018",
          "endDate": "11/16/2018",
          "priority": 1,
          "status": 1
          },
          {
          "id": 5,
          "title": "test goal title 1",
          "description": "this is a test description",
          "startDate": "11/15/2018",
          "endDate": "11/16/2018",
          "priority": 1,
          "status": 1
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
    // this.presenter.getGoals()
    // this.scrollFunction()
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

  hideSubmitLoader () {
    this.setState({ submitLoader : false })
  }

  showSubmitLoader () {
    this.setState({ submitLoader : true })
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

  taskDescriptionFunc (taskDescription) {
    this.setState({ taskDescription })
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

    if(!goalTitle) {
      this.setState({ goalTitleErrorMessage: 'Required field' })
    } else if (!description) {
      this.setState({ descriptionErrorMessage: 'Required field' })
    } else if (!startDate) {
      this.setState({ startDateErrorMessage: 'Required field' })
    } else if (!dueDate) {
      this.setState({ dueDateErrorMessage: 'Required field' })
    } else if (!priorityId) {
      this.setState({ priorityErrorMessage: 'Required field' })
    } else if (!goalTypeId) {
      this.setState({ goalTypeErrorMessage: 'Required field' })
    }
    else {
      this.presenter.addRequestedGoals (
        goalTitle,
        description,
        moment(startDate).format('YYYY-MM-DD'),
        moment(dueDate).format('YYYY-MM-DD'),
        priorityId,
        goalTypeId
      )
    }
  }

  submitTask() {
    const { goalId, taskDescription } = this.state
    this.presenter.addGoalTask(goalId, taskDescription)
  }

  scrollFunction () {
    var header = $("#main-div");
      $(window).scroll(function() {
        var scroll = $(window).scrollTop();
           if (scroll >= window.innerHeight) {
              header.addClass("div-fixed");
            } else {
              header.removeClass("div-fixed");
            }
    });
  }

  resetValue () {
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
    const {
      enabledLoader,
      submitLoader,
      showNoticeResponseModal,
      noticeResponse,
      addTask,
      editMode,
      showForm,
      showPriorityModal,
      showGoalTypeModal,
      taskDescription,
      goalId,
      goalTitle,
      goalTitleErrorMessage,
      description,
      descriptionErrorMessage,
      startDate,
      startDateErrorMessage,
      dueDate,
      dueDateErrorMessage,
      priorityId,
      priorityName,
      priorityErrorMessage,
      goalTypeId,
      goalType,
      goalTypeErrorMessage,
      approvalStatus,
      taskArray,
      goalsArray,
      priorityArray,
      goalTypeArray
    } = this.state

    const { onClose, showRequestCoachForm, showRequestCoachFunc } = this.props
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
          submitLoader &&
          <Modal>
            <center>
              <h2>Please wait...</h2>
              <CircularLoader show = { submitLoader } />
            </center>
          </Modal>
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
          showForm ?
            <AddGoalsFormComponent
              onCancel = { () => {
                  this.setState({ showForm : false })
                  this.resetValue()
                }
              }
              onSubmit = { () => this.onSubmit() }
              goalTitle = { goalTitle }
              goalTitleErrorMessage = { goalTitleErrorMessage }
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
          :
          <div>
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
                  onClick = { () => showRequestCoachFunc(true)}
                />
              </div>
            </div>
            <div className = { 'grid-main' }>
              <div>
              {
                enabledLoader ?
                <center>
                  <CircularLoader show = { enabledLoader }/>
                </center>
                :
                goalsArray.length !== 0 ?
                <RequestedGoalsComponent
                  cardHolder = { goalsArray }
                  priorityFunc = { (resp) => this.priorityFunc(resp) }
                  onSelected = { (
                    goalId,
                    goalTitle,
                    description,
                    startDate,
                    dueDate,
                    priorityName,
                    approvalStatus,
                    goalTypeId
                  ) => {
                    this.setState({
                      goalId,
                      goalTitle,
                      description,
                      startDate,
                      dueDate,
                      priorityName,
                      approvalStatus,
                      goalTypeId
                     })
                    this.presenter.getGoalTask(goalId)
                  }
                 }
                />
                :
                <center><h2>No record</h2></center>
              }
              </div>
              <div ref = { 'main-div' } className = { 'padding-10px' }>
                <Card className = { 'padding-10px' }>
                  <div className = { 'grid-percentage' }>
                    <div>
                      <h2 className = { `margin-5px text-align-left font-size-18px font-weight-bold color-${priorityName}` }>{ priorityName ? priorityName : 'Priority' }</h2>
                      <h2 className = { 'margin-5px text-align-left font-size-16px font-weight-lighter' }><span className = { 'icon-check icon-comment-img' }/>2/5</h2>
                      <h2 className = { 'margin-5px text-align-left font-size-16px font-weight-lighter' }><span className = { 'icon-check icon-taskcompleted-img' }/>5/10</h2>
                    </div>
                    <div className = { 'text-align-center padding-10px' }>
                      <Progress
                        type = { 'circle' }
                        height = { 100 }
                        width = { 100 }
                        percent = { 80 } />
                    </div>
                    <div>
                      {
                        approvalStatus === 2 ?
                        <h2 className = { 'margin-10px text-align-right font-size-16px font-weight-bold header-column' }>Approved<span className = { 'icon-check icon-check-img' }/></h2>
                        :
                          approvalStatus === 3 ?
                          <h2 className = { 'margin-10px text-align-right font-size-16px font-weight-bold header-column' }>Rejected<span className = { 'icon-check icon-cross-img' }/></h2>
                          :
                          <h2 className = { 'margin-10px text-align-right font-size-16px font-weight-bold' }>{ approvalStatus ? 'Requested' : 'Status' }</h2>
                      }
                    </div>
                  </div>
                  <br/>
                  <Line/>
                  <div className = { 'padding-10px' }>
                    <div className = { 'header-column' }>
                      <h2 className = { 'font-weight-bold text-align-left font-size-20px' }>{ goalTitle ? goalTitle : 'Goal' }</h2>
                      <h2 className = { 'grid-global' }>
                      <h2></h2>
                      {
                        goalTitle &&
                        <span
                          className = { 'icon-check icon-edit-img' }
                          onClick = { () => this.setState({ showForm: true, editMode: true }) }
                        />
                      }
                      </h2>
                    </div>
                    <h2 className = { 'font-weight-lighter text-align-left font-size-16px' }>{ description ? description : 'Goals allow you to create effective objectives for yourself or employees.' }</h2>
                  </div>
                  <br/>
                  <Line/>
                  <div className = { 'padding-10px' }>
                    <div className = { 'header-column' }>
                      <h2 className = { 'font-weight-bold text-align-left font-size-20px' }>Tasks</h2>
                      <h2 className = { 'grid-global' }>
                      <h2></h2>
                      {
                        goalTitle &&
                        <span
                          className = { 'icon-check icon-add-img' }
                          onClick = { () => this.setState({ addTask: true }) }
                        />
                      }
                      </h2>
                    </div>
                    {
                      addTask &&
                      <div>
                        <GenericInput
                          text = { 'Task description' }
                          value = { taskDescription }
                          onChange = { (e) => this.taskDescriptionFunc(e.target.value) }
                          type = { 'textarea' }
                        />
                        <div className = { 'grid-global' }>
                          <GenericButton
                            text = { 'Cancel' }
                            onClick = { () => this.setState({ addTask: false, taskDescription: '' }) }
                          />
                          <GenericButton
                            text = { 'Submit' }
                            onClick = { () => this.submitTask() }
                          />
                        </div>
                      </div>
                    }
                    {
                      taskArray.length !== 0 ?
                      <TasksListComponent
                        cardHolder = { taskArray }
                        onEdit = { (taskDescription) => this.setState({
                          taskDescription,
                          addTask: true
                        }) }
                      />
                      :
                      !addTask &&
                      <h2 className = { 'text-align-center font-weight-lighter font-size-14px' }>No task</h2>
                    }
                  </div>
                </Card>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

RequestedGoalsFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(RequestedGoalsFragment, Presenter )
