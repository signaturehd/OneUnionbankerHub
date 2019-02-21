import React, { Component } from 'react'
import {
  GenericButton,
  Card
} from '../../ub-components'

import { Route, Switch } from 'react-router-dom'

import SquadFragment from '../squad/SquadFragment'
import SquadDetailsFragment from './fragments/SquadDetailsFragment'
import PersonalSquadsFragment from '../personalsquads/PersonalSquadsFragment'

import './styles/squads-tab.css'

class SquadsTabsFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showVacanciesDetailsFragment : false,
      showVacanciesApplicationsComponent : true,
    }
  }

  componentDidMount() {
    if(location.hash === '#/squads/applications') {
      this.setState({ showVacanciesApplicationsComponent : false })
    }
  }

  render () {
    const {
      history,
      profile
    } = this.props

    const {
      showVacanciesDetailsFragment,
      showVacanciesApplicationsComponent,
      squadDetails
    } = this.state

    return (
      <div className = { 'squads-workforce-container-x3' }>
        <div></div>
        {
          showVacanciesDetailsFragment ?
          <div className = { 'squads-workforce-container' }>
            <SquadDetailsFragment
              squadDetails  = { squadDetails  }
              hideFragment = { () => this.setState({ showVacanciesDetailsFragment : false }) }
              />
          </div>
          :
          <div className = { 'squads-workforce-container' }>
            {
              showVacanciesApplicationsComponent ?
              <div className = { 'squads-workforce-actions' }>
                <div className = { 'text-align-right' }>
                  <GenericButton
                    className = { 'cursor-pointer global-button profile-button-medium' }
                    onClick = { () => history.push('/squads/workforce')  }
                    text = { 'Squad Workforce' }
                  />
                </div>
                <div className = { 'text-align-left' }>
                  <GenericButton
                    onClick = { () => {
                      history.push('/squads/applications')
                      this.setState({ showVacanciesApplicationsComponent:  false })
                    } }
                    className = { 'cursor-pointer global-button profile-button-medium' }
                    text = { 'My Application' }
                  />
                </div>
              </div>
              :
              <div className = { 'text-align-left' }>
                <GenericButton
                  onClick = { () => {
                    this.setState({ showVacanciesApplicationsComponent: true })
                    history.push('/squads/workforce')} }
                  className = { 'cursor-pointer global-button profile-button-small' }
                  text = { 'back' }
                />
              </div>
            }
            <Switch>
              <Route path = '/squads/workforce' render = { props =>
                <SquadFragment
                  profile = { profile }
                  showVacanciesDetailsFragmentFunc = { (squadDetails) =>
                  {
                    this.setState({
                      showVacanciesDetailsFragment: true,
                      squadDetails
                    })}
                  }
                  { ...props }
                  setSelectedNavigation = { this.setSelectedNavigation } /> } />
              <Route path = '/squads/applications' render = { props =>
                <PersonalSquadsFragment { ...props }
                  profile = { profile }
                  setSelectedNavigation = { this.setSelectedNavigation } /> } />
            </Switch>
          </div>
        }
        <div></div>
      </div>
    )
  }
}

export default SquadsTabsFragment
