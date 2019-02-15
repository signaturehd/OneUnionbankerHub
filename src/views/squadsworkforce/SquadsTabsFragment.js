import React, { Component } from 'react'
import {
  GenericButton,
} from '../../ub-components'

import { Route, Switch } from 'react-router-dom'

import SquadFragment from '../squad/SquadFragment'
import PersonalSquadsFragment from '../personalsquads/PersonalSquadsFragment'

import './styles/squads-tab.css'

class SquadsTabsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      history
    } = this.props
    return (
      <div className = { 'squads-workforce-container' }>
        <div className = { 'squads-workforce-actions' }>
          <GenericButton
            onClick = { () => history.push('/squads/workforce')  }
            text = { 'Squad Workforce' }
          />
          <GenericButton
            onClick = { () => history.push('/squads/applications') }
            text = { 'My Application' }
          />
        </div>
        <Switch>
          <Route exact path = '/squads' render = { props =>
            <SquadFragment { ...props }
              setSelectedNavigation = { this.setSelectedNavigation } /> } />
          <Route path = '/squads/workforce' render = { props =>
            <SquadFragment { ...props }
              setSelectedNavigation = { this.setSelectedNavigation } /> } />
          <Route path = '/squads/applications' render = { props =>
            <PersonalSquadsFragment { ...props }
              setSelectedNavigation = { this.setSelectedNavigation } /> } />
        </Switch>
      </div>
    )
  }
}

export default SquadsTabsFragment
