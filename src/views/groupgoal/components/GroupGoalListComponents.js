import React, { Component } from 'react'
import NoDataListComponent from '../../common/components/NoDataListedComponent'
import { Card } from '../../../ub-components'

class GroupGoalListComponents extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    const {
      groupGoalList,
      onChangeDetails
    } = this.props

    return (
      <div className = { 'grid-global-columns-x3' }>
        {
          groupGoalList &&
          groupGoalList.list &&
          groupGoalList.list.length === 0 ?

          <NoDataListComponent
            text = { 'No Group Goal Listed' }
          />
          :
           groupGoalList &&
           groupGoalList.list &&
           groupGoalList.list.map((resp, key) =>
            <Card
              onClick = { () => onChangeDetails(resp) }
              className = { 'cursor-pointer padding-10px' }
              key = { resp.id }
              >
              <div className = { 'groupgoals-grid-card' }>
                <h4 className = { 'font-size-18px font-weight-bold margin-auto' }>{ resp.name }</h4>
                <span className={ 'groupgoals-icon-forms groupgoals-icon-proceed' }/>
              </div>
            </Card>
          )
        }
      </div>
    )
  }
}

export default GroupGoalListComponents
