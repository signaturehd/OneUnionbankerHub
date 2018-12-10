import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/LiquidationPresenter'

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

import LiquidationComponent from './components/LiquidationComponent'
import LiquidationFormComponent from './components/LiquidationFormComponent'
import ResponseModal from '../notice/NoticeResponseModal'

import { Progress } from 'react-sweet-progress'
import './styles/liquidation.css'
import moment from 'moment'

import * as controller from './functions/LiquidationFunctions.js'

class LiquidationFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showTicketModal : false,
      showFormModal: false,
      showNoticeResponseModal : false,
      ticketMode : 0,
      noticeResponse : '',
      requestId : '',
      isDomestic  : '',
      dateFlight : '',
      preferredDate : '',
      costTicket : '',
      costServiceCharge : '',
      whyTicketUsed : '',
      departureOrigin  : '',
      returnOrigin   : '',
      departureDestination  : '',
      rturn  : '',
      returnDate  : '',
      departureDate  : '',
      departureTime  : '',
      returnTime  : '',
      purposeName : '',
      returnDestination  : '',
      totalCostOfFlight : '',
      totalServiceCharge  : '',
      totalAmount   : '',
      valueAddedTax  : '',

      liquidationId : '',
      liquidationCost : '',
      liquidationServiceCharge : '',
      liquidationReason : '',
      liquidationVAT : '',
      liquidationArray : [],
      orDate : '',
      orNumber: '',
      orDate : '',
      ticketReasons : '',
      attachmentsData : [{ name : 'Flight Quatation Attachment' },
      { name : 'ERB Email Attachment' }]
    }
  }

  componentDidMount() {
    this.presenter.getTravels()
  }

  getTravels(liquidationArray) {
    this.setState({ liquidationArray })
  }

  dateFlightFunc (dateFlight) {
    this.setState({ dateFlight })
  }

  preferredDateFunc (preferredDate) {
    this.setState({ preferredDate })
  }

  costTicketFunc (costTicket) {
    this.setState({ costTicket })
  }

  costServiceChargeFunc (costServiceCharge) {
    this.setState({ costServiceCharge })
  }

  orNumberFunc (e) {
    const regex = controller.checkNotSymbol(e)
    this.setState({ orNumber :  regex })
  }

  ticketReasonsFunc (e) {
    const regex = controller.checkNotSymbol(e)
    this.setState({ ticketReasons :  regex })
  }

  orDateFunc (orDate) {
    this.setState({ orDate })
  }

  whyTicketUsedFunc (whyTicketUsed) {
    this.setState({ whyTicketUsed })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  noticeResponse (noticeResponse) {
    this.setState({
      noticeResponse,
      showNoticeResponseModal : true,
      showFormModal : false
    })
  }

  submit () {
    const {
      requestId,
      ticketMode,
      whyTicketUsed,
      attachmentsData
    } = this.state

    this.presenter.addLiquidation(
      requestId,
      ticketMode,
      whyTicketUsed,
      attachmentsData
    )
  }

  navigate () {
    this.props.history.push('/mytravel/travel')
  }

  render () {
    const {
      enabledLoader,
      showTicketModal,
      showFormModal,
      showNoticeResponseModal,
      noticeResponse,
      ticketMode,
      dateFlight,
      preferredDate,
      costTicket,
      costServiceCharge,
      whyTicketUsed,

      liquidationArray,
      attachmentsData,
      requestId,
      liquidationId,
      liquidationCost,
      liquidationServiceCharge,
      liquidationReason,
      liquidationVAT,
      orDate,
      orNumber,
      ticketReasons,

      isDomestic,
      departureOrigin,
      departureDestination,
      returnOrigin,
      returnDestination,
      returnDate,
      purposeName,
      rturn ,
      departureDate,
      departureTime,
      returnTime,
    } = this.state

    const { percentage } = this.props

    return (
      <div className = { 'default-body-grid' }>
        <div></div>
        <div>
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
            showTicketModal &&
            <Modal
            isDismisable = { true }
            onClose = { () => this.setState({ showTicketModal : false }) }>
              <h2 className = { 'font-size-16px font-weight-bold text-align-center' }>Was the ticket used?</h2>
              <br/>
              <div className = { 'grid-global' }>
                <GenericButton
                  text = { 'No' }
                  onClick = { () => this.setState({
                    ticketMode : 0,
                    showFormModal : true,
                    showTicketModal : false })
                  }
                />
                <GenericButton
                    text = { 'Yes' }
                    onClick = { () => this.setState({
                      ticketMode : 1,
                      showFormModal : true,
                      showTicketModal : false })
                    }
                  />
              </div>
            </Modal>
          }

          <div className = { 'percentage-grid' }>
            <div>
              <i
                className={ 'back-arrow' }
                onClick={ () => this.navigate() }>
              </i>
              <br/>
              <br/>
              <h2 className={ 'font-size-30px text-align-left' }>List of Flights for liquidation</h2>
              <br/>
              <h4>Below are the list of your flights that are requested for liquidation</h4>
            </div>
          </div>
          <br/>
          <Line />
          <br/>
          {
            enabledLoader ?
            <center>
              <CircularLoader show = { enabledLoader }/>
            </center>
            :
            <div>
              {
                showFormModal ?
                <div>
                  <LiquidationFormComponent
                    backToList = { () => this.setState({
                      showFormModal : false,
                      attachmentsData :
                      [{ name : 'Flight Quatation Attachment' },
                      { name : 'ERB Email Attachment' }],
                      orNumber : '',
                      orDate : '',
                      ticketReasons : ''
                    }) }
                    costTicket = { costTicket }

                    costServiceCharge = { costServiceCharge }
                    whyTicketUsed = { whyTicketUsed }
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
                    departureDate = { departureDate }
                    departureTime = { departureTime }
                    departureTimeFunc = { (e) => this.departureTimeFunc(e) }
                    returnDate = { returnDate }
                    returnTime = { returnTime }
                    returnTimeFunc = { (e) => this.returnTimeFunc(e) }

                    attachmentsData = { attachmentsData }
                    liquidationServiceCharge = { liquidationServiceCharge }
                    liquidationVAT = { liquidationVAT }
                    liquidationCost = { liquidationCost }
                    orDate = { orDate }
                    orDateFunc = { (e) => this.orDateFunc(e) }
                    orNumber = { orNumber }
                    orNumberFunc = { (e) => this.orNumberFunc(e) }
                    ticketReasonsFunc = { (e) => this.ticketReasonsFunc(e) }
                    attachmentsDataFunc = { (attachmentsData) => this.setState({ attachmentsData }) }
                    submitFunc = { () => {
                      try {
                        this.presenter.addLiquidation(
                          requestId,
                          ticketMode,
                          ticketReasons,
                          attachmentsData,
                          moment(orDate).format('MM/DD/YYYY'), 
                          orNumber)
                      } catch(e) {
                        console.log(e)
                      }
                    }}
                  />
                </div>
                :

                liquidationArray.length !==0 ?
                  <LiquidationComponent
                    showTicketFunc = { () => this.setState({ showTicketModal : true }) }
                    showFormFunc = { (
                      requestId,
                      liquidationId,
                      liquidationCost,
                      liquidationServiceCharge,
                      liquidationReason,
                      liquidationVAT,
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
                      isDomestic
                    ) => {
                      this.setState({
                        requestId,
                        liquidationId,
                        liquidationCost,
                        liquidationServiceCharge,
                        liquidationReason,
                        liquidationVAT,
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
                        isDomestic
                      })
                    }
                    }
                    cardDataHolder = { liquidationArray }/>
                    :
                <center>
                  <h2>No records</h2>
                </center>
              }
            </div>
          }
        </div>
        <div></div>
      </div>
    )
  }
}

LiquidationFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(LiquidationFragment, Presenter )
