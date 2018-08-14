import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import ApprovalTrainingCardComponent from '../components/ApprovalTrainingCardComponent'
import ApprovedTrainingCardComponent from '../components/ApprovedTrainingCardComponent'

import ApprovalTrainingModal from '../modals/ApprovalTrainingModal'
import ResponseModal from '../../notice/NoticeResponseModal'

import * as MyTrainingFunctions from
'../functions/MyTrainingFunctions'

import {
  CircularLoader,
  Line,
  GenericInput,
  GenericButton,
  ConfirmationModal,
  Modal
} from '../../../ub-components/'

import './styles/myTrainingStyle.css'

class ApprovalTrainingFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      approvalTrainingList : [],
      approvedTrainingList : [],
      approvalTrainingDetails : null,
      enabledLoader : false,
      loadingModal : false,
      approvalIndex : 8,
      approvedIndex : 8,
      rejectionReason : '',
      showRejectModal : false,
      showApproveModal : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
    }
  }

  componentDidMount () {
    this.props.presenter.getNeedApprovalTrainings()
    this.props.presenter.getApprovedTrainings()
  }

  showApprovalList (approvalTrainingList) {
    this.setState({ approvalTrainingList })
  }

  showApprovedList (approvedTrainingList) {
    this.setState({ approvedTrainingList })
  }

  setApprovalTrainingDetails (approvalTrainingDetails) {
    this.setState({ approvalTrainingDetails })
  }

  circularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  modalLoader (loadingModal) {
    this.setState({ loadingModal })
  }

  submitTrainingRequest(status) {
    const {
      approvalTrainingDetails,
      rejectionReason,
      showRejectModal,
      showApproveModal,
    } = this.state
    this.setState({ showRejectModal : false, showApproveModal : false })
    this.props.presenter.trainingRequest(approvalTrainingDetails.training.id, approvalTrainingDetails.employeeId, status, rejectionReason)
  }

  setNoticeResponse (noticeResponse) {
  this.setState({ noticeResponse, showNoticeResponseModal : true, approvalTrainingList : [], approvedTrainingList : [], rejectionReason : '' })
    this.props.presenter.getNeedApprovalTrainings()
    this.props.presenter.getApprovedTrainings()
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  render () {
  const {
    history,
    presenter,
    searchString
  } = this.props

  const {
    approvalTrainingList,
    approvedTrainingList,
    approvalTrainingDetails,
    enabledLoader,
    loadingModal,
    approvalIndex,
    approvedIndex,
    rejectionReason,
    showRejectModal,
    showApproveModal,
    showNoticeResponseModal,
    noticeResponse,
  } = this.state

  const search = searchString.trim().toLowerCase()

  let approvalTraining = approvalTrainingList
  if (search.length > 0) {
        approvalTraining = approvalTrainingList.filter(approvalTrainingList =>
       approvalTrainingList.name.toLowerCase().match(search) ||
       approvalTrainingList.title.toLowerCase().match(search))
  }
  let approvedTraining = approvedTrainingList
  if (search.length > 0) {
        approvedTraining = approvedTrainingList.filter(approvedTrainingList =>
       approvedTrainingList.employeeName.toLowerCase().match(search) ||
       approvedTrainingList.training.title.toLowerCase().match(search))
  }

  return (
    <div>
      { super.render() }
      {
        approvalTrainingDetails &&
        <ApprovalTrainingModal
          onClose = { () => this.setState({ approvalTrainingDetails : null }) }
          details = { approvalTrainingDetails }
          showApproveModal = { (showApproveModal) => this.setState({ showApproveModal }) }
          showRejectModal = { (showRejectModal) => this.setState({ showRejectModal }) }
        />
      }
      {
        showRejectModal &&
        <Modal
          isDismisable = { true }
          onClose = { () => this.setState({ showRejectModal : false, rejectionReason : '' }) }>
          <h3><b>Training Rejection</b></h3>
          <p className={'subtitle'}>Please indicate the reason for rejection of this training, Thank you!</p>
          <GenericInput
            type = { 'text' }
            value = { rejectionReason }
            hint = { 'Enter you remarks here' }
            onChange = { (e) => this.setState({ rejectionReason : e.target.value }) }
            maxLength = { 255 }
            />
          <div className={ 'button-position' }>
            <div></div>
            <GenericButton
              type = { 'button' }
              text = { 'Ok' }
              onClick = { () => this.submitTrainingRequest(6) }
              />
          </div>
        </Modal>
      }
      {
        showApproveModal &&
        <ConfirmationModal
          text = { 'Are you sure you want to approve this training?' }
          onClose = { () => this.setState({ showApproveModal : false }) }
          onYes = { () => this.submitTrainingRequest(5) }
        />
      }
      {
        loadingModal &&
        <Modal>
          <center>
            <h3>Please wait while Loading...</h3>
            <br/>
            <br/>
            <CircularLoader show={true}/>
           </center>
         </Modal>
      }
      {
        showNoticeResponseModal &&
        <ResponseModal
          onClose = { () => {
            this.setState({ showNoticeResponseModal : false, noticeResponse : '', approvalTrainingDetails : null })
          }}
          noticeResponse = { noticeResponse }
        />
      }
      {
        enabledLoader ?
        <center className = { 'circular-loader-center' }>
           <CircularLoader show = { true }/>
         </center>
       :
      <div className = { 'mytrainings-grid-container-row' }>
        <div className = { 'mytrainings-list-card' }>
          <div className={ 'mytrainings-group-grid' }>
            <h3>For Approval</h3>
            <Line className={ 'group-line' }/>
            <br/>
          </div>
          <div className = { 'mytrainings-list' }>
            {
              approvalTraining &&
              approvalTraining.slice(0, approvalIndex).map((resp, key) =>
              <ApprovalTrainingCardComponent
                key = { key }
                id = { resp.id }
                name = { resp.name }
                status = { resp.status }
                title = { resp.title }
                onClick = { (id) => presenter.getApprovalTrainingDetails(id) }
                />
              )
            }
          </div>
          {
            !!approvalTraining.length ?
            <div>
              <div className = { 'grid-global' }>
                  {
                    approvalIndex === 8 ?
                    <div></div> :
                    <GenericButton
                      className = { 'transaction-component-button' }
                      text = { 'View Less' }
                      onClick = { () =>
                        this.setState({
                          approvalIndex : MyTrainingFunctions.indexDecreased(approvalIndex)
                          })
                        }
                      />
                  }
                  <GenericButton
                    className = { 'transaction-component-button' }
                    text = { 'View More' }
                    onClick = { () =>
                      this.setState({
                        approvalIndex : MyTrainingFunctions.indexIncreased(approvalIndex)
                        })
                      }
                    />
              </div>
              <br/>
              <br/>
            </div>
            :
            <div></div>
          }
          <div className={ 'mytrainings-group-grid' }>
            <h3>Recently Approved Training</h3>
            <Line className={ 'group-line' }/>
            <br/>
          </div>
          <div className = { 'mytrainings-list' }>
            {
              approvedTraining &&
              approvedTraining.slice(0, approvedIndex).map((resp, key) =>
                <ApprovedTrainingCardComponent
                  id = { key }
                  name = { resp.employeeName }
                  title = { resp.training.title }
                  />
              )
            }
          </div>
            {
              !!approvedTraining.length ?
              <div>
                <div className = { 'grid-global' }>
                    {
                      approvedIndex === 8 ?
                      <div></div> :
                      <GenericButton
                        className = { 'transaction-component-button' }
                        text = { 'View Less' }
                        onClick = { () =>
                          this.setState({
                            approvedIndex : MyTrainingFunctions.indexDecreased(approvedIndex)
                            })
                          }
                        />
                    }
                    <GenericButton
                      className = { 'transaction-component-button' }
                      text = { 'View More' }
                      onClick = { () =>
                        this.setState({
                          approvedIndex : MyTrainingFunctions.indexIncreased(approvedIndex)
                          })
                        }
                      />
                </div>
              </div>
              :
              <div></div>
            }
        </div>
      </div>
      }
    </div>
    )
  }
}

export default ApprovalTrainingFragment
