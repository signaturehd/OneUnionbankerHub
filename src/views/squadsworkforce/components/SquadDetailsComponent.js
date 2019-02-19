import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Card, GenericLoader, GenericButton, Line } from '../../../ub-components'

import moment from 'moment'

class SquadDetailsComponent extends Component {
  constructor (props) {
    super (props)
  }

  checkDate (date) {
    const newDate = date.replace('Z','')
    return moment(newDate).format('MMMM DD, YYYY')
  }

  render () {
    const {
      squadDetails,
      hideFragment,
    } = this.props

    return (
      <Card className = { 'squad-card-grid-component' }>
        <div className = { 'text-align-left' }>
          <h4></h4>
        </div>
        <div className = { 'text-align-right' }>
          <h4></h4>
        </div>
      </Card>
    )
  }
}

SquadDetailsComponent.propTypes = {
  squadsDetails: PropTypes.object,
  hideFragment: PropTypes.func,
}

SquadDetailsComponent.defaultProps = {
  squadsDetails: {}
}

export default SquadDetailsComponent
