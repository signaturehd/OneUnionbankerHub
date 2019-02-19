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
      <div>
      <h4 className = { 'unionbank-color-grey font-size-25px font-weight-bold padding-10px' }>List of Squad Vacancies</h4>
      <h4 className = { 'unionbank-color-grey font-size-16px padding-10px' }>Be part of Bank's Digital Transformation of dynamic and caring teams of bold, agile and engaged experts that co-create innovative solutions for a better future.</h4>
      <br/>
      <div className = { 'squads-container' }>
        {
          squads && squads.map((squad, key) => (
            <Card
              className = { 'squads-card cursor-pointer' }
              onClick = { () => getVacancies(null, squad.id, squad) }>
              <div
                className = { 'squad-title' }>
                <h4>{ squad.squad.name }</h4>
                <p className = { 'unionbank-color-grey font-size-14px' }>{ squad.squad.mission }</p>
              </div>
              <div className = { 'squad-description' }>
              </div>
            </Card>
          ))
        }
      </div>
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
