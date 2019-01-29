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
import { convertInitial } from '../../../utils/initialUtils'
import { Progress } from 'react-sweet-progress'
import './styles/teamGoal.css'

class DirectReportGoalsComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 1,
      viewMoreText : 'View More'
    }
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  render () {
    const {
      cardHolder,
      employeeName,
      imageUrl,
      priorityFunc,
      onSelected
    } = this.props

    const { index, viewMoreText } = this.state
    const isVisible = (cardHolder && cardHolder.length > 1) ? '' : 'hide'

    return (
      <div className = { 'padding-15px' }>
      {
        <div>
          <div className = { 'team-goals-comment' }>
            <div className = { 'team-profile-picture' }>
              <h2 className = { 'team-initial-text' }>{ convertInitial(employeeName && employeeName) }</h2>
              <small></small>
            </div>
            <h4 className = { 'font-size-14px margin-auto font-weight-lighter' }>{ employeeName && employeeName }</h4>
          </div>
          {
            cardHolder &&
            cardHolder.slice(0, index).map((details, key) =>

              <Card className = { 'margin-10px cursor-pointer' }
                onClick = { () => onSelected(
                  details,
                  details.id,
                  details.title,
                  details.description,
                  details.startDate,
                  details.endDate,
                  priorityFunc(details.priority),
                  details.statusId,
                  details.type
                ) }>
                <div className = { 'padding-15' }>
                  <div className = { 'header-column-1' }>
                    <div>
                      <h2 className = { 'margin-10px text-align-left font-size-12px font-weight-lighter' }>{ details.title }</h2>
                    </div>
                    <div>
                      {
                        details.statusId === 2 ?
                        <h2 className = { 'margin-10px text-align-right font-size-12px font-weight-bold color-Medium' }>Approved</h2>
                        :
                          details.statusId === 3 ?
                          <h2 className = { 'margin-10px text-align-right font-size-12px font-weight-bold color-High' }>Rejected</h2>
                          :
                          details.statusId === 1 ?
                          <h2 className = { 'margin-10px text-align-right font-size-12px font-weight-bold color-gray' }>Requested</h2>
                          :
                          details.statusId === 4 ?
                          <h2 className = { 'margin-10px text-align-right font-size-12px font-weight-bold color-gray' }>Update for approval</h2>
                          :
                          details.statusId === 5 ?
                          <h2 className = { 'text-align-right font-size-12px font-weight-bold' }>Deletion for approval</h2>
                          :
                          details.statusId === 6 ?
                          <h2 className = { 'text-align-right font-size-12px font-weight-bold color-Low' }>Completed</h2>
                          :
                          details.statusId === 8 &&
                          <h2 className = { 'text-align-right font-size-12px font-weight-bold color-Low' }>For Rating</h2>
                      }
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
                      <div>
                      </div>
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
      }
      </div>
    )
  }
}

DirectReportGoalsComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default DirectReportGoalsComponent
