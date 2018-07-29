import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './styles/trainingComponentStyle.css'

import { Card } from '../../../ub-components'

class MyTrainingListCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      venue,
      startDate,
      title,
      startTime,
      endTime,
      status,
      endDate
    } = this.props
    return (

      <Card
         className = { 'mytrainings-card-list mytrainings-card-list-part' }>

        <div className = { 'mytrainings-card-content' }>
          <h2 className = { 'mytrainings-program-title font-weight-bold' }>
            { title }
          </h2>
          <h4 className = { 'mytrainings-label font-weight-bold font-size-11px' }>
            Program Title
          </h4>
        </div>

        <div className = { 'mytrainings-card-info' }>
          <div
            className = { 'mytrainings-information-status-hover font-size-12px' }>
            <div className = { 'mytrainings-information-status' }>
              <div className = { 'mytrainings-program-title font-weight-bold  font-size-11px' }>
              { venue }
              </div>
              <div className = { 'mytrainings-label font-weight-bold  font-size-10px' }>
                Venue Type
              </div>
            </div>
            <div >
              <div className = { 'mytrainings-program-title font-weight-bold  font-size-11px' }>
              { status }
              </div>
              <div className = { 'mytrainings-label font-weight-bold  font-size-10px' }>
                Status
              </div>
            </div>
          </div>
        </div>

        <div className = { 'mytrainings-grid-x3' }>
          <div></div>
          <div>
            <div
              className = { 'mytrainings-information-status font-size-12px' }>
              <div className = { 'mytrainings-icon-grid' }>
                <span className = { 'mytrainings-icon mytrainings-time' } />
                <div className = { 'font-weight-bold font-size-10px' }>
                  { startTime } - { endTime }
                </div>
              </div>
              <div className = { 'mytrainings-icon-grid' }>
                <span className = { 'mytrainings-icon mytrainings-calendar' } />
                <div className = { 'font-weight-bold font-size-10px' }>
                  { startDate } - { endDate }
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>

      </Card>
    )
  }
}

MyTrainingListCardComponent.propTypes = {
  title : PropTypes.string,
  venue : PropTypes.string,
  startDate : PropTypes.string,
  endDate : PropTypes.string,
  endTime : PropTypes.string,
  status : PropTypes.string,
  startTime : PropTypes.string,
}

export default MyTrainingListCardComponent
