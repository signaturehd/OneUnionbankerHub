import React, { Component } from 'react'
import NoDataListComponent from '../../common/components/NoDataListedComponent'
import { GenericButton, Card } from '../../../ub-components'

import moment from 'moment'

class GroupGoalDetailsComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    const {
      groupGoalListDetails,
      backOption
    } = this.props

    return (
      <div className = { 'grid-global' }>
        <div className = { 'text-align-left' }>
        {
          groupGoalListDetails &&
          groupGoalListDetails.goals.map((resp, key) =>
            <Card
              className = { 'padding-10px' }
              >
              <h4 className = { 'font-weight-bold font-size-18px unionbank-color' }>
                { resp.goal ? resp.goal : '(No Title Provided)' }
              </h4>
              <br/>
              <h4 className = { 'font-weight-lighter font-size-16px unionbank-color-grey' }>
                { resp.description ? resp.description : '(No Description Provided)' }
              </h4>
              <div className = { 'grid-global' }>
                <div></div>
                <div className = { 'text-align-right' }>
                  <h4 className = { 'font-size-14px font-weight-lighter unionbank-color-grey' }>{ moment(resp.startDate).format('MMM DD YYYY') +' - '+ moment(resp.endDate).format('MMM DD YYYY')  }</h4>
                </div>
              </div>
            </Card>
          )
        }
        </div>
        <div>

        </div>
      </div>
    )
  }
}

export default GroupGoalDetailsComponent
