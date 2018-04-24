import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'

import Presenter from './presenter/BenefitsPresenter'
import './styles/benefits.css'
import ConnectPartial from '../../utils/ConnectPartial'
import { GenericButton } from '../../ub-components/UButton'
import { GenericCards } from '../../ub-components'
import EducationView from './fragments/education/EducationView'
import LoansView from './fragments/loans/LoansView'
import MedicalView from './fragments/medical/MedicalView'

class BenefitsPartial extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      accountNumber: '',
    }
  }

  showReleasingCenters (releasingCenters) {
    // TODO show to generic multilist dialog
  }

  onValidAccountNumber () {
    // TODO dismiss account number dialog
  }
  render () {
    const { onClick, text, path, icon, onOptionsLink, history } = this.props
    const benefitsOptions =
    [
      { id: 0 , title: 'education', path: '/benefits/education' },
      { id: 1 , title: 'medical', path: '/benefits/medical' },
      { id: 2 , title: 'loans', path: '/benefits/loans' }
    ]
    const { accountNumber } = this.state

    return (
      <div>
        <h1> Benefits</h1>
        <div className = { '_benefits-container' }>
          {
            benefitsOptions.map((value, idx) => (
              <GenericGenericCards className = { 'options-1' } >
                <div
                  className = { 'option-GenericCards' }
                  text = { value.title }
                  key = { idx }
                  onClick = { () => onOptionsLink(history.push(value.path)) } >
                  <span> { value.title } </span></div>
              </GenericCards>
            ))
          }

            <Switch>
              <Route path = '/benefits/education' render = { props => <EducationView parent = { this } />}/>
              <Route path = '/benefits/medical' render = { props => <MedicalView parent = { this } />}/>
              <Route path = '/benefits/loans' render = { props => <LoansView parent = { this } />}/>
           </Switch>
          </div>
      </div>
    )
  }
}
BenefitsPartial.propTypes = {
  text : PropTypes.string,
  icon : PropTypes.string,
  path : PropTypes.string,
  onClick : PropTypes.func,
}

export default ConnectPartial(BenefitsPartial, Presenter)
