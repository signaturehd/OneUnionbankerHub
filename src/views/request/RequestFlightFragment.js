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
import AreaModal from './modal/AreaModal'

import ResponseModal from '../notice/NoticeResponseModal'

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
      showNoticeResponseModal : false,
      areaSwitch : 0,
      noticeResponse : '',
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
      requestFlightArray : []
    }
  }

  componentDidMount() {
    this.presenter.getAreaData(this.state.pageNumber, this.state.findArea)
    this.presenter.getTravels()
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

  departureTimeFunc (departureTime) {
    this.setState({ departureTime })
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

  returnTimeFunc (returnTime) {
    this.setState({ returnTime })
  }

  returnRemarksFunc (returnRemarks) {
    this.setState({ returnRemarks })
  }

  getAreaData(areaArray) {
    this.setState({ areaArray })
  }

  getTravels(requestFlightArray) {
    this.setState({ requestFlightArray })
  }

  noticeResponse (noticeResponse) {
    this.setState({ noticeResponse, showNoticeResponseModal : true })
  }

  submit () {
    const {
      purposeId,
      departureOriginId,
      departureDestinationId,
      departureDate,
      departureTime,
      departureRemarks,
      returnOriginId,
      returnDestinationId,
      returnDate,
      returnTime,
      returnRemarks,
      typeOfFlight
    } = this.state

    this.presenter.addRequestFlight(
      purposeId,
      departureOriginId,
      departureDestinationId,
      departureDate,
      departureTime,
      departureRemarks,
      returnOriginId,
      returnDestinationId,
      returnDate,
      returnTime,
      returnRemarks,
      typeOfFlight
    )
  }

  resetValue () {
    this.setState({
      typeOfFlight : '',
      purposeId : '',
      purposeName : '',
      departureOriginId : '',
      departureDestinationId : '',
      departureOrigin : '',
      departureDestination : '',
      departureDate : '',
      departureTime : '',
      departureRemarks : '',
      returnOriginId : '',
      returnDestinationId : '',
      returnOrigin : '',
      returnDestination : '',
      returnDate : '',
      returnTime : '',
      returnRemarks : '',
      pageNumber : 1,
      findArea : ''
    })
  }

  setAreaFunc(areaId, areaName) {
    const { areaSwitch } = this.state
    if(areaSwitch === 1) {
      this.setState({
        departureOriginId : areaId,
        departureOrigin : areaName,
        showAreaModal : false
      })
    } else if(areaSwitch === 2) {
      this.setState({
        departureDestinationId : areaId,
        departureDestination : areaName,
        showAreaModal : false
      })
    } else if(areaSwitch === 3) {
      this.setState({
        returnOriginId : areaId,
        returnOrigin : areaName,
        showAreaModal : false
      })
    } else if(areaSwitch === 4) {
      this.setState({
        returnDestinationId : areaId,
        returnDestination : areaName,
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
      showNoticeResponseModal,
      noticeResponse,
      areaSwitch,
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
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false })
            }}
            noticeResponse={ noticeResponse }
          />
        }
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
                  label = { 'Area' }
                  pageNumber = { pageNumber }
                  nextPageNumberFunc = { (resp) => {
                      this.setState({ pageNumber : pageNumber + 1 })
                      this.presenter.getAreaData(resp, findArea)
                    }
                  }
                  previousPageNumberFunc = { (resp) => {
                      this.setState({ pageNumber : pageNumber - 1 })
                      this.presenter.getAreaData(resp, findArea)
                    }
                  }
                  findFunc = { (resp) => {
                      this.setState({ findArea : resp })
                      this.presenter.getAreaData(pageNumber, resp)
                    }
                  }
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
                  onClick = { () => this.setState({ showAreaModal : true, areaSwitch : 1, rturn : false }) }
                />
                <GenericInput
                  text = { 'Destination' }
                  value = { departureDestination }
                  onClick = { () => this.setState({ showAreaModal : true, areaSwitch : 2, rturn : true}) }
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
                    onClick = { () => this.setState({ showAreaModal : true, areaSwitch : 3, rturn : true}) }
                  />
                  <GenericInput
                    text = { 'Destination' }
                    value = { returnDestination }
                    onClick = { () => this.setState({ showAreaModal : true, areaSwitch : 4, rturn : true}) }
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
                onClick = { () => {
                    this.setState({ showRequestModal : false })
                    this.submit()
                  }
                }
              />
            </div>
          </Modal>
        }
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'font-size-30px text-align-left' }>Flight Requests</h2>
            <br/>
            <h4>Below are the list of your requested flights</h4>
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
              requestFlightArray.length !==0 ?
                <RequestFlightComponent
                  cardDataHolder = { requestFlightArray }/>
                  :
                  <center>
                    <h2>No records</h2>
                  </center>
            }

            <FloatingActionButton
              image = { true }
              onClick = { () => this.setState({ showRequestModal : true })
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
