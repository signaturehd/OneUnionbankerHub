import React, { Component } from 'react'
import {
  GenericButton,
  Card
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
      <div className = { 'squads-workforce-container-x3' }>
        <div></div>
        <div className = { 'squads-workforce-container' }>
          <Card className = { 'squad-workforce-banner' }>
            <img
              height = { 45 }
              width = { 45 }
              src = { require('../../images/1UHub Logo_Gotham_2.png') }/>
            <h4>Name Test</h4>
          </Card>
          <div className = { 'squads-workforce-actions' }>
            <div className = { 'text-align-right' }>
              <GenericButton
                onClick = { () => history.push('/squads/workforce')  }
                text = { 'Squad Workforce' }
              />
            </div>
            <div className = { 'text-align-left' }>
              <GenericButton
                onClick = { () => history.push('/squads/applications') }
                text = { 'My Application' }
              />
            </div>
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
        <div></div>
      </div>
    )
  }
}

export default SquadsTabsFragment
