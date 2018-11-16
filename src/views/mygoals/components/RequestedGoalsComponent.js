import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'

import Presenter from '../presenter/MyGoalsPresenter'

import {
  Modal,
  GenericButton,
  GenericInput,
  SingleInputModal,
  CircularLoader,
  DatePicker,
  Card,
  Line,
  Checkbox,
  FloatingActionButton
} from '../../../ub-components/'

import { format } from '../../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/myGoalStyles.css'

class RequestedGoalsComponent extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  render () {
    const { cardHolder, priorityFunc } = this.props
    return (
      <div className = { 'grid-main padding-5px' }>
      {
        cardHolder.map((resp, key) =>
          <Card className = { 'margin-5px' }>
            <div className = { 'grid-card-row' }>

              <div className = { 'grid-card-x2 header-color border-radius-top' }>
                <h2 className = { 'margin-10px text-align-left font-size-16px font-weight-bold color-white' }>{ resp.goal }</h2>
                <h2 className = { 'margin-10px text-align-right font-size-16px font-weight-lighter unionbank-color' }>Personal</h2>
              </div>

              <div className = { 'grid-card-x2' }>
                <div className = { 'grid-div-row' }>
                  <div></div>
                  <div>
                    <h2 className = { 'margin-10px text-align-left font-size-14px font-weight-lighter' }>{ resp.description.substr(0,30) }...</h2>
                    <h2 className = { 'margin-10px text-align-left font-size-14px font-weight-lighter' }>{ moment(resp.startDate).format('MMM DD, YYYY') } to { moment(resp.dueDate).format('MMM DD, YYYY') }</h2>
                  </div>
                  <div></div>
                </div>

                <div className = { 'grid-div-row' }>
                  <div></div>
                  <div className = { 'margin-10px text-align-right' }>

                  </div>
                  <div></div>
                </div>
              </div>

              <div>
                <Line/>
                <div className = { 'grid-footer-column margin-5px' }>
                  <div>
                    <h2 className = { `margin-5px text-align-center font-size-12px font-weight-bold color-${priorityFunc(resp.priority)}` }>{ priorityFunc(resp.priority) }</h2>
                  </div>
                  <div></div>
                  <div>
                    <span className = { 'icon-check icon-edit-img' }/>
                  </div>
                </div>
              </div>

            </div>
          </Card>
        )
      }
      </div>
    )
  }
}

RequestedGoalsComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default RequestedGoalsComponent
