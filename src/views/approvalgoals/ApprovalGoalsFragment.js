import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/ApprovalGoalsPresenter'

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

import ApprovalGoalsComponent from './components/ApprovalGoalsComponent'

import ResponseModal from '../notice/NoticeResponseModal'

import { format } from '../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/approvalStyles.css'

import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import { FaPlayCircleO } from 'react-icons/lib/fa/'
import Rating from 'react-rating'

class ApprovalGoalsFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeResponseModal : false,
      showRejectRemarksModal: false,
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
      approvalArray : []
    }
  }

  componentDidMount() {
    this.presenter.getForApprovalGoals()
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
    const {
      enabledLoader,
      showNoticeResponseModal,
      noticeResponse,
      approvalArray,
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
    } = this.state

    const {
      isLineManager
    } = this.props

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
        <div>
        <br/>
          <div className = { 'grid-main padding-10px' }>
            <div>
            {
              enabledLoader ?
              <center>
                <CircularLoader show = { enabledLoader }/>
              </center>
              :
              approvalArray.length !== 0 ?
              approvalArray.map((resp, key) =>

              <ApprovalGoalsComponent
                employeeName = { resp.name }
                imageUrl = { resp.imageUrl }
                cardHolder = { resp.goalDetails }
                priorityFunc = { (resp) => this.priorityFunc(resp) }
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
                    goalTypeId
                  })
                }
              />
              )
              :
              <center><h2>No record</h2></center>
          }
            </div>
            <div>
              <div className = { 'padding-10px' }>
                <Card className = { 'padding-10px' }>
                <div className = { 'grid-global padding' }>
                  <div>
                    <h2 className = { 'font-size-14px text-align-left font-weight-lighter' }>{employeeName}</h2>
                    <h2 className = { 'font-size-12px text-align-left font-weight-bold' }>{goalTitle}</h2>
                    <h2 className = { 'font-size-12px text-align-left font-weight-lighter' }>{moment(startDate).format('MMM DD, YYYY')} to {moment(dueDate).format('MMM DD, YYYY')}</h2>
                    <br/>
                    <h2 className = { 'font-size-14px font-weight-lighter text-align-left' }>Goal description:</h2>
                    <h2 className = { 'font-size-12px font-weight-lighter text-align-left' }>{ description }</h2>
                  </div>
                  <div>
                    <h2 className = { 'font-size-12px font-weight-lighter text-align-right' }><span className = { 'border' }>{ goalTypeId ? goalTypeId === 1 ? 'Performance' : 'Developemental' : 'x' }</span></h2>
                  </div>
                </div>
                {
                  showRejectRemarksModal &&
                  <Modal
                  isDismisable = { true }
                  onClose = { () => this.setState({ showRejectRemarksModal: false }) }>
                    <GenericInput
                      text = { 'Remarks' }
                      value = { rejectedRemarks }
                      onChange = { (e) => this.setState({ rejectedRemarks: e.target.value }) }
                    />
                    <center>
                    <div className = { 'grid-global' }>
                      <div>
                        <GenericButton
                        text = { 'Close' }
                        onClick = { () => this.setState({ showRejectRemarksModal: false }) }/>
                      </div>
                      <div>
                        <GenericButton
                        text = { 'Submit' }
                        onClick = { () => {
                          this.onApprovalSubmit(goalId, 3, rejectedRemarks)
                          this.setState({ showRejectRemarksModal: false })
                        }
                       }/>
                      </div>
                    </div>
                    </center>
                  </Modal>
                }
                <center>
                  <div className = { 'grid-global padding' }>
                    <div>
                      <GenericButton
                      text = { 'Reject' }
                      className = { 'button-reject profile-button-small' }
                      onClick = { () => this.setState({ showRejectRemarksModal: true }) }/>
                    </div>
                    <div>
                      <GenericButton
                      text = { 'Approve' }
                      className = { 'button-approve profile-button-small' }
                      onClick = { () => this.onApprovalSubmit(goalId, 2, '') }/>
                    </div>
                  </div>
                </center>
                </Card>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
  }
}

ApprovalGoalsFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(ApprovalGoalsFragment, Presenter )
