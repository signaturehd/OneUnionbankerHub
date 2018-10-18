import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/RequestFlightPresenter'

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

import RequestFlightComponent from './components/RequestFlightComponent'
import AreaModal from './../AreaModal'

import { format } from '../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/request.css'

class RequestFlightFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showRequestModal : false,
      showAreaModal : false,
      showPurposeModal : false,
      origin : false,
      rturn : false,
      typeOfFlight : '',
      purposeId : '',
      purposeName : '',
      departureOriginId : '',
      departureOrigin : '',
      departureDestinationId : '',
      departureDestination : '',
      departureDate : '',
      departureTime : '',
      departureRemarks : '',
      returnOriginId : '',
      returnOrigin : '',
      returnDestinationId : '',
      returnDestination : '',
      returnDate : '',
      returnTime : '',
      returnRemarks : '',
      pageNumber : 1,
      findArea : '',
      areaArray : [],
      purposeArray : [
        {
          id : 1,
          name : 'Business Meeting'
        },
        {
          id : 2,
          name : 'Training'
        }
      ],
      requestFlightArray : [
          {
            "id": 1,
            "referenceNumber": "TR20181003160949",
            "purpose": {
                "id": 2,
                "purpose": "ROUND-TRIP"
            },
            "status": {
                "id": 1,
                "status": "Submitted"
            },
            "remark": "",
            "approvedBy": null,
            "approvedDate": null,
            "applicationDate": "2018-10-10",
            "departure": {
                "origin": {
                    "id": 1,
                    "areaCode": "ZMH",
                    "airport": "108 Mile Ranch",
                    "location": "108 Mile Ranch, Canada"
                },
                "destination": {
                    "id": 2,
                    "areaCode": "AAH",
                    "airport": "Aachen/Merzbruck",
                    "location": "Aachen, Germany"
                },
                "date": "2019-01-26",
                "time": "13:00:00",
                "remarks": null
            },
            "return": {
                "origin": {
                    "id": 2,
                    "areaCode": "AAH",
                    "airport": "Aachen/Merzbruck",
                    "location": "Aachen, Germany"
                },
                "destination": {
                    "id": 1,
                    "areaCode": "ZMH",
                    "airport": "108 Mile Ranch",
                    "location": "108 Mile Ranch, Canada"
                },
                "date": "2019-01-28",
                "time": "13:00:00",
                "remarks": null
            },
            "liquidation": {
                "id": 1,
                "cost": 2000,
                "serviceCharge": 500,
                "isTicketUsed": null,
                "reason": ""
            }
        },
        {
            "id": 2,
            "referenceNumber": "TR20181003160949",
            "purpose": {
                "id": 2,
                "purpose": "ONE-WAY"
            },
            "status": {
                "id": 1,
                "status": "Submitted"
            },
            "remark": "",
            "approvedBy": null,
            "approvedDate": null,
            "applicationDate": "2018-10-10",
            "departure": {
                "origin": {
                    "id": 1,
                    "areaCode": "ZMH",
                    "airport": "108 Mile Ranch",
                    "location": "108 Mile Ranch, Canada"
                },
                "destination": {
                    "id": 2,
                    "areaCode": "AAH",
                    "airport": "Aachen/Merzbruck",
                    "location": "Aachen, Germany"
                },
                "date": "2019-01-26",
                "time": "13:00:00",
                "remarks": null
            },
            "liquidation": {
                "id": 1,
                "cost": 2000,
                "serviceCharge": 500,
                "isTicketUsed": null,
                "reason": ""
            }
        }
      ]
    }
  }

  componentDidMount() {
    this.presenter.getAreaData()
  }

  departureOriginFunc (departureOrigin) {
    this.setState({ departureOrigin })
  }

  departureDestinationFunc (departureDestination) {
    this.setState({ departureDestination })
  }

  departureDateFunc (date) {
    this.setState({ departureDate : date.format('MM-DD-YYYY') })
  }

  departureTimeFunc (time) {
    this.setState({ departureTime : time })
  }

  departureRemarksFunc (departureRemarks) {
    this.setState({ departureRemarks })
  }

  returnOriginFunc (returnOrigin) {
    this.setState({ returnOrigin })
  }

  returnDestinationFunc (returnDestination) {
    this.setState({ returnDestination })
  }

  returnDateFunc (date) {
    this.setState({ returnDate : date.format('MM-DD-YYYY') })
  }

  returnTimeFunc (time) {
    this.setState({ returnTime : time })
  }

  returnRemarksFunc (returnRemarks) {
    this.setState({ returnRemarks })
  }

  getAreaData(areaArray) {
    this.setState({ areaArray })
  }

  resetValue () {
    this.setState({ typeOfFlight : '' })
    this.setState({ purposeId : '' })
    this.setState({ purposeName : '' })
    this.setState({ departureOriginId : '' })
    this.setState({ departureDestinationId : '' })
    this.setState({ departureOrigin : '' })
    this.setState({ departureDestination : '' })
    this.setState({ departureDate : '' })
    this.setState({ departureTime : '' })
    this.setState({ departureRemarks : '' })
    this.setState({ returnOriginId : '' })
    this.setState({ returnDestinationId : '' })
    this.setState({ returnOrigin : '' })
    this.setState({ returnDestination : '' })
    this.setState({ returnDate : '' })
    this.setState({ returnTime : '' })
    this.setState({ returnRemarks : '' })
    this.setState({ pageNumber : 1 })
    this.setState({ findArea : '' })
  }

  setAreaFunc(areaId, areaName) {
    const { origin, rturn } = this.state
    if(rturn) {
      origin ?
      this.setState({
        returnOriginId : areaId,
        returnOrigin : areaName,
        showAreaModal : false
      })
      :
      this.setState({
        returnDestinationId : areaId,
        returnDestination : areaName,
        showAreaModal : false
      })
    }
    else {
      origin ?
      this.setState({
        departureOriginId : areaId,
        departureOrigin : areaName,
        showAreaModal : false
      })
      :
      this.setState({
        departureDestinationId : areaId,
        departureDestination : areaName,
        showAreaModal : false
      })
    }
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  render () {
    const {
      enabledLoader,
      showRequestModal,
      showAreaModal,
      showPurposeModal,
      origin,
      rturn,
      typeOfFlight,
      purposeId,
      purposeName,
      departureOriginId,
      departureOrigin,
      departureDestinationId,
      departureDestination,
      departureDate,
      departureTime,
      departureRemarks,
      returnOriginId,
      returnOrigin,
      returnDestinationId,
      returnDestination,
      returnDate,
      returnTime,
      returnRemarks,
      pageNumber,
      findArea,
      requestFlightArray,
      purposeArray,
      areaArray
    } = this.state

    const { percentage } = this.props
    return (
      <div>
        { super.render() }
        {
          showRequestModal &&
          <Modal
          isDismisable = { true }
          onClose = { () => this.setState({ showRequestModal : false }) }>
            <h2 className = { 'font-size-18px font-weight-bold text-align-center' }>Type of Flight</h2>
            <h2 className = { 'font-size-16px font-weight-lighter text-align-center' }>Did you want to fly one way or round trip?</h2>
            <br/>
            <div className = { 'request-grid-option' }>
              <GenericButton
                text = { 'One Way' }
                onClick = { () => this.setState({ typeOfFlight : 'One Way', showRequestModal : false }) }
              />
              <GenericButton
                  text = { 'RoundTrip' }
                  onClick = { () => this.setState({ typeOfFlight : 'RoundTrip', showRequestModal : false }) }
                />
            </div>
          </Modal>
        }
        {
          typeOfFlight &&
          <Modal
          isDismisable = { true }
          onClose = { () => this.resetValue() }>
            <div>
              {
                showPurposeModal &&
                <SingleInputModal
                  label = { 'Select the purpose of your travel.' }
                  inputArray = { purposeArray }
                  selectedArray = { (purposeId, purposeName) => {
                      this.setState({
                        purposeId,
                        purposeName,
                        showPurposeModal : false
                        })
                    }
                  }
                  onClose = { () => this.setState({ showPurposeModal : false }) }
                />
              }
              {
                showAreaModal &&
                <AreaModal
                  enabledLoader = { enabledLoader }
                  label = { 'School' }
                  pageNumber = { pageNumber }
                  previousSchoolPageNumberFunc = { () => {
                      this.setState({ pageNumber : pageNumber - 1 })
                      this.presenter.getAreaData(pageNumber)
                    }
                  }
                  schoolFindFunc = { (resp) => {
                      this.setState({ findArea : resp })
                      this.presenter.getAreaData(pageNumber, findArea)
                    }
                  }
                  findFunc = { (resp) => FindFunc (resp) }
                  inputArray = { areaArray }
                  selectedArray = { (areaId, areaName) =>
                    this.setAreaFunc(areaId, areaName)
                  }
                  onClose = { () => this.setState({ showAreaModal : false }) }
                  />
              }
              <h2 className = { 'font-size-18px font-weight-bold text-align-center' }>Select your departing flight details.</h2>
              <br/>
              <GenericInput
                text = { 'Purpose' }
                value = { purposeName }
                onClick = { () => this.setState({ showPurposeModal : true }) }
              />
              <div className = { 'request-grid-option' }>
                <GenericInput
                  text = { 'Origin' }
                  value = { departureOrigin }
                  onClick = { () => this.setState({ showAreaModal : true, origin : true, rturn : false }) }
                />
                <GenericInput
                  text = { 'Destination' }
                  value = { departureDestination }
                  onClick = { () => this.setState({ showAreaModal : true, origin : true, rturn : false}) }
                />
              </div>
              <div className = { 'request-grid-option' }>
                <DatePicker
                  text = { 'Preferred Date of Departure' }
                  selected = { departureDate && moment(departureDate) }
                  onChange = { (e) => this.departureDateFunc(e) }
                />
                <GenericInput
                  text = { 'Preferred Time' }
                  type = { 'time' }
                  value = { departureTime }
                  onChange = { (e) => this.departureTimeFunc(e.target.value) }
                />
              </div>
              <GenericInput
                text = { 'Remarks' }
                value = { departureRemarks }
                onChange = { (e) => this.departureRemarksFunc(e.target.value) }
              />
            </div>
            {
              typeOfFlight === 'RoundTrip' &&
              <div>
                <h2 className = { 'font-size-18px font-weight-bold text-align-center' }>Select your return flight details.</h2>
                <br/>
                <div className = { 'request-grid-option' }>
                  <GenericInput
                    text = { 'Origin' }
                    value = { returnOrigin }
                    onClick = { () => this.setState({ showAreaModal : true, origin : true, rturn : true}) }
                  />
                  <GenericInput
                    text = { 'Destination' }
                    value = { returnDestination }
                    onClick = { () => this.setState({ showAreaModal : true, origin : false, rturn : true}) }
                  />
                </div>
                <div className = { 'request-grid-option' }>
                  <DatePicker
                    readOnly
                    text = { 'Preferred Date of Departure' }
                    selected = { returnDate && moment(returnDate) }
                    onChange = { (e) => this.returnDateFunc(e) }
                  />
                  <GenericInput
                    text = { 'Preferred Time' }
                    type = { 'time' }
                    value = { returnTime }
                    onChange = { (e) => this.returnTimeFunc(e.target.value) }
                  />
                </div>
                <GenericInput
                  text = { 'Remarks' }
                  value = { returnRemarks }
                  onChange = { (e) => this.returnRemarksFunc(e.target.value) }
                />
              </div>
            }
            <div className = { 'text-align-center' }>
              <GenericButton
                text = { 'Continue' }
              />
            </div>
          </Modal>
        }
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'font-size-30px text-align-left' }>List of Request Flights</h2>
            <br/>
            <h4>Below are the list of your requests flights</h4>
          </div>
        </div>
        <br/>
        <br/>
        <Line />
        <br/>
            {
              enabledLoader ?
              <center>
                <CircularLoader show = { enabledLoader }/>
              </center>
              :
              requestFlightArray.length !==0 &&
                <RequestFlightComponent
                  cardDataHolder = { requestFlightArray }/>
            }

            <FloatingActionButton
              text="+"
              onClick={ () => this.setState({ showRequestModal : true })
              }
            />
      </div>
    )
  }
}

RequestFlightFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(RequestFlightFragment, Presenter )
