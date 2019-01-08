import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/TeamGoalsPresenter'

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

import TeamGoalsComponent from './components/TeamGoalsComponent'
import AddTeamGoalsFormComponent from './components/AddTeamGoalsFormComponent'
import TasksListComponent from './components/TasksListComponent'
import CommentsListComponent from './components/CommentsListComponent'
import HistoryListComponent from './components/HistoryListComponent'

import ResponseModal from '../notice/NoticeResponseModal'

import { format } from '../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/teamGoalStyles.css'

class TeamGoalsFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      submitLoader: false,
      taskLoader: false,
      commentLoader: false,
      showNoticeResponseModal : false,
      editMode: false,
      showForm: false,
      noticeResponse: '',
      showPriorityModal : false,
      showGoalTypeModal : false,
      addComment: true,
      onEditTask: false,
      onEditComment: false,
      showDeleteModal: false,
      showTaskOption: false,
      deleteTask: false,
      showCommentOption: false,
      deleteComment: false,
      isCompleted: 0,
      pageItem: 10,
      pageNumber: 1,
      taskId: '',
      taskDescription: '',
      taskDescriptionErrorMessage: '',
      goalComment: '',
      goalCommentErrorMessage: '',
      goalEditComment: '',
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
      participantErrorMessage : '',
      commentArray: [],
      taskArray: [],
      teamGoalsArray : [],
      historyArray : [],
      participantArray : [],
      priorityArray : [
        {
          id: 3,
          name: 'High'
        },
        {
          id: 2,
          name: 'Medium'
        },
        {
          id: 1,
          name: 'Low'
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
    this.presenter.getTeamGoals(2)
    // this.scrollFunction()
  }

  getTeamGoals(teamGoalsArray) {
    this.setState({ teamGoalsArray })
  }

  getTasklist (taskArray) {
    this.setState({ taskArray })
  }

  getCommentList (commentArray) {
      this.setState({ commentArray })
  }

  getHistoryList (historyArray) {
      this.setState({ historyArray })
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

  hideTaskLoader () {
    this.setState({ taskLoader : false })
  }

  showTaskLoader () {
    this.setState({ taskLoader : true })
  }


  checkCommentLoader (commentLoader) {
    this.setState({ commentLoader })
  }

  navigate () {
    this.props.history.push('/mygoals')
  }

  noticeResponse (noticeResponse) {
    this.setState({
      noticeResponse,
      showNoticeResponseModal : true
    })
  }

  goalTitleFunc (goalTitle) {
    this.setState({ goalTitle, goalTitleErrorMessage: '' })
  }

  descriptionFunc (description) {
    this.setState({ description, descriptionErrorMessage: '' })
  }

  startDateFunc (startDate) {
    this.setState({ startDate, startDateErrorMessage: '' })
  }

  dueDateFunc (dueDate) {
    this.setState({ dueDate, dueDateErrorMessage: '' })
  }

  taskDescriptionFunc (taskDescription) {
    this.setState({ taskDescription })
  }

  goalCommentFunc (goalComment) {
    this.setState({ goalComment })
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
      goalTypeId,
      participantArray
    } = this.state

    if(!goalTitle) {
      this.setState({ goalTitleErrorMessage: 'Required field' })
    } else if (!goalTypeId) {
      this.setState({ goalTypeErrorMessage: 'Required field' })
    } else if (!startDate) {
      this.setState({ startDateErrorMessage: 'Required field' })
    } else if (!dueDate) {
      this.setState({ dueDateErrorMessage: 'Required field' })
    } else if (!description) {
      this.setState({ descriptionErrorMessage: 'Required field' })
    } else if (!priorityId) {
      this.setState({ priorityErrorMessage: 'Required field' })
    } else if (participantArray.length == 0) {
      this.setState({ participantErrorMessage: 'Required field' })
    }
    else {
      this.presenter.addTeamGoals (
        participantArray,
        goalTitle,
        description,
        moment(startDate).format('YYYY-MM-DD'),
        moment(dueDate).format('YYYY-MM-DD'),
        priorityId,
        goalTypeId
      )
    }
  }

  onEdit() {
    const { goalId, startDate, dueDate } = this.state

    if(!startDate) {
      this.setState({ startDateErrorMessage: 'Required field' })
    } else if (!dueDate) {
      this.setState({ dueDateErrorMessage: 'Required field' })
    } else {
      this.presenter.updateGoals (
        goalId,
        moment(startDate).format('YYYY-MM-DD'),
        moment(dueDate).format('YYYY-MM-DD')
      )
    }
  }

  submitComment() {
    const { goalId, goalComment, pageNumber, pageItem } = this.state
    if(!goalComment) {
      this.setState({ goalCommentErrorMessage: 'Required field' })
    }
    else {
      this.presenter.addGoalComment(goalId, goalComment, pageNumber, pageItem)
      this.setState({ goalComment: '', goalCommentErrorMessage: '' })

    }
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
      goalTypeId: '',
      goalType: '',
      goalTypeErrorMessage: '',
      rejectedRemarks: '',
      taskId: '',
      taskDescription: '',
      taskDescriptionErrorMessage: '',
      goalComment: '',
      goalCommentErrorMessage: '',
      addComment: false,
      editMode: false,
      showForm: false,
      showApprovalForm : false,
      showTaskOption: false,
      showCommentOption: false
    })
  }

  checkIfTaskCompleted (task) {
    let count = 0
    task && task.map((resp) => {
      if(resp.isCompleted) {
        count++
      }
    })
    return count
  }

  render () {
    const {
      enabledLoader,
      submitLoader,
      taskLoader,
      commentLoader,
      showNoticeResponseModal,
      noticeResponse,
      deleteTask,
      addComment,
      onEditTask,
      onEditComment,
      goalEditComment,
      editMode,
      showForm,
      showPriorityModal,
      showGoalTypeModal,
      showDeleteModal,
      showTaskOption,
      showCommentOption,
      deleteComment,
      isCompleted,
      pageNumber,
      pageItem,
      taskId,
      taskDescription,
      taskDescriptionErrorMessage,
      goalComment,
      goalCommentErrorMessage,
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
      commentArray,
      teamGoalsArray,
      priorityArray,
      goalTypeArray,
      historyArray,
      participantArray,
      participantErrorMessage
    } = this.state

    const { onClose, showRequestCoachForm, showRequestCoachFunc, employeeNumber } = this.props

    let totalCount = taskArray && taskArray.length
    let taskCompleted  = this.checkIfTaskCompleted(taskArray)
    let percentageTask = taskArray && (taskCompleted /totalCount) * 100
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
        showCommentOption &&
        <Modal
          isDismisable = { true }
          onClose = { () => this.setState({ showCommentOption: false }) }>
          {
            deleteComment ?
            <center>
              <h2>Are you sure you want to delete this comment?</h2>
              <div className = { 'grid-global' }>
                <GenericButton
                  text = { 'No' }
                  onClick = { () => this.setState({ deleteComment: false, showCommentOption: false }) }
                  className = { 'profile-button-small' }
                />
                <GenericButton
                  text = { 'Yes' }
                  className = { 'profile-button-small' }
                  onClick = { () => {
                      this.presenter.deleteComment(commentId, goalId, pageNumber, pageItem),
                      this.setState({ goalComment: '', deleteComment: false, showCommentOption: false })
                    }
                  }
                />
              </div>
            </center>
            :
            <center>
              <h2>Select action</h2>
              <div className = { 'grid-global' }>
                <GenericButton
                  text = { 'Edit' }
                  onClick = { () => this.setState({
                  addComment: true,
                  onEditComment: true,
                  showCommentOption: false }) }
                  className = { 'profile-button-small' }
                />
                <GenericButton
                  text = { 'Delete' }
                  className = { 'profile-button-small' }
                  onClick = { () => this.setState({ deleteComment: true }) }
                />
              </div>
            </center>
          }
        </Modal>
      }
      {
        showForm ?
          <AddTeamGoalsFormComponent
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
            descriptionErrorMessage = { descriptionErrorMessage }
            startDate = { startDate }
            startDateFunc = { (resp) => this.startDateFunc(resp) }
            startDateErrorMessage = { startDateErrorMessage }
            dueDate = { dueDate }
            dueDateFunc = { (resp) => this.dueDateFunc(resp) }
            dueDateErrorMessage = { dueDateErrorMessage }
            priorityName = { priorityName }
            priorityErrorMessage = { priorityErrorMessage }
            goalType = { goalType }
            goalTypeId = { goalTypeId }
            goalTypeErrorMessage = { goalTypeErrorMessage }
            participantArray = { participantArray }
            participantErrorMessage = { participantErrorMessage }
            showPriorityModal = { showPriorityModal }
            showPriorityModalFunc = { () => this.setState({ showPriorityModal : true }) }
            showGoalTypeModal = { showGoalTypeModal }
            showGoalTypeModalFunc = { () => this.setState({ showGoalTypeModal : true }) }
            editMode = { editMode }
            onEdit = { () => this.onEdit() }
          />
        :
        <div>
          <div className = { 'padding-10px grid-filter margin-left' }>
            <div></div>
            <div className = { 'text-align-right margin-right' }>
              <GenericButton
                text = { 'Add Team Goal' }
                className = { 'global-button profile-button-medium font-size-11px' }
                onClick = { () => {
                  this.resetValue()
                  this.setState({ showForm: true })
                } }
              />
            </div>
          </div>
          <div className = { 'grid-main' }>
            <div>
            <h2 className = { 'text-align-left font-size-14px font-weight-bold' }>Team Goals</h2>
            <Line/>
            <br/>
            {
              enabledLoader ?
              <center>
                <CircularLoader show = { enabledLoader }/>
              </center>
              :
              teamGoalsArray.length !== 0 ?
              teamGoalsArray.map((resp, key) =>
                <TeamGoalsComponent
                  employeeName = { resp.name }
                  imageUrl = { resp.imageUrl }
                  cardHolder = { resp.goalDetails }
                  priorityFunc = { (resp) => this.priorityFunc(resp) }
                  onSelected = { (
                    details,
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
                    this.presenter.getGoalComment(goalId, pageNumber, pageItem)
                    this.presenter.getGoalsHistory(goalId, pageNumber, pageItem)
                  }
                 }
                 onDeleted = { (goalId) => this.setState({ goalId, showDeleteModal: true }) }
                />
              )
              :
              <center><h2>No record</h2></center>
            }
            <h2 className = { 'text-align-left font-size-14px font-weight-bold' }>Squad Goals</h2>
            <Line/>
            <br/>
            {
              enabledLoader ?
              <center>
                <CircularLoader show = { enabledLoader }/>
              </center>
              :
              teamGoalsArray.length !== 0 ?
              teamGoalsArray.map((resp, key) =>
                <TeamGoalsComponent
                  employeeName = { resp.name }
                  imageUrl = { resp.imageUrl }
                  cardHolder = { resp.goalDetails }
                  priorityFunc = { (resp) => this.priorityFunc(resp) }
                  onSelected = { (
                    details,
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
                    this.presenter.getGoalComment(goalId, pageNumber, pageItem)
                    this.presenter.getGoalsHistory(goalId, pageNumber, pageItem)
                  }
                 }
                 onDeleted = { (goalId) => this.setState({ goalId, showDeleteModal: true }) }
                />
              )
              :
              <center><h2>No record</h2></center>
            }
            </div>
            <div ref = { 'main-div' } className = { 'padding-10px' }>
              <Card className = { 'padding-10px' }>
                <div className = { 'grid-percentage' }>
                  <div>
                    <h2 className = { `margin-5px text-align-left font-size-12px font-weight-bold color-${priorityName}` }>{ priorityName ? priorityName : 'Priority' }</h2>
                    <h2 className = { 'margin-5px text-align-left font-size-12px font-weight-lighter' }>
                      <span className = { 'icon-check icon-comment-img text-align-center' }/>{ commentArray && commentArray.totalCount }</h2>
                    <h2 className = { 'margin-5px text-align-left font-size-12px font-weight-lighter' }>
                      <span className = { 'icon-check icon-taskcompleted-img' }/>{ this.checkIfTaskCompleted(taskArray) }/{ taskArray && totalCount }</h2>
                  </div>
                  <div className = { 'text-align-center padding-10px' }>
                    <Progress
                      type = { 'circle' }
                      height = { 80 }
                      width = { 80 }
                      percent = { percentageTask ? parseInt(percentageTask) : 0 } />
                  </div>
                  <div className = { 'text-align-right' }>
                    {
                      goalTypeId === 1 ?
                      <h2 className = { 'margin-10px font-size-12px font-weight-lighter' }><span className = { 'border-team color-gray' }>Performance</span></h2>
                      :
                      <h2 className = { 'margin-10px font-size-12px font-weight-lighter' }><span className = { 'border-team color-gray' }>Developemental</span></h2>
                    }
                  </div>
                </div>
                <br/>
                <Line/>
                <div className = { 'padding-10px' }>
                  <div className = { 'header-column' }>
                    <h2 className = { 'font-weight-bold text-align-left font-size-14px' }>{ goalTitle ? goalTitle : 'Goal' }</h2>
                    <h2></h2>
                  </div>
                  <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }>{ description ? description : 'Goals allow you to create effective objectives for yourself or employees.' }</h2>
                </div>
                {
                  approvalStatus === 2 &&
                  <div>
                  <br/>
                  <Line/>
                  <div className = { 'padding-10px' }>
                    <div className = { 'header-column' }>
                      <div>
                        <h2 className = { 'font-weight-bold text-align-left font-size-14px' }>Tasks</h2>
                        <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }>Enter the activities that would help you achieve your goal (Be Specific).</h2>
                      </div>
                      <h2></h2>
                    </div>
                    {
                      taskLoader ?
                      <center>
                        <CircularLoader show = { taskLoader }/>
                      </center>
                      :
                      taskArray.length !== 0 ?
                        <TasksListComponent
                          cardHolder = { taskArray }
                          onSelected = { (taskId, taskDescription, isCompleted) => this.setState({
                            taskId,
                            taskDescription,
                            isCompleted,
                            showTaskOption: true
                          }) }
                        />
                      :
                      <h2 className = { 'text-align-center font-weight-lighter font-size-14px' }>No task</h2>
                    }
                  </div>
                  <Line/>
                  <div className = { 'padding-10px' }>
                    <div className = { 'header-column' }>
                      <div>
                        <h2 className = { 'font-weight-bold text-align-left font-size-14px' }>Reviews</h2>
                        <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }>You can add any notes or updates for this goal.</h2>
                      </div>
                      <br/>
                    </div>
                    {
                      commentArray.length !==0 ?
                        commentArray.commentDetails.map((resp, key) =>(
                          <CommentsListComponent
                          cardHolder = { resp }
                          commentId = { resp.id }
                          employeeNumber = { employeeNumber }
                          respEmployeeNumber = { resp.employeeNumber }
                          goalComment = { resp.description }
                          employeeName = { resp.employeeName }
                          deleteCommentFunc = { (commentId, goalId) =>
                            this.presenter.deleteComment(commentId, goalId, pageNumber, pageItem) }
                          updateComment = { (commentId, goalEditComment) =>
                            this.presenter.updateGoalComment(goalId, pageNumber, pageItem, commentId, goalEditComment) }
                          />
                        )
                        )
                      :
                      <h2 className = { 'text-align-center font-weight-lighter font-size-12px' }>No comment</h2>
                    }
                    <br/>
                    <div className = { 'comment-grid align-items-center'}>
                      <GenericInput
                        text = { 'Write a comment' }
                        value = { goalComment }
                        onChange = { (e) => this.goalCommentFunc(e.target.value) }
                        errorMessage = { goalCommentErrorMessage }
                      />
                      {
                        commentLoader ?

                        <center>
                          <CircularLoader show = { commentLoader }/>
                        </center> :
                        <GenericButton
                          text = { 'Post' }
                          className = { 'profile-button-small' }
                          onClick = { () => this.submitComment() }
                        />
                      }
                    </div>
                    </div>
                  </div>
                }
                <Line/>
                <div className = { 'padding-10px' }>
                  <h2 className = { 'font-weight-bold text-align-left font-size-14px' }>Goal History</h2>
                  {
                    historyArray.length !==0 ?
                      historyArray.goalDetails.map((resp, key) =>(
                        <HistoryListComponent
                        cardHolder = { resp }
                        action = { resp.action }
                        dateTime = { resp.dateTime }
                        />
                      )
                      )
                    :
                    <h2 className = { 'text-align-center font-weight-lighter font-size-12px' }>No history</h2>
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

TeamGoalsFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(TeamGoalsFragment, Presenter )
