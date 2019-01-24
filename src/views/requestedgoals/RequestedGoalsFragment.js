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
  GenericLoader,
  DatePicker,
  Card,
  Line,
  FloatingActionButton,
  GenericIconButton
} from '../../ub-components/'

import RequestedGoalsComponent from './components/RequestedGoalsComponent'
import AddGoalsFormComponent from './components/AddGoalsFormComponent'
import TasksListComponent from './components/TasksListComponent'
import CommentsListComponent from './components/CommentsListComponent'
import HistoryListComponent from './components/HistoryListComponent'
import RequestCoachFragment from '../requestCoach/RequestCoachFragment'

import ResponseModal from '../notice/NoticeResponseModal'

import { format } from '../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/requestedGoalStyles.css'

import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import { FaPlayCircleO } from 'react-icons/lib/fa/'
import Rating from 'react-rating'

class RequestedGoalsFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      personal : 'personal',
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
      addTask: false,
      addComment: true,
      onEditTask: false,
      onEditComment: false,
      showDeleteModal: false,
      showTaskOption: false,
      deleteTask: false,
      showCommentOption: false,
      deleteComment: false,
      showMarkAsCompleted: false,
      ifYesCompleted: false,
      showRemarksText: false,
      isTeamGoal: 0,
      isSquadGoal: 0,
      isCompleted: 0,
      pageItem: 10,
      pageNumber: 1,
      ratings: 0,
      taskId: '',
      remarksText: '',
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
      businessOutcome: '',
      businessOutcomeErrorMessage: '',
      commentArray: [],
      taskArray: [],
      goalsArray : [],
      historyArray : [],
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
    this.presenter.getGoals(this.state.personal)
    // this.scrollFunction()
  }

  getRequestedGoals(goalsArray) {
    this.setState({ goalsArray })
  }

  getTasklist (taskArray) {
    this.setState({ taskArray })
  }

  getCommentList (commentArray) {
      this.setState({ commentArray })
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

  getHistoryList (historyArray) {
      this.setState({ historyArray })
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
    this.setState({ description, descriptionErrorMessage: ''  })
  }

  startDateFunc (startDate) {
    this.setState({ startDate, startDateErrorMessage: '' })

  }

  dueDateFunc (dueDate) {
    this.setState({ dueDate, dueDateErrorMessage: '' })
  }

  taskDescriptionFunc (taskDescription) {
    this.setState({ taskDescription, taskDescriptionErrorMessage: '' })
  }

  goalCommentFunc (goalComment) {
    this.setState({ goalComment, goalCommentErrorMessage: '' })
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
      personal
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
        goalTypeId,
        personal
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

  submitTask() {
    const { goalId, taskId, taskDescription, onEditTask, isCompleted, personal } = this.state
    if(!taskDescription) {
      this.setState({ taskDescriptionErrorMessage: 'Required field' })
    }
    else {
      onEditTask ?
      this.presenter.updateGoalTask(taskId, taskDescription, isCompleted)
      :
      this.presenter.addGoalTask(personal, goalId, taskDescription)
      this.setState({ addTask:false, taskDescription: '' })
    }
  }

  submitComment() {
    const { goalId, goalComment, pageNumber, pageItem, personal } = this.state
    if(!goalComment) {
      this.setState({ goalCommentErrorMessage: 'Required field' })
    }
    else {
      this.presenter.addGoalComment(personal, goalId, goalComment, pageNumber, pageItem)
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

  showCommentLoader (commentLoader) {
    this.setState({ commentLoader })
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
      addTask: false,
      addComment: false,
      editMode: false,
      showForm: false,
      showApprovalForm : false,
      showTaskOption: false,
      showCommentOption: false
    })
  }

  resetRemarks () {
    this.setState({ showRemarksText : false, remarksText : '' })
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

  checkIfGoalCompleted(taskArray) {
    let count = 0
    taskArray.length !== 0 &&
    taskArray.map((resp, key) =>
      resp.isCompleted &&
      count++
    )
    return taskArray.length !==0 &&
     taskArray.length === count ? true : false
  }

  checkIfShowMarkAsCompleted(approvalStatus, isCompleted) {
    let boolCompleted = false

    if(approvalStatus === 2) {
      isCompleted ?
      boolCompleted = true
      :
      boolCompleted = false
    }
    else {
      boolCompleted = false
    }
    return boolCompleted
  }

  commentRateFunc (ratings) {
    this.setState({ ratings, showRemarksText : true })
  }

  submitRatingWithRemarks (e) {
    if(e.which === 13) {
      try {
        this.presenter.addRatingGoal(this.state.goalId, this.state.ratings, this.state.remarksText)

      }catch(e) {
        console.log(e)
      }
    }
  }

  checkRatings (rate) {
    if(rate === 1) {
      return 'Seldom Meets'
    } else if (rate === 2) {
      return 'Usually Meets'
    } else if (rate === 3) {
      return 'Consistently Meets'
    } else if (rate === 4) {
      return 'Usually Exceeds'
    } else if (rate === 5) {
      return 'Consistently Exceeds'
    }
  }

  checkApprovalStatus (approvalStatus) {
    return approvalStatus !== 1 &&
    approvalStatus !== 3
    && approvalStatus !== 5 ? true : false
  }

  checkIfLineMangerOrCompleted (approvalStatus, isLineManager) {
    return isLineManager && approvalStatus === 6 ? true : false
  }

  postMarkAsCompleted() {
    const { goalId, businessOutcome } = this.state

    if(businessOutcome) {
      this.presenter.markAsCompleted(goalId, businessOutcome)
    } else {
      this.setState ({ businessOutcomeErrorMessage: 'Required field' })
    }
  }

  checkPoints(goalsArray) {
    let performanceRate = 0
    let developementalRate = 0
    let totalPoints = 0
    if(goalsArray.length !== 0) {
      goalsArray.map((details, key) =>
      {
        if(details.isCompleted) {
          details.type === 1 ?
          performanceRate++
          :
          details.type === 2 &&
          developementalRate++
        }
      })
      totalPoints = (performanceRate * 0.95) + (developementalRate * 0.05)

      return totalPoints !== 0 ? totalPoints.toFixed(2) : 'No'
    } else {
      return 'No'
    }
  }

  render () {
    const {
      personal,
      enabledLoader,
      submitLoader,
      taskLoader,
      commentLoader,
      showNoticeResponseModal,
      noticeResponse,
      deleteTask,
      addTask,
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
      showMarkAsCompleted,
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
      goalsArray,
      priorityArray,
      goalTypeArray,
      historyArray,
      ratings,
      ifYesCompleted,
      businessOutcome,
      businessOutcomeErrorMessage,
      showRemarksText,
      remarksText,
      isTeamGoal,
      isSquadGoal
    } = this.state

    const {
      isLineManager,
      filterId
    } = this.props

    let totalCount = taskArray && taskArray.length
    let taskCompleted  = this.checkIfTaskCompleted(taskArray)
    let percentageTask = taskArray && (taskCompleted /totalCount) * 100
    const { onClose, showRequestCoachForm, showRequestCoachFunc, employeeNumber } = this.props

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
        <center>
          <CircularLoader show = { submitLoader } />
        </center>
      }
      {
        showPriorityModal &&
        <SingleInputModal
          label = { 'Select Priority' }
          inputArray = { priorityArray }
          selectedArray = { (priorityId, priorityName) => this.setState({
              priorityId,
              priorityName,
              showPriorityModal: false,
              priorityErrorMessage: ''
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
        showDeleteModal &&
        <Modal>
          <center>
            <h2>Are you sure you want to delete this goal?</h2>
            <div className = { 'grid-global' }>
              <GenericButton
                text = { 'No' }
                onClick = { () => this.setState({ showDeleteModal: false }) }
              />
              <GenericButton
                text = { 'Yes' }
                onClick = { () => {this.presenter.deleteGoal(goalId), this.setState({ showDeleteModal: false })} }
              />
            </div>
          </center>
        </Modal>
      }
      {
        showMarkAsCompleted &&
        <Modal>
          {
            ifYesCompleted ?
            <div>
              <GenericInput
                text = { 'Business Outcome' }
                value = { businessOutcome }
                onChange = { (e) => this.setState({ businessOutcome: e.target.value, businessOutcomeErrorMessage: '' }) }
                errorMessage = { businessOutcomeErrorMessage }
              />
              <br/>
              <div className = { 'grid-global' }>
                <GenericButton
                  text = { 'Cancel' }
                  onClick = { () => this.setState({ showMarkAsCompleted: false, ifYesCompleted: false }) }
                />
                <GenericButton
                  text = { 'Submit' }
                  onClick = { () => {
                    this.postMarkAsCompleted(),
                    this.setState({ showMarkAsCompleted: false, ifYesCompleted: false })
                  } }
                />
              </div>
            </div>
            :
            <center>
              <h2>The Goal is completed. Do you want to mark as completed?</h2>
              <br/>
              <div className = { 'grid-global' }>
                <GenericButton
                  text = { 'No' }
                  onClick = { () => this.setState({ showMarkAsCompleted: false }) }
                />
                <GenericButton
                  text = { 'Yes' }
                  onClick = { () => this.setState({ ifYesCompleted: true }) }
                />
              </div>
            </center>
          }
        </Modal>
      }
      {
        showTaskOption &&
        <Modal
        isDismisable = { true }
        onClose = { () => this.setState({ showTaskOption: false }) }>
          {
            deleteTask ?
            <center>
              <h2>Are you sure you want to delete this task?</h2>
              <div className = { 'grid-global' }>
                <GenericButton
                  text = { 'No' }
                  onClick = { () => this.setState({ deleteTask: false, showTaskOption: false }) }
                  className = { 'profile-button-small' }
                />
                <GenericButton
                  text = { 'Yes' }
                  className = { 'profile-button-small' }
                  onClick = { () => {
                      this.presenter.deleteTask(taskId, goalId),
                      this.setState({ taskDescription: '', deleteTask: false, showTaskOption: false })
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
                  addTask: true,
                  onEditTask: true,
                  showTaskOption: false }) }
                  className = { 'profile-button-small' }
                />
                <GenericButton
                  text = { 'Delete' }
                  className = { 'profile-button-small' }
                  onClick = { () => this.setState({ deleteTask: true }) }
                />
              </div>
            </center>
          }
        </Modal>
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
        this.checkIfLineMangerOrCompleted(approvalStatus, isLineManager) &&
        <Modal>
          <h2 className = { 'text-align-center font-size-30px  font-weight-ligther' }>
            { ratings }
          </h2>
          <br/>
          <div className = { 'text-align-center' }>
              <Rating
                emptySymbol={ <MdStarOutline style={{ fontSize: 25, color : '#959595' }} /> }
                fullSymbol={ <MdStar style={{ fontSize: 25,  color : '#c65e11' }} /> }
                fractions={ 1 }
                onChange={ e => this.commentRateFunc(e) }
                initialRating={ (ratings ? ratings : 0) || 0 }
              />
          </div>
          <h2 className = { 'font-size-12px unionbank-color text-align-center' }>{ this.checkRatings(ratings) }</h2>
          {
            showRemarksText &&

            <GenericInput
              value = { remarksText }
              hint = { 'Please add remarks' }
              type = { 'textarea' }
              onChange = { (e) => {
                try {
                  this.setState({ remarksText : e.target.value })
                } catch(e) {
                  console.log(e)
                }
              } }
              onKeyPress = { (e) => this.submitRatingWithRemarks(e) }
            />
          }
        </Modal>
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
            showPriorityModal = { showPriorityModal }
            showPriorityModalFunc = { () => this.setState({ showPriorityModal : true }) }
            showGoalTypeModal = { showGoalTypeModal }
            showGoalTypeModalFunc = { () => this.setState({ showGoalTypeModal : true }) }
            editMode = { editMode }
            onEdit = { () => this.onEdit() }
          />
        :
        <div>
        <div className = { 'grid-req-main' }>
          <div>
            <div className = { ' grid-points-main' }>
              <div className = { 'padding-10px-no-bottom' }>
                <Card className = { 'grid-points' }>
                  <span className = { 'padding-10px icon-check icon-points-img text-align-left' }/>
                  <div className = { 'padding-10px' }>
                    <h2 className = { 'font-size-14px text-align-left font-weight-normal' }>My Points</h2>
                    <h2 className = { 'font-size-14px text-align-left font-weight-lighter' }>{ this.checkPoints(goalsArray) } Available Points</h2>
                  </div>
                </Card>
              </div>
              <div className = 'padding-10px-no-bottom'>
                <GenericButton
                  text = { 'Add Goal' }
                  className = { 'global-button profile-button-small font-size-10px' }
                  onClick = { () => {
                    this.resetValue()
                    this.setState({ showForm: true })
                  } }
                />
                <GenericButton
                  text = { 'Request for Coaching' }
                  className = { 'global-button profile-button-small font-size-10px' }
                  onClick = { () => showRequestCoachFunc(true)}
                />
              </div>
            </div>
            {
              enabledLoader ?
              <center>
                <CircularLoader show = { enabledLoader }/>
              </center>
              :
              goalsArray.length !== 0 ?
              <div className = { 'scroll-y padding-10px' }>
                <RequestedGoalsComponent
                filterId = { filterId }
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
                  goalTypeId,
                  isTeamGoal,
                  isCompleted,
                  ratings,
                ) => {
                  this.setState({
                    goalId,
                    goalTitle,
                    description,
                    startDate,
                    dueDate,
                    priorityName,
                    approvalStatus,
                    goalTypeId,
                    isTeamGoal,
                    isSquadGoal,
                    isCompleted,
                    ratings: parseFloat(ratings),
                    showRemarksText: false,
                    remarksText: ''
                  })
                  this.presenter.getGoalTask(goalId)
                  this.presenter.getGoalComment(goalId, pageNumber, pageItem)
                  this.presenter.getGoalsHistory(goalId, pageNumber, pageItem)
                  this.setState({ ifYesCompleted: false,
                    showMarkAsCompleted: this.checkIfShowMarkAsCompleted(approvalStatus, isCompleted),
                    showRemarksText : false })
                  }
                }
                onDeleted = { (goalId) => this.setState({ goalId, showDeleteModal: true }) }
                />
              </div>
              :
              <center><h2>No record</h2></center>
            }
            </div>
            <div className = { 'padding-10px' }>
              <div className = { 'padding-10px' }>
                <div className = { 'header-column card-background padding-10px' }>
                  <h2 className = { 'font-weight-normal text-align-left font-size-14px color-white' }>{ goalTitle ? goalTitle : 'Goal' }</h2>
                  {
                    goalId &&
                    <span
                      className = { 'icon-check icon-edit-white-img' }
                      onClick = { () => this.setState({ showForm: true, editMode: true }) }
                    />
                  }
                </div>

                <div className = { 'details-columns padding-10px' }>
                  <div className = { 'details-rows' }>
                    <h2 className = { 'text-align-center font-size-14px font-weight-normal details-title' }>Goal type</h2>
                    <h2 className = { 'text-align-center font-size-12px font-weight-lighter description-title' }>{
                      isTeamGoal ?
                      'Team Goal'
                      :
                        isSquadGoal ?
                        'Squad Goal'
                        :
                        'Personal'
                    }</h2>
                  </div>
                  <div className = { 'details-rows' }>
                    <h2 className = { 'text-align-center font-size-14px font-weight-normal details-title' }>Status</h2>
                    {
                      approvalStatus === 2 ?
                      <h2 className = { 'text-align-center font-size-12px font-weight-lighter color-Medium  description-title' }>Approved</h2>
                      :
                        approvalStatus === 3 ?
                        <h2 className = { ' text-align-center font-size-12px font-weight-lighter color-High description-title' }>Rejected</h2>
                        :
                        approvalStatus === 1 ?
                        <h2 className = { ' text-align-center font-size-12px font-weight-lighter description-title' }>Requested</h2>
                        :
                        approvalStatus === 4 ?
                        <h2 className = { 'text-align-center font-size-12px font-weight-lighter description-title' }>Update for approval</h2>
                        :
                        approvalStatus === 5 ?
                        <h2 className = { 'text-align-center font-size-12px font-weight-lighter description-title' }>Deletion for approval</h2>
                        :
                        approvalStatus === 6 &&
                        <h2 className = { 'text-align-center font-size-12px font-weight-lighter color-Low description-title' }>Completed</h2>
                    }
                  </div>
                  <div className = { 'details-rows' }>
                    <h2 className = { 'text-align-center font-size-14px font-weight-normal details-title' }>Priority</h2>
                    <h2 className = { `text-align-center font-size-12px font-weight-lighter  description-title color-${priorityName}` }>{ priorityName ? priorityName : 'Priority' }</h2>
                  </div>
                  <div className = { 'details-rows' }>
                    <h2 className = { 'text-align-center font-size-14px font-weight-normal details-title' }>Type</h2>
                    <h2 className = { 'text-align-center font-size-12px font-weight-lighter' }>{
                      goalTypeId === 1 ?
                      'Performance'
                      :
                      goalTypeId === 2 &&
                      'Developemental'
                    }</h2>
                  </div>

                  { /* Second row */ }

                  <div className = { 'details-rows' }>
                    <h2 className = { 'text-align-center font-size-14px font-weight-normal details-title' }>Start Date</h2>
                    <h2 className = { 'text-align-center font-size-12px font-weight-lighter  description-title' }>{ moment(startDate).format('MMMM, DD, YYYY') }</h2>
                  </div>
                  <div className = { 'details-rows' }>
                    <h2 className = { 'text-align-center font-size-14px font-weight-normal details-title' }>Due Date</h2>
                    <h2 className = { 'text-align-center font-size-12px font-weight-lighter description-title' }>{ moment(dueDate).format('MMMM, DD, YYYY') }</h2>
                  </div>
                  <div className = { 'details-rows' }>
                    <h2 className = { 'text-align-center font-size-14px font-weight-normal details-title' }></h2>
                    <h2 className = { `text-align-center font-size-12px font-weight-lighter description-title color-${priorityName}` }></h2>
                  </div>
                  <div className = { 'details-rows' }>
                    <h2 className = { 'text-align-center font-size-14px font-weight-normal details-title' }></h2>
                    <h2 className = { 'text-align-center font-size-12px font-weight-lighter description-title' }></h2>
                  </div>
                </div>

                { /* Description */ }

                <div className = { 'padding-10px' }>
                  <h2 className = { 'text-align-left font-size-14px font-weight-normal' }>Description</h2>
                  <h2 className = { 'padding-10px text-align-left font-size-14px font-weight-lighter' }>{
                    description ?
                    description
                    :
                    'Goals allow you to create effective objectives for yourself or employees.'
                  }</h2>
                </div>
                <div className = { 'padding-10px' }>
                  <h2 className = { 'text-align-left font-size-14px font-weight-normal' }>Progress</h2>
                  <Progress
                    theme = {
                      {
                        default: {
                          color: '#FF8A00'
                        },
                        active: {
                          color: '#FF8A00'
                        }
                      }
                    }
                    height = { 50 }
                    width = { 80 }
                    percent = { percentageTask ? parseInt(percentageTask) : 0 } />
                </div>
                {
                  this.checkApprovalStatus(approvalStatus) &&
                  <div>
                  <br/>
                  <Line/>
                  <div className = { 'padding-10px' }>
                    <div className = { 'header-column' }>
                      <div>
                        <h2 className = { 'font-weight-normal text-align-left font-size-14px' }>Tasks</h2>
                        <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }>Enter the activities that would help you achieve your goal (Be Specific).</h2>
                      </div>
                      <h2>
                      {
                        goalId &&
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
                          errorMessage = { taskDescriptionErrorMessage }
                        />
                        <div className = { 'grid-global' }>
                          <GenericButton
                            text = { 'Cancel' }
                            className = { 'profile-button-small' }
                            onClick = { () => this.setState({ onEditTask: false, addTask: false, taskDescription: '' }) }
                          />
                          <GenericButton
                            text = { onEditTask ? 'Update' : 'Submit' }
                            className = { 'profile-button-small' }
                            onClick = { () => this.submitTask() }
                          />
                        </div>
                        <br/>
                        <Line/>
                        <br/>
                      </div>
                    }
                    {
                      taskLoader ?
                      <center>
                        <GenericLoader show = { taskLoader }/>
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
                          changeTask = { (taskId, isCompleted) => this.presenter.updateGoalTask(taskId, null, isCompleted)  }
                        />
                      :
                      !addTask &&
                      <h2 className = { 'text-align-center font-weight-lighter font-size-12px' }>No task</h2>
                    }
                  </div>
                  <Line/>
                  <div className = { 'padding-10px' }>
                    <div className = { 'header-column' }>
                      <div>
                        <h2 className = { 'font-weight-normal text-align-left font-size-14px' }>Reviews</h2>
                        <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }>You can add any notes or updates for this goal.</h2>
                      </div>
                      <br/>
                    </div>
                    {
                      commentArray.length !==0 ?
                        commentArray.commentDetails.map((resp, key) =>(
                          <CommentsListComponent
                            employeeNumber = { employeeNumber }
                            respEmployeeNumber = { resp.employeeNumber }
                            commentLoader = { commentLoader }
                            cardHolder = { resp }
                            commentId = { resp.id }
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
                    {
                      goalId &&
                      <div className = { 'comment-grid align-items-center' }>
                        <GenericInput
                          text = { 'Write a comment' }
                          value = { goalComment }
                          onChange = { (e) => this.goalCommentFunc(e.target.value) }
                          errorMessage = { goalCommentErrorMessage }
                        />
                        {
                          commentLoader ?
                          <center>
                            <GenericLoader show = { commentLoader }/>
                          </center>
                          :
                          <GenericButton
                            text = { 'Post' }
                            className = { 'profile-button-small' }
                            onClick = { () => this.submitComment() }
                          />
                        }
                      </div>
                    }
                  </div>
                </div>
                }
                <Line/>
                <div className = { 'padding-10px' }>
                  <h2 className = { 'font-weight-normal text-align-left font-size-14px' }>Goal History</h2>
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
              </div>
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
