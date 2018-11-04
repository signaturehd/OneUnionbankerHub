import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/ApprovalPresenter'

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

import ApprovalComponent from './components/ApprovalComponent'
import ApprovalFormComponent from './components/ApprovalFormComponent'

import ResponseModal from '../notice/NoticeResponseModal'

import { format } from '../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/approvalStyles.css'

class ApprovalFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      submitLoader : false,
      showForm : false,
      showRejectRemarksModal : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
      requestId : '',
      firstName : '',
      middleName : '',
      lastName : '',
      referenceNumber : '',
      departureOrigin : '',
      departureDestination : '',
      departureDate : '',
      departureTime : '',
      departureRemarks : '',
      returnOrigin : '',
      returnDestination : '',
      returnDate : '',
      returnTime : '',
      returnRemarks : '',
      rejectedRemarks : '',
      flightMode : '',
      purposeName : '',
      approvalArray : [
        {
             "id": 1,
             "name": {
                 "first": "APPIAN",
                 "middle": "DEVELOPER",
                 "last": "TESTER"
             },
             "travelRequest": [
                 {
                     "id": 17,
                     "referenceNumber": "TR20181029105938",
                     "purpose": {
                         "id": 1,
                         "name": "Business Meeting"
                     },
                     "status": {
                         "id": 2,
                         "name": "For Approval"
                     },
                     "remarks": null,
                     "departure": {
                         "origin": {
                             "id": 2000,
                             "areaCode": "DNE",
                             "airport": "Dallas North Airport",
                             "location": "Dallas, United States"
                         },
                         "destination": {
                             "id": 4820,
                             "areaCode": "LXU",
                             "airport": "Lukulu",
                             "location": "Lukulu, Zambia"
                         },
                         "date": "2019-01-26",
                         "time": "13:00",
                         "remarks": "Going for Breakfast"
                     },
                     "return": {
                         "origin": {
                             "id": 4820,
                             "areaCode": "LXU",
                             "airport": "Lukulu",
                             "location": "Lukulu, Zambia"
                         },
                         "destination": {
                             "id": 2000,
                             "areaCode": "DNE",
                             "airport": "Dallas North Airport",
                             "location": "Dallas, United States"
                         },
                         "date": "2019-01-26",
                         "time": "20:00",
                         "remarks": "Going for Dinner"
                     },
                     "liquidation": {
                         "cost": 2000,
                         "serviceCharge": 500,
                         "VAT": null,
                         "isTicketUsed": "",
                         "reason": ""
                     }
                 }
             ]
         }
      ]
    }
  }

  componentDidMount() {
    // this.presenter.getApproval()
  }

  getApproval(approvalArray) {
    this.setState({ approvalArray })
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
    this.props.history.push('/mytravel/travel')
  }

  noticeResponse (noticeResponse) {
    this.setState({
      noticeResponse,
      showNoticeResponseModal : true
    })
  }

  resetValue () {
    this.setState({
      requestId : '',
      rejectedRemarks : '',
      showRejectRemarksModal : false
    })
  }

  render () {
    const {
      enabledLoader,
      submitLoader,
      showNoticeResponseModal,
      showRejectRemarksModal,
      noticeResponse,
      approvalArray,
      requestId,
      firstName,
      middleName,
      lastName,
      referenceNumber,
      departureOrigin,
      departureDestination,
      departureDate,
      departureTime,
      departureRemarks,
      returnOrigin,
      returnDestination,
      returnDate,
      returnTime,
      returnRemarks,
      rejectedRemarks,
      flightMode,
      purposeName,
      showForm
    } = this.state

    const { percentage } = this.props
    return (
      <div>
        { super.render() }
        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false, showForm : false })
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
        <div>
          <i
          className={ 'back-arrow' }
          onClick={ () => this.navigate() }>
          </i>
        </div>
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'font-size-30px text-align-left' }>Travel Approvals</h2>
            <br/>
            <h4>Below are the list travels for approval.</h4>
          </div>
        </div>
        <br/>
        <br/>
        <Line />
        <br/>
        {
          showForm ?
          <ApprovalFormComponent
          requestId = { requestId }
          firstName = { firstName }
          middleName = { middleName }
          lastName = { lastName }
          referenceNumber = { referenceNumber }
          departureOrigin = { departureOrigin }
          departureDestination = { departureDestination }
          departureDate = { departureDate }
          departureTime = { departureTime }
          departureRemarks = { departureRemarks }
          returnOrigin = { returnOrigin }
          returnDestination = { returnDestination }
          returnDate = { returnDate }
          returnTime = { returnTime }
          showRejectRemarksModal = { showRejectRemarksModal }
          showRejectRemarksFunc = { () => this.setState({ showRejectRemarksModal : true }) }
          onClose = { () => this.setState({ showRejectRemarksModal : false }) }
          rejectedRemarks = { rejectedRemarks }
          rejectedRemarksFunc = { (rejectedRemarks) =>
            this.setState({ rejectedRemarks }) }
          returnRemarks = { returnRemarks }
          flightMode = { flightMode }
          purposeName = { purposeName }
          submit = { (requestId, isApprove, rejectedRemarks) =>
            this.submit(requestId, isApprove, rejectedRemarks) }
          />
        :
            enabledLoader ?
              <center>
                <CircularLoader show = { enabledLoader }/>
              </center>
            :
              approvalArray.length !==0 ?
                <ApprovalComponent
                  cardDataHolder = { approvalArray }
                  showFormFunc = { (
                    requestId,
                    firstName,
                    middleName,
                    lastName,
                    referenceNumber,
                    departureOrigin,
                    departureDestination,
                    departureDate,
                    departureTime,
                    departureRemarks,
                    returnOrigin,
                    returnDestination,
                    returnDate,
                    returnTime,
                    returnRemarks,
                    flightMode,
                    purposeName
                  ) => this.setState({
                    requestId,
                    firstName,
                    middleName,
                    lastName,
                    referenceNumber,
                    departureOrigin,
                    departureDestination,
                    departureDate,
                    departureTime,
                    departureRemarks,
                    returnOrigin,
                    returnDestination,
                    returnDate,
                    returnTime,
                    returnRemarks,
                    flightMode,
                    purposeName,
                    showForm : true
                  })
                }/>
              :
              <center>
                <h2>No records</h2>
              </center>
            }
      </div>
    )
  }
}

ApprovalFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(ApprovalFragment, Presenter )
