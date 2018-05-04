import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/BenefitsPresenter'

import { Cards, GenericButton } from '../../ub-components'

import EducationFragment from './fragments/education/EducationFragment'
import LoansFragment from './fragments/loans/LoansFragment'
import MedicalFragment from './fragments/medical/MedicalFragment'

import { InputModal } from '../../ub-components/Modal'

import './styles/benefits.css'

class BenefitsFragment extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      accountNumber: '',
    }
  }

  componentDidMount () {
    this.presenter.validateManagersCheck()
    this.props.setSelectedNavigation(1)
  }

  showReleasingCenters (releasingCenters) {
  // TODO show to generic multilist dialog
  }

  onValidAccountNumber () {
  // TODO dismiss account number dialog
  }

  validateManagersCheck (managersCheck) {
    this.setState({ showAccountNumber : managersCheck.employee.allowManagersCheck })
  }

  render () {
    const { history } = this.props
    const { accountNumber, showAccountNumber } = this.state
    const benefitsOptions = [{
      id: 0 ,
      styleName: 'option-cards-1',
      title: 'EDUCATION',
      path: '/benefits/education',
    }, {
      id: 1 ,
      styleName: 'option-cards-2',
      title: 'MEDICAL',
      path: '/benefits/medical',
    }, {
      id: 2,
      styleName: 'option-cards-3',
      title: 'LOANS',
      path: '/benefits/loans',
    }]
    const Benefits = () => (
      <div className = { '_benefits-container' }>
        <h1>Benefits</h1>
        {
          !showAccountNumber &&
            <InputModal
              isDismisable = { true }
              onClose = { () => this.setState({showAccountNumber : false}) }
              onChange = { e => this.setState({ accountNumber: e.target.value }) }
              placeholder = { 'Account Number' }
              type = { 'text' }
              onSubmit = { e => {
                  e.preventDefault() , this.presenter.validateAccountNumber(accountNumber)
                }
              }
            />
        }
        <div className = { 'adjustment' }>
        <div className = { 'card-container' }>
          {
          benefitsOptions.map((value, idx) => (
            <Cards key={ idx }>
              <div
                className = { value.styleName }
                text = { value.title }
                onClick = { () => history.push(value.path) } >
                <p className = { 'benefits-option-cards' }> { value.title } </p>
              </div>
            </Cards>
          ))
          }
        </div>
      </div>
    </div>)

    return (
    <div>
       <Switch>
         <Route exact path = '/benefits' render = { Benefits } />
         <Route path = '/benefits/education' render = { props => <EducationFragment { ...props } />}/>
         <Route path = '/benefits/medical' render = { props => <MedicalFragment { ...props } />}/>
         <Route path = '/benefits/loans' render = { props => <LoansFragment  { ...props } />}/>
      </Switch>
    </div>)
  }
}

BenefitsFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(BenefitsFragment, Presenter)
