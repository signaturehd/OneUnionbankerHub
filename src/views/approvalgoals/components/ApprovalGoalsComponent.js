import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'

import Presenter from '../presenter/ApprovalGoalsPresenter'

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
import { convertInitial } from '../../../utils/initialUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/approval.css'

class ApprovalGoalsComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 1,
      viewMoreText : 'View More'
    }
  }

  navigate () {
    this.props.history.push('/mygoals')
  }

  render () {
    const {
      cardHolder,
      employeeName,
      imageUrl,
      priorityFunc,
      showApprovalFormFunc,
      goalId,
      goalTitle,
      approvalStatus,
      description,
      priorityId,
      startDate,
      dueDate,
      goalTypeId,
      showRejectRemarksModal,
      showRejectRemarksFunc,
      onApprovalSubmit,
      onClose,
      rejectedRemarks,
      rejectedRemarksFunc
    } = this.props

    const {
      index,
      viewMoreText
    } = this.state

    const isVisible = (cardHolder && cardHolder.length > 1) ? '' : 'hide'

    return (
      <div>
        <div>
          <div className = { 'employee-column' }>
            <div className = { 'team-profile-picture' }>
              <h2 className = { 'team-initial-text' }>{ convertInitial(employeeName && employeeName) }</h2>
              <small></small>
            </div>
            <h4 className = { 'font-size-14px margin-auto font-weight-lighter' }>{ employeeName && employeeName }</h4>
          </div>
          {
            cardHolder &&
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
                <div className = { 'padding-15' }>
                  <div className = { 'header-column-1' }>
                    <div>
                      <h2 className = { 'margin-10px text-align-left font-size-12px font-weight-lighter' }>{ details.title }</h2>
                    {
                      // <Progress
                      //   width = { 65 }
                      //   height = { 65 }
                      //   percent = { 80 }
                      //   className = { 'margin-5px' }
                      // />
                    }
                    </div>
                    <div>
                      <h2 className = { 'text-align-right font-size-12px font-weight-bold color-gray' }>{ details.status }</h2>
                      <h2 className = { 'margin-10px text-align-right font-size-12px font-weight-lighter color-gray' }>Personal</h2>
                    </div>

                  </div>
                  <div></div>
                  <div>
                    <Line/>
                    <div className = { 'grid-footer-column margin-5px' }>
                      <div>
                        <h2 className = { `margin-5px text-align-right font-size-12px font-weight-bold color-${priorityFunc(details.priority)}` }>{ priorityFunc(details.priority) }</h2>
                      </div>
                      <div></div>
                      <div>
                        <h2 className = { 'text-align-right font-size-11px font-weight-lighter color-gray' }>Due: <b>{ moment(details.endDate).format('MMM DD, YYYY') }</b></h2>
                      </div>
                    </div>
                  </div>

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
        </div>
      </div>
    )
  }
}

ApprovalGoalsComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ApprovalGoalsComponent
