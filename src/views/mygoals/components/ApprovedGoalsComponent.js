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

class ApprovedGoalsComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 1,
      viewMoreText : ''
    }
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  render () {
    const { cardHolder, employeeName, imageUrl, priorityFunc, showApprovalFormFunc } = this.props
    const { index, viewMoreText } = this.state

    const isVisible = (cardHolder && cardHolder.length > 1) ? '' : 'hide'

    return (
      <div className = { 'grid-main padding-5px' }>
        <div>
          <div className = { 'employee-column' }>
            <img src = { require('../../../images/1uhub.png') } width = { '100px' } height = { '100px' }/>
            <div className = { 'employee-row' }>
              <h2></h2>
              <h2 className = { 'margin-10px text-align-left font-size-18px font-weight-lighter' }>{employeeName}</h2>
              <h2></h2>
            </div>
          </div>
          {
            cardHolder.slice(0, index).map((details, key) =>

              <Card className = { 'margin-10px' }
                onClick = { () => showApprovalFormFunc(
                  employeeName,
                  details.id,
                  details.title,
                  details.approvalStatus,
                  details.description,
                  details.priority,
                  details.startDate,
                  details.endDate,
                  details.type
                ) }>
                <div className = { 'grid-card-row' }>
                  <div className = { 'header-column header-color border-radius-top' }>
                    <h2 className = { 'margin-10px text-align-left font-size-18px font-weight-bold color-white' }>{ details.title }</h2>
                    {
                      details.approvalStatus === 2 ?
                      <h2 className = { 'margin-10px text-align-right font-size-14px font-weight-bold color-white header-column' }>Approved<span className = { 'icon-check icon-check-img' }/></h2>
                      :
                        details.approvalStatus === 3 ?
                        <h2 className = { 'margin-10px text-align-right font-size-14px font-weight-bold color-white header-column' }>Rejected<span className = { 'icon-check icon-cross-img' }/></h2>
                        :
                        <h2 className = { 'margin-10px text-align-right font-size-14px font-weight-bold color-white' }>Requested</h2>
                    }
                  </div>

                  <div className = { 'grid-card-x2 padding-15px' }>
                    <div className = { 'grid-div-row' }>
                      <div>
                        <h2 className = { 'margin-5px text-align-left font-size-16px font-weight-lighter' }>{ details.description.substr(0,100) }...</h2>
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
                        <h2 className = { `margin-5px text-align-right font-size-18px font-weight-bold color-${priorityFunc(details.priority)}` }>{ priorityFunc(details.priority) }</h2>
                      </div>
                      <div></div>
                      <div>
                      <h2 className = { 'margin-5px text-align-right font-size-16px font-weight-lighter' }>Due Date: <b>{ moment(details.endDate).format('MMM DD, YYYY') }</b></h2>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </Card>
            )
          }
          <button
            type = { 'button' }
            className = { `viewmore tooltip ${ isVisible }` }
            onClick = {
              () => {
                if(index === cardHolder.length)
                  this.setState({ index : 1, viewMoreText : 'View more' })
                else
                  this.setState({ index : cardHolder.length, viewMoreText : 'View less' })
              }
            }>
            <img src={ require('../../../images/icons/horizontal.png') } />
            <span className={ 'tooltiptext' }>{ viewMoreText }</span>
          </button>
          <Line/>
        </div>
      </div>
    )
  }
}

ApprovedGoalsComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ApprovedGoalsComponent
