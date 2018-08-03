import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './styles/myTrainingComponentStyle.css'

import { Card, GenericButton } from '../../../ub-components'
import moment from 'moment'

class MyTrainingListCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      id,
      venue,
      startDate,
      title,
      startTime,
      endTime,
      status,
      endDate,
      onClick
    } = this.props

    return (

      <Card className = { 'mytrainings-card-list' }>

        <div className = { 'mytrainings-card-background' }>
        </div>
        <div className={ 'mytrainings-card-description' }>
          <div className={ 'mytrainings-title' }>
            <h4>{ title }</h4>
          </div>
          <div className={ 'mytrainings-venue' }>
            <div></div>
            <div className={'location-icon'}></div>
            <h5>{ venue }</h5>
          </div>
          <br/>
          <div className={ 'mytrainings-view-details' }>
            <GenericButton
              className={ 'mytrainings-button' }
              text = { 'View Details' }
              onClick = { () => onClick(id) }
            />
          </div>
        </div>
        <div className={ 'mytrainings-datetime' }>
          <p>{ moment(startDate).format('LL') } - { moment(endDate).format('LL') }</p>
          <p>{ startTime } - { endTime }</p>
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
  onClick : PropTypes.func,
}

export default MyTrainingListCardComponent
