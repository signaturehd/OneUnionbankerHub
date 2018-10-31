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
import RequestFlightFormComponent from './components/RequestFlightFormComponent'
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
      submitLoader : false,
      showRequestModal : false,
      showAreaModal : false,
      showPurposeModal : false,
      showNoticeResponseModal : false,
      showDepartureTime : false,
      showReturnTime : false,
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
      departureTimeId : '',
      departureTime : '',
      departureRemarks : '',
      returnOriginId : '',
      returnOrigin : '',
      returnDestinationId : '',
      returnDestination : '',
      returnDate : '',
      returnTimeId : '',
      returnTime : '',
      returnRemarks : '',
      pageNumber : 1,
      findArea : '',
      timeArray : [
        { id: 1, name: 'Morning' },
        { id: 2, name: 'Afternoon' },
        { id: 3, name: 'Evening' }
      ],
      areaArray : [],
      purposeArray : [
        { id: 1, name: 'Business Meeting' },
        { id: 2, name: 'Training' }
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

  hideSubmitLoader () {
    this.setState({ submitLoader : false })
  }

  showSubmitLoader () {
    this.setState({ submitLoader : true })
  }

  navigate () {
    this.props.history.push('/mytravel/travel')
  }

  render () {
    const {
      enabledLoader,
      submitLoader,
      showRequestModal,
      showAreaModal,
      showPurposeModal,
      showNoticeResponseModal,
      noticeResponse,
      areaSwitch,
      typeOfFlight,
      showDepartureTime,
      showReturnTime,
      purposeId,
      purposeName,
      departureOriginId,
      departureOrigin,
      departureDestinationId,
      departureDestination,
      departureDate,
      departureTimeId,
      departureTime,
      departureRemarks,
      returnOriginId,
      returnOrigin,
      returnDestinationId,
      returnDestination,
      returnDate,
      returnTimeId,
      returnTime,
      returnRemarks,
      pageNumber,
      findArea,
      timeArray,
      requestFlightArray,
      purposeArray,
      areaArray
    } = this.state

    const { percentage } = this.props
    return (
      <div>
        { super.render() }
        {
          submitLoader ?
          <Modal>
            <center>
              <CircularLoader show = { submitLoader }/>
            </center>
          </Modal>
          :
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
          typeOfFlight ?
          <div>
          <i
            className={ 'back-arrow' }
            onClick={ () => this.setState({ typeOfFlight : '' }) }>
          </i>
          <RequestFlightFormComponent
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
            showAreaModal = { showAreaModal }
            onCloseAreaModal = { () => this.setState({ showAreaModal : false }) }
            showPurposeModal = { showPurposeModal }
            showPurposeModalFunc = { () => this.setState({ showPurposeModal : true }) }
            onClosePurposeModal = { () => this.setState({ showPurposeModal : false }) }
            typeOfFlight = { typeOfFlight }
            purposeId = { purposeId }
            purposeName = { purposeName }
            purposeFunc = { (purposeId, purposeName) => this.setState({
                purposeId,
                purposeName,
                showPurposeModal : false
              })
            }
            departureOriginId = { departureOriginId }
            departureOrigin = { departureOrigin }
            departureOriginFunc = { () => this.setState({ showAreaModal : true, areaSwitch : 1 }) }
            setAreaFunc = { (areaId, areaName) => this.setAreaFunc(areaId, areaName) }
            departureDestinationId = { departureDestinationId }
            departureDestination = { departureDestination }
            departureDestinationFunc = { () => this.setState({ showAreaModal : true, areaSwitch : 2 }) }
            departureDate = { departureDate }
            departureDateFunc = { (e) => this.departureDateFunc(e) }
            departureTimeId = { departureTimeId }
            departureTime = { departureTime }
            showDepartureTime = { showDepartureTime }
            showDepartureTimeFunc = { () => this.setState({ showDepartureTime : true }) }
            departureTimeFunc = { (departureTimeId, departureTime) => this.setState({
              departureTimeId,
              departureTime,
              showDepartureTime: false })
            }
            departureRemarks = { departureRemarks }
            returnOriginId = { returnOriginId }
            returnOrigin = { returnOrigin }
            returnDestinationId = { returnDestinationId }
            returnDestination = { returnDestination }
            returnDate = { returnDate }
            returnTimeId = { returnTimeId }
            returnTime = { returnTime }
            returnRemarks = { returnRemarks }
            pageNumber = { pageNumber }
            findArea = { findArea }
            timeArray = { timeArray }
            requestFlightArray = { requestFlightArray }
            purposeArray = { purposeArray }
            areaArray = { areaArray }
          />
          </div>
          :
          <div className = { 'percentage-grid' }>
            <div>
            <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
            </i>
            <br/>
            <br/>
            <h2 className={ 'font-size-30px text-align-left' }>Flight Requests</h2>
              <br/>
              <h4>Below are the list of your requested flights</h4>
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
                cardDataHolder = { requestFlightArray }
                />
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
      }
      </div>
    )
  }
}

RequestFlightFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(RequestFlightFragment, Presenter )
