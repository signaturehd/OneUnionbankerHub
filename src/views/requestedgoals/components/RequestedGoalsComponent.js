import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'

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
import './styles/requestedGoal.css'

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
    const { cardHolder, priorityFunc, onEditFormFunc } = this.props
    return (
      <div className = { 'grid-main padding-15px' }>
      {
        cardHolder.map((resp, key) =>
          <Card className = { 'margin-10px' }>
            <div className = { 'grid-card-row' }>
              <div className = { 'header-column' }>
                <h2 className = { 'margin-10px text-align-left font-size-18px font-weight-bold' }>{ resp.title }</h2>
                {
                  resp.approvalStatus === 2 ?
                  <h2 className = { 'margin-10px text-align-right font-size-16px font-weight-bold header-column' }>Approved<span className = { 'icon-check icon-check-img' }/></h2>
                  :
                    resp.approvalStatus === 3 ?
                    <h2 className = { 'margin-10px text-align-right font-size-16px font-weight-bold header-column' }>Rejected<span className = { 'icon-check icon-cross-img' }/></h2>
                    :
                    <h2 className = { 'margin-10px text-align-right font-size-16px font-weight-bold' }>Requested</h2>
                }
              </div>

              <div className = { 'grid-card-x2 padding-15px' }>
                <div className = { 'grid-div-row' }>
                  <div>
                    <Progress
                      width = { 65 }
                      height = { 65 }
                      percent = { 80 }
                      className = { 'margin-5px' }
                    />
                  </div>
                  <div className = { 'grid-global' }>
                    <div className = { 'icon-column' }>
                      <h2 className = { 'margin-5px text-align-left font-size-16px font-weight-lighter' }><span className = { 'icon-check icon-comment-img' }/>2/5</h2>
                      <h2 className = { 'margin-5px text-align-left font-size-16px font-weight-lighter' }><span className = { 'icon-check icon-taskcompleted-img' }/>5/10</h2>
                    </div>
                    <div>
                    </div>
                  </div>
                  <div></div>
                </div>

                <div className = { 'grid-div-row' }>
                  <div>
                    <h2 className = { 'margin-5px text-align-right font-size-20px font-weight-lighter unionbank-color' }>Personal</h2>
                  </div>
                  <div></div>
                  <div>
                    <h2 className = { 'margin-5px text-align-right font-size-16px font-weight-lighter' }>Due: <b>{ moment(resp.endDate).format('MMM DD, YYYY') }</b></h2>
                  </div>
                </div>
              </div>

              <div>
                <Line/>
                <div className = { 'grid-footer-column margin-5px' }>
                  <div>
                    <h2 className = { `margin-5px text-align-right font-size-18px font-weight-bold color-${priorityFunc(resp.priority)}` }>{ priorityFunc(resp.priority) }</h2>
                  </div>
                  <div>
                  </div>
                  <div>
                    <span
                    className = { 'icon-check icon-edit-img' }
                    onClick = { () => onEditFormFunc(
                      resp.id,
                      resp.title,
                      resp.description,
                      resp.startDate,
                      resp.endDate,
                      priorityFunc(resp.priority),
                      true,
                      true
                    ) }/>
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
