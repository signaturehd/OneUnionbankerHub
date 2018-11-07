import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/BookFlightPresenter'

import {
  GenericButton,
  GenericInput,
  CircularLoader,
  MultipleAttachments,
  DatePicker,
  Modal,
  Card,
  Line,
} from '../../ub-components/'

import BookFlightComponent from './components/BookFlightComponent'
import BookFlightFormComponent from './components/BookFlightFormComponent'
import ResponseModal from '../notice/NoticeResponseModal'

import { Progress } from 'react-sweet-progress'
import './styles/bookStyles.css'
import { format } from '../../utils/numberUtils'
import moment from 'moment'

class BookFlightFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      submitLoader : false,
      showNoticeResponseModal : false,
      showTicketModal : false,
      showForm: false,
      ticketMode : false,
      isDomestic : false,
      noticeResponse : '',
      requestId : '',
      purposeName : '',
      departureOrigin : '',
      departureDestination : '',
      returnOrigin : '',
      returnDestination : '',
      rturn : '',
      departureDate : '',
      departureTime : '',
      returnDate : '',
      returnTime : '',
      totalCostOfFlight : '0',
      totalServiceCharge : '0',
      valueAddedTax : '0',
      bookflightArray : [
        {
            "id": 1,
            "referenceNumber": "TR20181026111414",
            "purpose": {
                "id": 2,
                "name": "Training"
            },
            "status": {
                "id": 3,
                "status": "For Liquidation"
            },
            "remark": "",
            "approvedBy": "Unionbanker9602232 Surname",
            "approvedDate": "2018-10-29",
            "applicationDate": "2018-10-26",
            "departure": {
                "origin": {
                    "id": 2000,
                    "areaCode": "DNE",
                    "airport": "Dallas North Airport",
                    "location": "Dallas, United States",
                    "isDomestic": false
                },
                "destination": {
                    "id": 4820,
                    "areaCode": "LXU",
                    "airport": "Lukulu",
                    "location": "Lukulu, Zambia",
                    "isDomestic": false
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
                    "location": "Lukulu, Zambia",
                    "isDomestic": false
                },
                "destination": {
                    "id": 2000,
                    "areaCode": "DNE",
                    "airport": "Dallas North Airport",
                    "location": "Dallas, United States",
                    "isDomestic": false
                },
                "date": "2019-01-26",
                "time": "20:00",
                "remarks": "Going for Breakfast"
            },
            "liquidation": {
                "id": 1,
                "cost": 2000,
                "serviceCharge": 500,
                "vat": 1,
                "isTicketUsed": true,
                "reason": ""
            }
        }
      ],
      attachmentsData : [{ name : 'Flight Quatation Attachment' }],
      attachmentsData2 : [{ name : 'Flight Quatation Attachment' },
      { name : 'ERB Email Attachment' }]
    }
  }

  componentDidMount() {
    // this.presenter.getTravels()
  }

  getTravels(bookflightArray) {
    this.setState({ bookflightArray })
  }

  departureTimeFunc (departureTime) {
    this.setState({ departureTime })
  }

  returnTimeFunc (returnTime) {
    this.setState({ returnTime })
  }

  // totalAmountFunc(totalAmount) {
  //   this.setState({ totalAmount })
  // }

  totalCostOfFlightFunc(totalCostOfFlight) {
    this.setState({ totalCostOfFlight })
  }

  totalServiceChargeFunc(totalServiceCharge) {
    this.setState({ totalServiceCharge })
  }

  valueAddedTaxFunc(valueAddedTax) {
    this.setState({ valueAddedTax })
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

  noticeResponse (noticeResponse) {
    this.setState({
      noticeResponse,
      showNoticeResponseModal : true,
      showForm : false
    })
  }

  resetValue () {
    this.setState({
      requestId : '',
      totalCostOfFlight : '',
      totalServiceCharge : '',
      departureTime : '',
      returnTime : '',
      isDomestic : '',
      attachmentsData : [{ name : 'Flight Quatation Attachment' }],
      attachmentsData2 : [{ name : 'Flight Quatation Attachment' },
      { name : 'ERB Email Attachment' }]
    })
  }

  submit () {
    const {
      requestId,
      totalCostOfFlight,
      totalServiceCharge,
      departureTime,
      returnTime,
      isDomestic,
      valueAddedTax,
      attachmentsData,
      attachmentsData2
    } = this.state

    isDomestic ?
    this.presenter.addBookFlight(
      requestId,
      totalCostOfFlight,
      totalServiceCharge,
      departureTime,
      returnTime,
      valueAddedTax,
      attachmentsData
    )
    :
    this.presenter.addBookFlight(
      requestId,
      totalCostOfFlight,
      totalServiceCharge,
      departureTime,
      returnTime,
      valueAddedTax,
      attachmentsData2
    )
  }

  navigate () {
    this.props.history.push('/mytravel/travel')
  }

  render () {
    const {
      enabledLoader,
      submitLoader,
      showTicketModal,
      showForm,
      showNoticeResponseModal,
      noticeResponse,
      ticketMode,
      isDomestic,
      departureOrigin,
      departureDestination,
      returnOrigin,
      returnDestination,
      requestId,
      purposeName,
      rturn,
      departureDate,
      departureTime,
      returnDate,
      returnTime,
      totalCostOfFlight,
      totalServiceCharge,
      valueAddedTax,
      bookflightArray,
      attachmentsData,
      attachmentsData2
    } = this.state

    const { percentage } = this.props
    const depDate = moment(departureDate).format('MMMM DD, YYYY')
    const retDate = moment(returnDate).format('MMMM DD, YYYY')
    const totalAmount = (parseFloat(totalCostOfFlight) + parseFloat(totalServiceCharge) + parseFloat(valueAddedTax))
    return (
      <div>
        {
          submitLoader ?
          <Modal>
            <center>
              <h2>Please wait...</h2>
              <CircularLoader show = { submitLoader }/>
            </center>
          </Modal>
          :
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false, showForm : false })
            }}
            noticeResponse={ noticeResponse }
          />
        }
        <i
          className={ 'back-arrow' }
          onClick={ () => this.navigate() }>
        </i>
        <br/>
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'font-size-30px text-align-left' }>List of Booked Flights</h2>
            <br/>
            <h4>Below are the list of your booked flights.</h4>
          </div>
        </div>
        <br/>
        <br/>
        <Line />
        <br/>
        {
          showForm ?
          <BookFlightFormComponent
            showTicketModal = { showTicketModal }
            showNoticeResponseModal = { showNoticeResponseModal }
            noticeResponse = { noticeResponse }
            ticketMode = { ticketMode }
            isDomestic = { isDomestic }
            departureOrigin = { departureOrigin }
            departureDestination = { departureDestination }
            returnOrigin = { returnOrigin }
            returnDestination = { returnDestination }
            requestId = { requestId }
            purposeName = { purposeName }
            rturn = { rturn }
            departureDate = { depDate }
            departureTime = { departureTime }
            returnDate = { retDate }
            returnTime = { returnTime }
            totalCostOfFlight = { totalCostOfFlight }
            totalServiceCharge = { totalServiceCharge }
            valueAddedTax = {valueAddedTax }
            totalAmount = { totalAmount }
            bookflightArray = { bookflightArray }
            attachmentsData = { attachmentsData }
            attachmentsData2 = { attachmentsData2 }
            submitFunc = { () => this.submit() }
          />
          :
          enabledLoader ?
          <center>
            <CircularLoader show = { enabledLoader }/>
          </center>
          :
          bookflightArray.length !==0 ?
            <BookFlightComponent
              showFormFunc = { (
                requestId,
                departureOrigin,
                departureDestination,
                departureDate,
                departureTime,
                returnOrigin,
                returnDestination,
                returnDate,
                returnTime,
                rturn,
                purposeName,
                totalCostOfFlight,
                totalServiceCharge,
                valueAddedTax,
                isDomestic
              ) => this.setState({
                requestId,
                departureOrigin,
                departureDestination,
                departureDate,
                departureTime,
                returnOrigin,
                returnDestination,
                returnDate,
                returnTime,
                rturn,
                purposeName,
                totalCostOfFlight,
                totalServiceCharge,
                valueAddedTax,
                isDomestic,
                showForm : true }) }
              cardDataHolder = { bookflightArray }/>
              :
              <center>
                <h2>No records</h2>
              </center>
        }
      </div>
    )
  }
}

BookFlightFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(BookFlightFragment, Presenter )
