import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/BenefitsPresenter'

import EducationFragment from './fragments/education/EducationFragment'
import LoansFragment from './fragments/loans/LoansFragment'
import MedicalFragment from './fragments/medical/MedicalFragment'

import { InputModal, Card, GenericButton } from '../../ub-components'

import './styles/benefits.css'

class BenefitsFragment extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      showAccountNumberModal: false,
      accountNumber: '', // this is only used to handle onChange of input modal
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateFabToShow()
    this.props.history.push('/benefits')
  }

  showReleasingCenters (releasingCenters) {
  // TODO show to generic multilist dialog
  }

  onValidAccountNumber () {
    this.setState({ showAccountNumberModal: false })
  }

  showAccountNumberModal () {
    this.setState({ showAccountNumberModal: true })
  }

  render () {
    const { history } = this.props
    const { accountNumber, showAccountNumberModal } = this.state
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
        <div className = { 'adjustment' }>
        <div className = { 'card-container' }>
          {
          benefitsOptions.map((value, idx) => (
            <Card key={ idx }>
              <div
                className = { value.styleName }
                text = { value.title }
                onClick = { () => history.push(value.path) } >
                <p className = { 'benefits-option-cards' }> { value.title } </p>
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
