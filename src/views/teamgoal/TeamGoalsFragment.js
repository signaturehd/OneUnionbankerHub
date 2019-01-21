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
import SquadGoalsComponent from './components/SquadGoalsComponent'
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
      teamType: 'team',
      squadType: 'squad',
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
      selectedId: '',
      selectedTitle: '',
      selectedDescription: '',
      selectedName: '',
      selectedImageUrl: '',
      selectedMembers: [],
      memberId: '',
      memberArray: [],
      commentArray: [],
      taskArray: [],
      teamGoalsArray : [],
      squadGoalsArray : [],
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
    this.presenter.getTeamGoals(this.state.teamType)
    this.presenter.getSquadGoals(this.state.squadType)
    // this.scrollFunction()
  }

  getTeamGoals(teamGoalsArray) {
    this.setState({ teamGoalsArray })
  }

  getSquadGoals(squadGoalsArray) {
    this.setState({ squadGoalsArray })
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

  getMembersList (memberArray) {
      this.setState({ memberArray })
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
      teamType,
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
        teamType,
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
      showCommentOption: false,
      selectedId: '',
      selectedTitle: '',
      selectedDescription: '',
      selectedName: '',
      selectedImageUrl: '',
      selectedMembers: []
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

  checkedMember(id, participantArray) {
    const tempArray = [...participantArray]
    let idExist = 0
    participantArray.map((memberId, key) =>
      memberId === id && idExist++
    )
    if(idExist === 0) {
      tempArray.push(id)
    } else {
      tempArray.pop(id)
    }
    this.setState({ participantArray: tempArray })
  }

  render () {
    const {
      teamType,
      squadType,
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
      squadGoalsArray,
      priorityArray,
      goalTypeArray,
      historyArray,
      memberId,
      memberArray,
      participantArray,
      participantErrorMessage,
      selectedId,
      selectedTitle,
      selectedDescription,
      selectedName,
      selectedImageUrl,
      selectedMembers
    } = this.state

    const {
      onClose,
      showRequestCoachForm,
      showRequestCoachFunc,
      employeeNumber,
      isLineManager,
      isPO
     } = this.props

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
            getMembersGoals = { () => this.presenter.getMembersGoals(teamType) }
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
            memberId = { memberId }
            memberArray = { memberArray }
            checkedMember = { (id) => this.checkedMember(id, participantArray) }
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
            {
              <div>
                <h2 className = { 'text-align-left font-size-14px font-weight-bold' }>Team Goals</h2>
                <Line/>
                <br/>
                {
                  isLineManager &&
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
            }
            {
              isPO &&
              <div>
                <h2 className = { 'text-align-left font-size-14px font-weight-bold' }>Squad Goals</h2>
                <Line/>
                <br/>
                {
                  enabledLoader ?
                  <center>
                    <CircularLoader show = { enabledLoader }/>
                  </center>
                  :
                  squadGoalsArray.length !== 0 ?
                  squadGoalsArray.map((resp, key) =>
                    <SquadGoalsComponent
                      squadName = { resp.name }
                      description = { resp.description }
                      productOwner = { resp.productOwner }
                      memberDetails = { resp.memberDetails }
                      priorityFunc = { (resp) => this.priorityFunc(resp) }
                      onSelected = { (
                        selectedTitle,
                        selectedDescription,
                        selectedMembers
                      ) => {
                        this.setState({
                          selectedTitle,
                          selectedDescription,
                          selectedMembers
                         })
                        // this.presenter.getGoalTask(goalId)
                        // this.presenter.getGoalComment(goalId, pageNumber, pageItem)
                        // this.presenter.getGoalsHistory(goalId, pageNumber, pageItem)
                      }
                     }
                     onDeleted = { (goalId) => this.setState({ goalId, showDeleteModal: true }) }
                    />
                  )
                  :
                  <center><h2>No record</h2></center>
                }
              </div>
            }
            </div>
            <div ref = { 'main-div' } className = { 'padding-10px' }>
              <Card className = { 'padding-10px' }>
                <div className = { 'padding-10px' }>
                  <div className = { 'header-column' }>
                    <h2 className = { 'font-weight-bold text-align-left font-size-14px' }>{ selectedTitle ? selectedTitle : 'Title' }</h2>
                    <h2></h2>
                  </div>
                  <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }>{ selectedDescription ? selectedDescription : 'Description' }</h2>
                </div>
                {
                  selectedTitle &&
                  <div>
                  <br/>
                  <Line/>
                  <div className = { 'padding-10px' }>
                    <div className = { 'header-column' }>
                      <div>
                        <h2 className = { 'font-weight-bold text-align-left font-size-14px' }>Members</h2>
                        <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }></h2>
                      </div>
                      <h2></h2>
                    </div>
                    {
                      selectedMembers ?
                      selectedMembers.map((details, key) =>
                        <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }>{ details.name }</h2>
                      )
                      :
                      <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }>No record</h2>
                    }
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

TeamGoalsFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(TeamGoalsFragment, Presenter )
