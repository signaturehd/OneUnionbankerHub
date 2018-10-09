import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/LiquidationPresenter'

import {
  GenericButton,
  CircularLoader,
  Card,
  Line,
} from '../../ub-components/'

import LiquidationComponent from './components/LiquidationComponent'

import { Progress } from 'react-sweet-progress'
import './styles/liquidation.css'

class LiquidationFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      requestFlightArray : [
        {
          "id": 1,
          "referenceNumber": "TR20181003160949",
          "purpose": {
              "id": 2,
              "purpose": "Training"
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
              "purpose": "Team Building"
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
        }
      ]
    }
  }

  render () {
    const {
      requestFlightArray
    } = this.state

    const { percentage } = this.props
    return (
      <div>
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
              requestFlightArray.length !==0 &&
                <LiquidationComponent
                  cardDataHolder = { requestFlightArray }/>
            }
      </div>
    )
  }
}

LiquidationFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(LiquidationFragment, Presenter )
