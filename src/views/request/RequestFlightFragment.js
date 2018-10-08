import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/RequestFlightPresenter'

import {
  GenericButton,
  CircularLoader,
  Card,
  Line,
} from '../../ub-components/'

import RequestFlightComponent from './components/RequestFlightComponent'

import { Progress } from 'react-sweet-progress'

class RequestFlightFragment extends BaseMVPView {

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
            <h2 className={ 'font-size-30px text-align-left' }>List of Request Flights</h2>
            <br/>
            <h4>Below are the list of your requests flights</h4>
          </div>
        </div>
        <br/>
        <br/>
        <Line />
        <br/>
        <div>
        {
          requestFlightArray.length !==0 &&
            <RequestFlightComponent
              cardDataHolder = { requestFlightArray }/>
        }
        </div>
      </div>
    )
  }
}

RequestFlightFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(RequestFlightFragment, Presenter )
