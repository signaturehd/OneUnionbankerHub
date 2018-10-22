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
      ticketMode : false,
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

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  render () {
    const {
      enabledLoader,
      showTicketModal,
      showFormModal,
      ticketMode,
      liquidationArray,
      attachmentsData
    } = this.state

    const { percentage } = this.props
    return (
      <div>
        {
          showTicketModal &&
          <Modal
          isDismisable = { true }
          onClose = { () => this.setState({ showTicketModal : false }) }>
            <h2 className = { 'font-size-16px font-weight-bold text-align-center' }>Is the ticket used?</h2>
            <br/>
            <div className = { 'grid-global' }>
              <GenericButton
                text = { 'No' }
                onClick = { () => this.setState({
                  ticketMode : false,
                  showFormModal : true,
                  showTicketModal : false })
                }
              />
              <GenericButton
                  text = { 'Yes' }
                  onClick = { () => this.setState({
                    ticketMode : true,
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
              selected = { moment() }
            />
            <DatePicker
              text = { 'Preferred Date' }
              selected = { moment() }
            />
            <GenericInput
              text = { 'Cost of Ticket' }
              type = { 'number' }
            />
            <GenericInput
              text = { 'Cost of Service Charge' }
              type = { 'number' }
            />
            <GenericInput
              text = { 'Total Cost of Flight' }
              type = { 'number' }
            />
            <GenericInput
              text = { 'Official Receipt Number' }
            />
            <DatePicker
              text = { 'Date of Official Receipt' }
              selected = { moment() }
            />
            {
              ticketMode ?
              <MultipleAttachments
                placeholder = { 'Form Attachments' }
                fileArray = { attachmentsData }
                setFile = { (attachmentsData) => this.setState(attachmentsData) }
              />
              :
              <GenericInput
                text = { 'Why ticket was unused' }
              />
            }
            <center>
              <GenericButton
                text = { 'Continue' }
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
              liquidationArray.length !==0 &&
                <LiquidationComponent
                  showTicketFunc = { () => this.setState({ showTicketModal : true }) }
                  cardDataHolder = { liquidationArray }/>
            }
      </div>
    )
  }
}

LiquidationFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(LiquidationFragment, Presenter )
