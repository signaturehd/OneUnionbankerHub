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
import ResponseModal from '../notice/NoticeResponseModal'

import { Progress } from 'react-sweet-progress'
import './styles/liquidation.css'
import moment from 'moment'

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
      dateFlight : '',
      preferredDate : '',
      costTicket : '',
      costServiceCharge : '',
      totalCostFlight : '',
      orNumber : '',
      orDate : '',
      whyTicketUsed : '',
      liquidationArray : [],
      attachmentsData : [
        {
          name : 'Ticket Attachment'
        },
        {
          name : 'Invoice Attachment'
        }
      ]
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

  totalCostFlightFunc (totalCostFlight) {
    this.setState({ totalCostFlight })
  }

  orNumberFunc (orNumber) {
    this.setState({ orNumber })
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
      totalCostFlight,
      orNumber,
      orDate,
      whyTicketUsed,
      liquidationArray,
      attachmentsData
    } = this.state

    const { percentage } = this.props

    return (
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
        {
          showFormModal &&
          <Modal
          isDismisable = { true }
          onClose = { () => this.setState({ showFormModal : false }) }>
            <h2 className = { 'font-size-18px font-weight-bold text-align-center' }>Flight Liquidation Form</h2>
            <br/>
            <DatePicker
              text = { 'Date of Flight' }
              selected = { dateFlight && moment(dateFlight) }
              onChange = { (e) => this.dateFlightFunc(e) }
            />
            <DatePicker
              text = { 'Preferred Date' }
              selected = { preferredDate && moment(preferredDate) }
              onChange = { (e) => this.preferredDateFunc(e) }
            />
            <GenericInput
              text = { 'Cost of Ticket' }
              type = { 'number' }
              value = { costTicket }
              onChange = { (e) => this.costTicketFunc(e.target.value) }
            />
            <GenericInput
              text = { 'Cost of Service Charge' }
              type = { 'number' }
              value = { costServiceCharge }
              onChange = { (e) => this.costServiceChargeFunc(e.target.value) }
            />
            <GenericInput
              text = { 'Total Cost of Flight' }
              type = { 'number' }
              value = { totalCostFlight }
              onChange = { (e) => this.totalCostFlightFunc(e.target.value) }
            />
            <GenericInput
              text = { 'Official Receipt Number' }
              value = { orNumber }
              onChange = { (e) => this.orNumberFunc(e.target.value) }
            />
            <DatePicker
              text = { 'Date of Official Receipt' }
              selected = { orDate && moment(orDate) }
              onChange = { (e) => this.orDateFunc(e) }
            />
            {
              ticketMode === 1 ?
              <MultipleAttachments
                placeholder = { 'Form Attachments' }
                fileArray = { attachmentsData }
                setFile = { (attachmentsData) => this.setState(attachmentsData) }
              />
              :
              <GenericInput
                text = { 'Why the ticket was unused' }
                value = { whyTicketUsed }
                onChange = { (e) => this.whyTicketUsedFunc(e.target.value) }
              />
            }
            <center>
              <GenericButton
                text = { 'Continue' }
                onClick = { () => this.submit() }
              />
            </center>
          </Modal>
        }
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'font-size-30px text-align-left' }>List of Flights for liquidation</h2>
            <br/>
            <h4>Below are the list of your flights that are requested for liquidation</h4>
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
              liquidationArray.length !==0 ?
                <LiquidationComponent
                  showTicketFunc = { () => this.setState({ showTicketModal : true }) }
                  showFormFunc = { (
                    requestId,
                    costTicket,
                    costServiceCharge,
                    whyTicketUsed
                    ) => this.setState({
                      requestId,
                      costTicket,
                      costServiceCharge,
                      whyTicketUsed
                    })
                  }
                  cardDataHolder = { liquidationArray }/>
                  :
                  <center>
                    <h2>No records</h2>
                  </center>
            }
      </div>
    )
  }
}

LiquidationFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(LiquidationFragment, Presenter )
