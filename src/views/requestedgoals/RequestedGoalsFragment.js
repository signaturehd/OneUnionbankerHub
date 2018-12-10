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
import CommentsListComponent from './components/CommentsListComponent'
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
      showFilterModal: false,
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
      filterId: '',
      filterName: '',
      commentArray: [],
      taskArray: [],
      goalsArray : [],
      filterArray : [
        {
          id: 0,
          name: 'All'
        },
        {
          id: 1,
          name: 'Requested'
        },
        {
          id: 2,
          name: 'Approved'
        }
      ],
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
    this.presenter.getGoals()
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
    const { goalId, taskId, taskDescription, onEditTask, isCompleted } = this.state
    if(!taskDescription) {
      this.setState({ taskDescriptionErrorMessage: 'Required field' })
    }
    else {
      onEditTask ?
      this.presenter.updateGoalTask(taskId, taskDescription, isCompleted)
      :
      this.presenter.addGoalTask(goalId, taskDescription)
      this.setState({ addTask:false, taskDescription: '' })
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
      filterArray,
      showFilterModal,
      filterId,
      filterName,
    } = this.state

    let totalCount = taskArray && taskArray.length
    let taskCompleted  = this.checkIfTaskCompleted(taskArray)
    let percentageTask = taskArray && (taskCompleted /totalCount) * 100


    const { onClose, showRequestCoachForm, showRequestCoachFunc } = this.props
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
        showFilterModal &&
        <SingleInputModal
          label = { 'Select status' }
          inputArray = { filterArray }
          selectedArray = { (filterId, filterName) => this.setState({
              filterId,
              filterName,
              showFilterModal: false
            })
          }
          onClose = { () => this.setState({ showFilterModal: false }) }
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
        <br/>
          <div className = { 'grid-filter margin-left' }>
            <div className = { 'text-align-left margin-right grid-global' }>
              <GenericInput
                text = { 'Filter by status' }
                className = { 'global-button' }
                value = { filterName }
                onClick = { () => {
                  this.setState({ showFilterModal: true })
                } }
              />
              <div></div>
            </div>
            <div className = { 'text-align-right margin-right grid-global' }>
              <GenericButton
                text = { 'Add Goal' }
                className = { 'global-button' }
                onClick = { () => {
                  this.resetValue()
                  this.setState({ showForm: true })
                } }
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
                }
               }
               onDeleted = { (goalId) => this.setState({ goalId, showDeleteModal: true }) }
              />
              :
              <center><h2>No record</h2></center>
            }
            </div>
            <div ref = { 'main-div' } className = { 'padding-10px' }>
              <Card className = { 'padding-10px' }>
                {
                  // <div className = { 'header-column' }>
                  //   <span/>
                  //   <span className = { 'icon-check icon-delete-img' }/>
                  // </div>
                }
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
                      percent = { percentageTask ? percentageTask : 0 } />
                  </div>
                  <div className = { 'grid-global-rows text-align-right' }>
                    <div>
                      {
                        goalTypeId === 1 ?
                        <h2 className = { 'margin-10px font-size-12px font-weight-lighter' }><span className = { 'border-team color-gray' }>Performance</span></h2>
                        :
                          goalTypeId === 2 &&
                          <h2 className = { 'margin-10px font-size-12px font-weight-lighter' }><span className = { 'border-team color-gray' }>Developemental</span></h2>
                      }
                    </div>
                    <div>
                      {
                        approvalStatus === 2 ?
                        <h2 className = { 'margin-10px text-align-right font-size-12px font-weight-bold color-Low' }>Approved</h2>
                        :
                          approvalStatus === 3 ?
                          <h2 className = { 'margin-10px text-align-right font-size-12px font-weight-bold color-High' }>Rejected</h2>
                          :
                          approvalStatus === 1 ?
                          <h2 className = { 'margin-10px text-align-right font-size-12px font-weight-bold' }>Requested</h2>
                          :
                          approvalStatus === 4 ?
                          <h2 className = { 'text-align-right font-size-12px font-weight-bold' }>Update for approval</h2>
                          :
                          approvalStatus === 5 &&
                          <h2 className = { 'text-align-right font-size-12px font-weight-bold' }>Deletion for approval</h2>

                      }
                    </div>
                  </div>
                </div>
                <br/>
                <Line/>
                <div className = { 'padding-10px' }>
                  <div className = { 'header-column' }>
                    <h2 className = { 'font-weight-bold text-align-left font-size-14px' }>{ goalTitle ? goalTitle : 'Goal' }</h2>
                    <h2>
                    {
                      goalId &&
                      <span
                        className = { 'icon-check icon-edit-img' }
                        onClick = { () => this.setState({ showForm: true, editMode: true }) }
                      />
                    }
                    </h2>
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
                          changeTask = { (taskId, isCompleted) => this.presenter.updateGoalTask(taskId, null, isCompleted)  }
                        />
                      :
                      !addTask &&
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
                          <CircularLoader  show = { commentLoader }/>
                        </center>
                        :
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
