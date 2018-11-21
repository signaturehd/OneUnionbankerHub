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
      <div className = { 'grid-main padding-15px' }>
      {
        cardHolder.map((resp, key) =>
          <Card className = { 'margin-10px' }>
            <div className = { 'grid-card-row' }>
              <div className = { 'header-column header-color border-radius-top' }>
                <h2 className = { 'margin-10px text-align-left font-size-20px font-weight-bold color-white' }>{ resp.title }</h2>
                {
                  resp.approvalStatus === 2 ?
                  <h2 className = { 'margin-10px text-align-right font-size-14px font-weight-bold color-white header-column' }>Approved<span className = { 'icon-check icon-check-img' }/></h2>
                  :
                    resp.approvalStatus === 3 ?
                    <h2 className = { 'margin-10px text-align-right font-size-14px font-weight-bold color-white header-column' }>Rejected<span className = { 'icon-check icon-cross-img' }/></h2>
                    :
                    <h2 className = { 'margin-10px text-align-right font-size-14px font-weight-bold color-white' }>Requested</h2>
                }
              </div>

              <div className = { 'grid-card-x2 padding-15px' }>
                <div className = { 'grid-div-row' }>
                  <div>
                    <h2 className = { 'margin-5px text-align-left font-size-16px font-weight-lighter' }>{ resp.description.substr(0,100) }...</h2>
                  </div>
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
                </div>

                <div className = { 'grid-div-row' }>
                  <div>
                    <h2 className = { 'margin-5px text-align-right font-size-20px font-weight-lighter unionbank-color' }>Personnal</h2>
                    <h2 className = { `margin-5px text-align-right font-size-18px font-weight-bold color-${priorityFunc(resp.priority)}` }>{ priorityFunc(resp.priority) }</h2>
                  </div>
                  <div></div>
                  <div>
                  <h2 className = { 'margin-5px text-align-right font-size-16px font-weight-lighter' }>Due Date: <b>{ moment(resp.endDate).format('MMM DD, YYYY') }</b></h2>
                  </div>
                </div>
              </div>

              <div>
                <Line/>
                <div className = { 'grid-footer-column margin-5px' }>
                  <div>
                  </div>
                  <div>
                  </div>
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
