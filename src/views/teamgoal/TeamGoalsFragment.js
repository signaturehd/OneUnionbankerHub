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
  GenericLoader,
  DatePicker,
  Card,
  Line,
  FloatingActionButton
} from '../../ub-components/'

import DirectReportGoalsComponent from './components/DirectReportGoalsComponent'
import TeamGoalsComponent from './components/TeamGoalsComponent'
import SquadGoalsComponent from './components/SquadGoalsComponent'
import SquadGoalListComponent from './components/SquadGoalListComponent'
import AddTeamGoalsFormComponent from './components/AddTeamGoalsFormComponent'
import TasksListComponent from './components/TasksListComponent'
import CommentsListComponent from './components/CommentsListComponent'
import HistoryListComponent from './components/HistoryListComponent'

import ResponseModal from '../notice/NoticeResponseModal'

import { convertInitial  } from '../../utils/initialUtils'
import { format } from '../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/teamGoalStyles.css'
import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import Rating from 'react-rating'

class TeamGoalsFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      teamType: 'team',
      squadType: 'squad',
      enabledLoader : false,
      submitLoader: false,
      showMarkAsCompleted: false,
      ifYesCompleted: false,
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
      showDirectReport: true,
      showTeamGoal: false,
      showTeamGoalDetails: false,
      showSquadGoal: false,
      showMemberGoal: false,
      showRemarksText: false,
      showReviewComponent: false,
      showRatingModal: false,
      showRateOptions: false,
      showTabDetails: false,
      isCompleted: 0,
      pageItem: 10,
      pageNumber: 1,
      selectedTeamId: '',
      remarksText : '',
      squadId: '',
      taskId: '',
      taskDescription: '',
      taskDescriptionErrorMessage: '',
      goalComment: '',
      goalCommentErrorMessage: '',
      goalEditComment: '',
      goalId: '',
      goalTitle: '',
      employeeId: '',
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
      statusId : '',
      goalTypeId : '',
      goalType : '',
      goalTypeErrorMessage : '',
      participantErrorMessage : '',
      selectedId: '',
      selectedTitle: '',
      selectedDescription: '',
      selectedName: '',
      selectedImageUrl: '',
      squadCommentList: '',
      businessOutcomeLabel: '',
      goalTypeParam: '',
      businessOutcome: '',
      businessOutcomeErrorMessage: '',
      onChangeValue: '',
      selectedMembers: [],
      memberId: '',
      memberArray: [],
      commentArray: [],
      taskArray: [],
      teamGoalsArray : [],
      squadGoalsArray : [],
      historyArray : [],
      participantArray : [],
      directReportArray: [],
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
    this.presenter.getDirectReportGoals()
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

  getDirectReportGoals (directReportArray) {
    this.setState({ directReportArray })
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

  resetRemarks () {
    this.setState({
      showTabDetails : false,
      showRemarksText : false,
      showTeamGoalDetails : false,
      remarksText : '',
      goalComment: '' })
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
      squadType,
      goalTitle,
      description,
      startDate,
      dueDate,
      priorityId,
      goalTypeId,
      participantArray,
      selectedId,
      showSquadGoal
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
      showSquadGoal ?
      this.presenter.addSquadGoals (
        squadType,
        participantArray,
        goalTitle,
        description,
        moment(startDate).format('YYYY-MM-DD'),
        moment(dueDate).format('YYYY-MM-DD'),
        priorityId,
        goalTypeId,
        selectedId
      )
      :
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
    const { goalId, startDate, dueDate, goalTypeParam } = this.state

    if(!startDate) {
      this.setState({ startDateErrorMessage: 'Required field' })
    } else if (!dueDate) {
      this.setState({ dueDateErrorMessage: 'Required field' })
    } else {
      this.presenter.updateGoals (
        goalId,
        goalTypeParam,
        moment(startDate).format('YYYY-MM-DD'),
        moment(dueDate).format('YYYY-MM-DD')
      )
    }
  }

  submitComment() {
    const { goalId, employeeId, goalTypeParam, selectedTeamId, goalComment, pageNumber, pageItem } = this.state
    if(!goalComment) {
      this.setState({ goalCommentErrorMessage: 'Required field' })
    }
    else {
      this.presenter.addGoalComment(
        goalId,
        goalComment,
        pageNumber,
        pageItem,
        goalTypeParam,
        employeeId
      )
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
      showTabDetails: false,
      selectedId: '',
      selectedTitle: '',
      selectedDescription: '',
      selectedName: '',
      selectedImageUrl: '',
      selectedMembers: []
    })
  }

  checkIfLineMangerOrCompleted (status, isManager) {
    if(isManager && status === 8) {
      return true
    } else {
      return false
    }
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

  setSquadGoalCommentList (squadCommentList, data) {
    this.setState({
      squadCommentList,
      onChangeValue: '',
      pageItem: data && data.totalCount === 0 ? pageItem : data.totalCount })
  }

  commentRateFunc (ratings) {
    this.setState({ ratings, showRemarksText: true })
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

  submitRatingWithRemarks (e) {
    if(e.which === 13) {
      try {
        this.setState({ showRemarksText: false , showRateOptions: true })
      }catch(e) {
        console.log(e)
      }
    }
  }

  checkEmployeePercentageStatus (totalTask, completedTask) {
    let totalPercentage
    totalPercentage =  (completedTask / totalTask) * 100
    return parseInt(totalPercentage)
  }

  checkIfExist (id) {
    let storedId = [...id]
    let isBool = false
    if(storedId.length !== 0) {
      storedId.push(id)
    } else {
      storedId.map((resp) => {
        if(id !== resp) {
          isBool = true
        } else {
          isBool = false
        }
      })
    }
    return isBool
  }

  postMarkAsCompleted() {
    const { businessOutcome, isTeamGoal, goalTypeParam, goalId, squadId } = this.state

    if(businessOutcome !== '') {
      this.setState({ showMarkAsCompleted: false, ifYesCompleted: false })
      this.presenter.markAsCompletedWithType(businessOutcome, isTeamGoal, goalTypeParam, squadId)
    } else {
      this.setState ({ businessOutcomeErrorMessage: 'Required field' })
    }
  }

  render () {
    const {
      showMarkAsCompleted,
      ifYesCompleted,
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
      showDirectReport,
      showTeamGoal,
      showTeamGoalDetails,
      showSquadGoal,
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
      goalTypeParam,
      goalType,
      goalTypeErrorMessage,
      statusId,
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
      directReportArray,
      selectedId,
      selectedTitle,
      selectedDescription,
      selectedName,
      selectedImageUrl,
      selectedMembers,
      squadId,
      showMemberGoal,
      showReviewComponent,
      onChangeValue,
      squadCommentList,
      selectedTeamId,
      showRemarksText,
      ratings,
      remarksText,
      showRatingModal,
      showRateOptions,
      showTabDetails,
      employeeId,
      businessOutcome,
      businessOutcomeErrorMessage,
      businessOutcomeLabel,
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
        showMarkAsCompleted &&
        <Modal>
          {
            ifYesCompleted ?
            <div>
              <h4>Business Outcome</h4>
              <h4 className = { 'font-size-10px font-weight-normal' }>Please input the actual outcome of the completed goal</h4>
              <br/>
              <GenericInput
                text = { 'Business Outcome' }
                type = { 'textarea' }
                value = { businessOutcome }
                onChange = { (e) => this.setState({ businessOutcome: e.target.value, businessOutcomeErrorMessage: '' }) }
                errorMessage = { businessOutcomeErrorMessage }
              />
              <br/>
              <div className = { 'grid-global' }>
                <GenericButton
                  text = { 'Cancel' }
                  className = { 'profile-button-small cursor-pointer global-button' }
                  onClick = { () => this.setState({ showMarkAsCompleted: false, ifYesCompleted: false }) }
                />
                <GenericButton
                  text = { 'Submit' }
                  className = { 'profile-button-small cursor-pointer global-button' }
                  onClick = { () => {
                    try {
                      this.postMarkAsCompleted()
                    } catch (e) {
                      console.log(e)
                    }
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
        showRatingModal &&
        <Modal
          isDismisable = {true}
          onClose = { () =>
            this.setState({
              remarksText: '',
              ratings: 0,
              showRatingModal: false }) }
          >
          <h2 className = { 'text-align-center font-size-30px  font-weight-ligther' }>
            { ratings }
          </h2>
          <br/>
          <div className = { 'text-align-center' }>
            <Rating
              emptySymbol={ <MdStarOutline style={{ fontSize: 25, color : '#959595' }} /> }
              fullSymbol={ <MdStar style={{ fontSize: 25,  color : '#c65e11' }} /> }
              fractions={ 1 }
              onClick = { (e) => this.commentRateFunc(e) }
              initialRating={ (ratings && ratings) || 0 }
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

          {
            showRateOptions &&
            <center>
              <br/>
              <h2>Are your sure you want to submit?</h2>
              <br/>
              <div className ={ 'grid-global' }>
                <GenericButton
                  className = { 'profile-button-small' }
                  text= { 'no' }
                  onClick = { () =>
                    this.setState({ showRateOptions : false, showRemarksText: true })
                  }
                />
                <GenericButton
                  className = { 'profile-button-small' }
                  text= { 'yes' }
                  onClick = { () => {
                      this.presenter.addRatingGoal(goalTypeParam, goalId, ratings, remarksText, employeeId)
                      this.setState({ showRatingModal: false })
                    }
                  }
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
            onSubmit = { (id) => this.onSubmit(id) }
            getMembersGoals = { (type) => this.presenter.getMembersGoals(type) }
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
            showSquadGoal = { showSquadGoal }
            squadId = { selectedId }
            squadMembers = { selectedMembers }
          />
        :
        <div>
          <div className = { 'grid-main' }>
            <div>
            <Line/>
            <br/>
            <div className = { 'team-tabs-container' }>
              <input
                className = { 'teamgoal-input-tab' }
                id = { 'teamgoal-tab1' }
                type = { 'radio' }
                name = { 'tabs' }
                defaultChecked = { true }
                onClick = { () => {
                    this.setState({ showDirectReport: true, showTeamGoal: false, showTeamGoalDetails: false, showSquadGoal: false })
                    this.presenter.getDirectReportGoals(isLineManager && isLineManager)
                    this.props.history.push('/mygoals/request')
                  }
                }/>
              <label className = { 'teamgoal-icon-tab font-size-14px' } htmlFor='teamgoal-tab1'>My Direct Reports</label>

              <input
                className = { 'teamgoal-input-tab' }
                id = { 'teamgoal-tab2' }
                type = { 'radio' }
                name = { 'tabs' }
                onClick = { () => {
                    this.setState({
                      showTabDetails : false,
                      showDirectReport: false,
                      showTeamGoal: true,
                      showTeamGoalDetails: true,
                      showSquadGoal: false })
                    this.presenter.getTeamGoals(teamType)
                    this.props.history.push('/mygoals/team')
                  }
                }/>
                <label className = { 'teamgoal-icon-tab font-size-14px' } htmlFor='teamgoal-tab2'>Manager-Assigned-Goals</label>
                <input
                  className = { 'teamgoal-input-tab' }
                  id = { 'teamgoal-tab3' }
                  type = { 'radio' }
                  name = { 'tabs' }
                  onClick = { () => {
                      this.setState({
                        showTabDetails: false,
                        showDirectReport: false,
                        showTeamGoal: false,
                        showTeamGoalDetails: false,
                        showSquadGoal: true })
                      this.presenter.getSquadGoals(this.state.squadType)
                      this.props.history.push('/mygoals/approved')
                    }
                }/>
                <label className = { 'teamgoal-icon-tab font-size-14px' } htmlFor='teamgoal-tab3'>Squad Goals</label>
            </div>
            <br/>
            <br/>
            {
              showDirectReport &&
              <div>
                <div className = { 'text-align-left' }>
                  <h4 className = { 'font-weight-bold font-size-16px' }>My Direct Reports</h4>
                  <h4 className = { 'font-weight-lighter font-size-12px' }>List of your direct and their goals in One place.</h4>
                  <br/>
                </div>
                {
                    enabledLoader ?
                    <center>
                      <CircularLoader show = { enabledLoader }/>
                    </center>
                    :
                    directReportArray.length !== 0 ?
                    directReportArray.map((resp, key) =>
                      <DirectReportGoalsComponent
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
                          statusId,
                          goalTypeId,
                          businessOutcomeLabel
                        ) => {
                          this.setState({
                            goalId,
                            businessOutcomeLabel,
                            goalTitle,
                            description,
                            startDate,
                            dueDate,
                            priorityName,
                            statusId,
                            goalTypeId,
                            showTabDetails: true,
                            goalTypeParam: 'personal',
                           })
                          this.presenter.getGoalTask(goalId, 'personal')
                          this.presenter.getGoalComment(goalId, pageNumber, pageItem, 'personal')
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
              showTeamGoal &&
              <div>
                <div className = { 'grid-global' }>
                  <div className = { 'text-align-left' }>
                    <h4 className = { 'font-weight-bold font-size-16px' }>Manager Assigned Goals</h4>
                    <h4 className = { 'font-weight-lighter font-size-12px' }>List of goals you've assigned to your team.</h4>
                    <br/>
                  </div>
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
                <br/>
                {
                    enabledLoader ?
                    <center>
                      <CircularLoader show = { enabledLoader }/>
                    </center>
                    :
                    <TeamGoalsComponent
                      teamGoalsArray = { teamGoalsArray }
                      priorityFunc = { (resp) => this.priorityFunc(resp) }
                      onSelected = { (
                        selectedTitle,
                        selectedDescription,
                        selectedMembers,
                        startDate,
                        dueDate,
                        goalId
                      ) => {
                        try {
                          this.setState({
                            goalTypeParam: 'team',
                            selectedTitle,
                            goalId: goalId,
                            selectedDescription,
                            selectedMembers,
                            showTeamGoal: true,
                            showTeamGoalDetails: true,
                            startDate : startDate,
                            dueDate: dueDate,
                           })
                        } catch (e) {
                          console.log(e)
                        }
                        this.setState({ goalId: resp.id })
                        this.presenter.getGoalTask(goalId, 'team')
                        this.presenter.getGoalComment(goalId, pageNumber, pageItem, 'team')
                        this.presenter.getGoalsHistory(goalId, pageNumber, pageItem)
                      }
                     }
                     onDeleted = { (goalId) => this.setState({ goalId, showDeleteModal: true }) }
                    />
                }
              </div>
            }
            {
              showSquadGoal &&
              <div>
                <h4 className={ 'font-size-14px font-weight-bold' }>My Squads</h4>
                <h4 className={ 'font-size-10px font-weight-lighter' }>List of goals you've assigned to your squad.</h4>
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
                      squadId = { resp.id }
                      squadName = { resp.name }
                      description = { resp.description }
                      productOwner = { resp.productOwner }
                      memberDetails = { resp.memberDetails }
                      priorityFunc = { (resp) => this.priorityFunc(resp) }
                      onSelected = { (
                        selectedId,
                        selectedTitle,
                        selectedDescription,
                        selectedMembers
                      ) => {
                        this.setState({
                          selectedId,
                          selectedTitle,
                          selectedDescription,
                          selectedMembers,
                          goalTypeParam: 'squad'
                         })
                         this.setState({ goalId: resp.id })
                         this.presenter.getTeamGoals('squad')
                         this.setState({ showReviewComponent: false })
                         this.presenter.getGoalTask(resp.id, 'squad')
                         this.presenter.getGoalComment(resp.id, pageNumber, pageItem, 'squad')
                         this.presenter.getGoalsHistory(resp.id, pageNumber, pageItem)
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
            {
              showTabDetails &&
              <Card className = { 'padding-10px' }>

                <div className = { 'grid-percentage' }>
                  <div className = { 'text-align-center padding-10px' }>
                    {
                      statusId === 2 ?
                      <h2 className = { 'margin-10px text-align-center font-size-12px font-weight-bold color-Medium' }>Approved</h2>
                      :
                        statusId === 3 ?
                        <h2 className = { 'margin-10px text-align-center font-size-12px font-weight-bold color-High' }>Rejected</h2>
                        :
                        statusId === 1 ?
                        <h2 className = { 'margin-10px text-align-center font-size-12px font-weight-bold' }>Goals Pending Manager Approval</h2>
                        :
                        statusId === 4 ?
                        <h2 className = { 'text-align-center font-size-12px font-weight-bold' }>Update for approval</h2>
                        :
                        statusId === 5 ?
                        <h2 className = { 'text-align-center font-size-12px font-weight-bold' }>Deletion for approval</h2>
                        :
                        statusId === 6 ?
                        <h2 className = { 'text-align-center font-size-12px font-weight-bold color-Low' }>Completed</h2>
                        :
                        statusId === 8 &&
                        <h2
                          style = {{
                            background: '#25a925',
                            borderRadius: '3px',
                            color: '#fff'
                          }}
                          className = { 'text-align-center font-size-12px font-weight-bold' }>For Rating</h2>
                    }
                    <br/>
                    <Progress
                      type = { 'circle' }
                      height = { 80 }
                      width = { 80 }
                      percent = { percentageTask ? parseInt(percentageTask) : 0 } />
                    <br/>
                    <br/>
                  </div>
                  <div>
                    <div>
                      <br/>
                      <h2 className = { 'text-align-center font-size-30px  font-weight-ligther' }>
                        {
                          // ratings
                         }
                      </h2>
                      <br/>
                      <div className = { 'text-align-center' }>
                        {
                        //   // !this.checkIfLineMangerOrCompleted(statusId, isLineManager) ?
                        //   <Rating
                        //     emptySymbol={ <MdStarOutline style={{ fontSize: 25, color : '#959595' }} /> }
                        //     fullSymbol={ <MdStar style={{ fontSize: 25,  color : '#c65e11' }} /> }
                        //     fractions={ 1 }
                        //     onChange={ e => this.commentRateFunc(e) }
                        //     initialRating={ (ratings ? ratings : 0) || 0 }
                        //   />
                        // :
                        // <div></div>
                        }
                        <br/>
                      </div>
                      <h2 className = { 'font-size-12px unionbank-color text-align-center' }>{ //this.checkRatings(ratings)
                       }</h2>
                      {
                        // showRemarksText &&

                        // <GenericInput
                        //   value = { remarksText }
                        //   hint = { 'Please add remarks' }
                        //   type = { 'textarea' }
                        //   onChange = { (e) => {
                        //     try {
                        //       this.setState({ remarksText : e.target.value })
                        //     } catch(e) {
                        //       console.log(e)
                        //     }
                        //   } }
                        //   onKeyPress = { (e) => this.submitRatingWithRemarks(e) }
                        // />
                      }
                      <br/>
                    </div>
                  </div>
                  <div className = { 'text-align-right' }>
                    <div>
                      {
                        goalTypeId === 1 ?
                        <h2 className = { 'margin-10px font-size-12px font-weight-lighter' }><span className = { 'border-team color-gray' }>Performance</span></h2>
                        :
                          goalTypeId === 2 &&
                          <h2 className = { 'margin-10px font-size-12px font-weight-lighter' }><span className = { 'border-team color-gray' }>Developemental</span></h2>
                      }
                      <div>
                        <h2 className = { `margin-5px text-align-right font-size-12px font-weight-bold color-${priorityName}` }>{ priorityName ? priorityName : 'Priority' }</h2>
                      </div>
                      <br/>
                      <div className = { 'grid-global' }>
                        <div></div>
                        <div className = { 'grid-global' }>
                          {
                            // <div className = { 'text-align-center' }>
                            //   <h2 className = { 'margin-5px text-align-center font-size-12px font-weight-lighter' }>
                            //     <span className = { 'icon-check icon-taskcompleted-img' }/>{ //this.checkIfTaskCompleted(taskArray) }/{ taskArray && totalCount
                            //     }</h2>
                            // </div>
                          }
                          <div></div>
                          <div className = { 'text-align-center' }>
                            <h2 className = { 'margin-5px text-align-center font-size-12px font-weight-lighter' }>
                              <span className = { 'icon-check icon-comment-img text-align-center' }/>{ commentArray && commentArray.totalCount ? commentArray.totalCount : 0
                              }</h2>
                          </div>
                        </div>
                      </div>
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
                  <br/>
                  <h4 className = { 'font-size-12px color-gray' }>
                    {// { startDate === '' ||  dueDate=== '' &&  `${moment(startDate) + -' '+ moment(dueDate)}` }
                  }
                  </h4>
                </div>
                <div>
                  <br/>
                  <Line/>
                  <div className = { 'padding-10px' }>
                    <h2 className = { 'font-size-12px' }> Business Outcome : { businessOutcomeLabel && businessOutcomeLabel }</h2>
                    <br/>
                    <div className = { 'header-column' }>
                      <div>
                        <h2 className = { 'font-weight-bold text-align-left font-size-14px' }>Tasks</h2>
                        <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }>Enter the activities that would help you achieve your goal (Be Specific).</h2>
                      </div>
                      <h2>
                      </h2>
                    </div>
                    {
                      // addTask &&
                      // <div>
                      //   <GenericInput
                      //     text = { 'Task description' }
                      //     value = { taskDescription }
                      //     onChange = { (e) => this.taskDescriptionFunc(e.target.value) }
                      //     type = { 'textarea' }
                      //     errorMessage = { taskDescriptionErrorMessage }
                      //   />
                      //   <div className = { 'grid-global' }>
                      //     <GenericButton
                      //       text = { 'Cancel' }
                      //       className = { 'profile-button-small' }
                      //       onClick = { () => this.setState({ onEditTask: false, addTask: false, taskDescription: '' }) }
                      //     />
                      //     <GenericButton
                      //       text = { onEditTask ? 'Update' : 'Submit' }
                      //       className = { 'profile-button-small' }
                      //       onClick = { () => this.submitTask() }
                      //     />
                      //   </div>
                      //   <br/>
                      //   <Line/>
                      //   <br/>
                      // </div>
                    }
                    {
                      taskLoader ?
                      <center>
                        <GenericLoader show = { taskLoader }/>
                      </center>
                      :
                      taskArray &&
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
                      <h2 className = { 'text-align-center font-weight-lighter font-size-14px' }>No task</h2>
                    }
                    {
                      this.checkIfLineMangerOrCompleted(statusId, isLineManager) &&
                      <center>
                        <GenericButton
                          text = { 'SUBMIT GOAL RATING' }
                          onClick = { () => this.setState({ showRatingModal : true }) }
                          className = { 'global-button profile-button-medium cursor-pointer' }
                        />
                      </center>
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
                      commentLoader ?
                      <center>
                        <GenericLoader show = { commentLoader }/>
                      </center>
                      :
                      commentArray.length !==0 ?
                        commentArray.commentDetails.map((resp, key) =>(
                          <CommentsListComponent
                            employeeNumber = { employeeNumber }
                            respEmployeeNumber = { resp.employeeNumber }
                            commentLoader = { commentLoader }
                            cardHolder = { resp }
                            dateTime = { resp.dateTime }
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
                          value = { goalComment }
                          text = { 'Write a comment' }
                          onChange = { (e) => this.goalCommentFunc(e.target.value) }
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
            }
            {
              showTeamGoalDetails &&
              <Card className = { 'padding-10px' }>
                <div className = { 'padding-10px' }>
                  <div className = { 'header-column' }>
                    <h2 className = { 'font-weight-bold text-align-left font-size-14px' }>{ selectedTitle ? selectedTitle : 'Title' }</h2>
                    <h2></h2>
                  </div>
                  <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }>{ selectedDescription ? selectedDescription : 'Description' }</h2>
                  <br/>
                  <h4 className = { 'font-size-12px' }>
                    {// { moment(startDate && startDate).format('MMM DD YYYY') - moment(dueDate && dueDate).format('MMM DD YYYY') }
                    }
                  </h4>
                </div>
                {
                  selectedTitle &&
                <div>
                  <br/>
                  <Line/>
                  <div className = { 'padding-10px' }>
                    <div className = { 'header-column' }>
                      <div>
                        <h2 className = { 'font-weight-bold text-align-left font-size-14px' }>Team Members</h2>
                        <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }></h2>
                        <br/>
                      </div>
                      <h2></h2>
                    </div>
                    {
                      selectedMembers &&
                      selectedMembers.length !== 0 ?
                      selectedMembers.participants.map((details, key) =>
                       <div>
                         <div
                           onClick = { () =>
                             this.setState({
                               showMemberGoal: true,
                               statusId: details.status,
                               employeeId: details.employeeId,
                             }) }
                           className = { 'cursor-pointer team-goal-grid-percentage' }>
                           <div className = { 'squad-profile-picture' }>
                             <h2 className = { 'squad-initial-text' }>
                               { details &&  convertInitial(details.fullName && details.fullName) }
                             </h2>
                           </div>
                           <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }>{ details.fullName }</h2>
                           <div className = { 'text-align-right' }>
                             <Progress
                               type = { 'circle' }
                               height = { 25 }
                               width = { 25 }
                               percent = { this.checkEmployeePercentageStatus(details.totalTask, details.completedTask ) || 0} />
                           </div>
                         </div>
                         <h2 className={ 'font-size-10px' }>Business Outcome: { details.businessOutcome  }</h2>
                         <br/>
                       </div>
                      )
                      :
                      <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }>No record</h2>
                    }
                  </div>
                  {
                    showMemberGoal &&
                      <div>
                        <div className = { 'padding-10px' }>
                          <div className = { 'header-column' }>
                            <div>
                              <h2 className = { 'font-weight-bold text-align-left font-size-14px' }>Tasks</h2>
                              <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }>Enter the activities that would help you achieve your goal (Be Specific).</h2>
                            </div>
                            <h2>
                            </h2>
                          </div>
                        </div>
                          {
                            taskLoader ?
                            <center>
                              <GenericLoader show = { taskLoader }/>
                            </center>
                            :
                            taskArray &&
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
                            <h2 className = { 'text-align-center font-weight-lighter font-size-14px' }>No task</h2>
                          }
                          <br/>
                          {
                            this.checkIfLineMangerOrCompleted(statusId, isLineManager) &&
                            <center>
                              <GenericButton
                                text = { 'SUBMIT GOAL RATING' }
                                onClick = { () => this.setState({ showRatingModal : true }) }
                                className = { 'global-button profile-button-medium cursor-pointer' }
                              />
                            </center>
                          }
                        <br/>
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
                                  employeeNumber = { employeeNumber }
                                  respEmployeeNumber = { resp.employeeNumber }
                                  commentLoader = { commentLoader }
                                  cardHolder = { resp }
                                  dateTime = { resp.dateTime }
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
                                value = { goalComment }
                                text = { 'Write a comment' }
                                onChange = { (e) => this.goalCommentFunc(e.target.value) }
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
                      </div>
                  }
                </div>
                }
              </Card>
            }
            {
              showSquadGoal &&
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
                  {
                    showReviewComponent ?
                    <div>
                      <br/>
                      <div className = { 'squad-goals-comment' }>
                        <div>
                          <i
                            onClick = { () => this.setState({ showReviewComponent : false }) }
                            className = { 'back-arrow' }></i>
                        </div>
                        <div>
                          <div className = { 'grid-global' }>
                            <h4 className = { 'font-weight-lighter font-size-16px' }>Reviews</h4>
                            {
                              isPO &&
                              <GenericButton
                                className = { 'profile-button-small text-align-right cursor-pointer global-button' }
                                text = { 'Mark as Completed' }
                                onClick = { () => this.setState({ showMarkAsCompleted : true  }) }
                                />
                            }
                          </div>
                          <br/>
                          <div>
                            {
                              squadCommentList &&
                              squadCommentList.map((squadList, key) =>
                                <div key = { key }>
                                  <div className = { 'squad-goals-comment' }>
                                    <div className = { 'squad-profile-picture' }>
                                      <h2 className = { 'squad-initial-text' }>
                                        { squadList &&  convertInitial(squadList.employeeName && squadList.employeeName) }
                                      </h2>
                                    </div>
                                    <div>
                                      <h4 className = { 'font-size-9px font-weight-lighter' }>{ squadList && squadList.employeeName }</h4>
                                    </div>
                                  </div>
                                  <div className = { 'squad-goals-comment' }>
                                    <div></div>
                                    <div>
                                      <h4 className = { 'font-size-14px font-weight-lighter' }>
                                        : { squadList && squadList.description}, <b className = { 'font-size-10px font-weight-ligther' }>{ moment(squadList.dateTime).fromNow() }</b>
                                      </h4>
                                    </div>
                                  </div>
                                  <br/>
                                </div>
                              )
                            }
                          </div>
                          <br/>
                          <div>
                          {
                            enabledLoader ?
                            <center>
                              <GenericLoader show = { enabledLoader } />
                            </center>
                            :
                            <center>
                              <GenericInput
                                value = { onChangeValue }
                                onChange = { (e) => this.setState({ onChangeValue : e.target.value }) }
                                />
                              <GenericButton
                                className = { 'profile-button-small global-button' }
                                text = { 'Send' }
                                onClick = { () => this.presenter.addSquadGoalComment('squad', squadId, onChangeValue) }
                                />
                            </center>
                          }
                          </div>
                        </div>
                      </div>
                    </div>
                    :
                    <div>
                      <br/>
                      <Line/>
                      <div className = { 'padding-10px' }>
                        <div className = { 'header-column' }>
                          <div>
                            <h2 className = { 'font-weight-bold text-align-left font-size-16px' }>Squad Goals</h2>
                            <h2 className = { 'font-weight-lighter text-align-left font-size-14px' }></h2>
                          </div>
                          <h2>
                          {
                            // goalId &&
                            <span
                              className = { 'icon-check icon-add-img' }
                              onClick = { () => this.setState({ showForm: true, squadId: selectedId }) }
                            />
                          }
                          </h2>
                        </div>
                      </div>

                      <br/>
                      <div>
                        <SquadGoalListComponent
                          onSelected = { (pageNumber, goalId, goalType) => {
                            this.setState({ squadId : goalId })
                            this.presenter.getSquadGoalComment(pageNumber, pageItem, goalId, goalType)
                            this.setState({ showReviewComponent : true })
                            }
                          }
                          teamGoalsArray = { teamGoalsArray }
                          />
                      </div>
                      <br/>
                      <Line/>
                      <div className = { 'padding-10px' }>
                        <div className = { 'header-column' }>
                          <div>
                            <h2 className = { 'font-weight-bold text-align-left font-size-14px' }>Members</h2>
                            <h2 className = { 'font-weight-lighter text-align-left font-size-12px' }></h2>
                          </div>
                          <h2>
                          </h2>
                        </div>
                        {
                          selectedMembers &&
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
                </div>
                }
              </Card>
            }
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
