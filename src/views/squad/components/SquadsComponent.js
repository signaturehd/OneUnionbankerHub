import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types'

import { Card, GenericInput, Checkbox, GenericLoader } from '../../../ub-components'

import './styles/squadcard.css'

class SquadsComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    const {
      squads,
      getVacancies
    } = this.props
    return (
      <div className = { 'squads-container' }>
        {
          squads && squads.map((squad, key) => (
            <Card className = { 'squads-card' } onClick = { () => getVacancies(null, squad.id) }>
              <div className = { 'squad-title' }><h3>{ squad.squad.name }</h3><small>{ squad.squad.mission }</small>
              </div>
              <div className = { 'squad-description' }>
              </div>
            </Card>
          ))
        }
      </div>
    )
  }
}

SquadsComponent.propTypes = {
  squads: PropTypes.array.isRequired
}

SquadsComponent.defaultProps = {
  squads: []
}

export default SquadsComponent
