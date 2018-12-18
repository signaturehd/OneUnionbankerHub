import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/CompliancePresenter'

/*
import PodcastFragment from '../podcast/PodcastFragment'
import PodcastPlayerFragment from '../podcastplayer/PodcastPlayerFragment'
import LibraryView from '../library/LibraryFragment'
import TrainingFragment from '../trainings/TrainingFragment'
*/

import CodeOfConductFragment from './fragments/codeofconduct/CodeOfConductFragment'

import { InputModal, Card, GenericButton } from '../../ub-components'

import './styles/mycompliance.css'

class ComplianceFragment extends BaseMVPView {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(9)
  }

  render () {
    const { history, profileHasCOC } = this.props
    const { accountNumber, showAccountNumberModal } = this.state

    const mycompliance = [{
      id: 0 ,
      styleName: 'mycompliance-cards-1 mycompliance-option-default font-weight-bold',
      title: 'Code of Conduct',
      path: '/mycompliance/codeofconduct',
    }]

    const MyCompliance = () => (
      <div className = { 'mycompliance-container' }>
        <div>
          <h2 className={ 'header-margin-default text-align-left' }> My Compliance </h2>
          <h2> Be an Informed risk-taker. Which reference would you like to read today? </h2>
        </div>
        {
          showAccountNumberModal &&
            <InputModal
              isDismisable = { true }
              onClose = { () => this.setState({ showAccountNumberModal : false }) }
              onChange = { e => this.setState({ accountNumber: e.target.value }) }
              placeholder = { 'Account Number' }
              type = { 'text' }
              onSubmit = { e => {
                  e.preventDefault()
                  this.presenter.validateAccountNumber(accountNumber)
                }
              }
          />
        }
        <div className = { 'mycompliance-adjustment' }>
        <div className = { 'mycompliance-card-container' }>
          {
          mycompliance.map((value, idx) => (
            <Card
              className = { 'mycompliance-card' }
              onClick={ () =>
                history.push(value.path)
              }
              key={ idx }>
              <div className = { 'mycompliance-column-grid' }>
                <div
                  className={ value.styleName }
                  text={ value.title } >
                </div>
                <p className={ 'mycompliance-option-cards font-weight-bold' }>{ value.title }</p>
              </div>
            </Card>
          ))
          }
        </div>
      </div>
    </div>)

    return (
      <div>
        <Switch>
          <Route path = '/mycompliance/codeofconduct' render = { props =>
            <CodeOfConductFragment
              profileHasCOC = { profileHasCOC }
              { ...props } /> } />
            <Route path = '/mycompliance' render = {  MyCompliance } />
        </Switch>
      </div>
    )
  }
}

ComplianceFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
  profileHasCOC: PropTypes.boolean,
}
export default ConnectView(ComplianceFragment, Presenter)
