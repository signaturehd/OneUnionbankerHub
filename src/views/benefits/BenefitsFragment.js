import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/BenefitsPresenter'

import EducationFragment from './fragments/education/EducationFragment'
import LoansFragment from './fragments/loans/LoansFragment'
import MedicalFragment from './fragments/medical/MedicalFragment'

import TransactionFragment from '../transaction/TransactionFragment'
import OpticalFragment from '../optical/OpticalFragment'

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
    this.props.history.push('/mybenefits/benefits')
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
    const { history, onClick } = this.props
    const { accountNumber, showAccountNumberModal } = this.state

    const benefitsOptions = [{
      id: 0 ,
      styleName: 'option-cards-1',
      title: 'EDUCATION',
      path: '/mybenefits/benefits/education',
    }, {
      id: 1 ,
      styleName: 'option-cards-2',
      title: 'MEDICAL',
      path: '/mybenefits/benefits/medical',
    }, {
      id: 2,
      styleName: 'option-cards-3',
      title: 'LOANS',
      path: '/mybenefits/benefits/loans',
    }]

  const Benefits = () => (
  <div className = { '_benefits-container' }>
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
    { super.render() }
      <h1 className = {'title-view' }>My Benefits</h1>
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
<div className = { 'tabs-container' }>
  <input
    className = { 'input-tab' }
    id='tab1'
    type='radio'
    name='tabs'
    defaultChecked
    onClick = { () => this.props.history.push('/mybenefits/benefits') }/>
  <label  className = { 'mobile-icon' } htmlFor = 'tab1'>Benefits</label>

 <input
  className = { 'input-tab' }
  id='tab2'
    type='radio'
    name='tabs'
    onClick = { () => this.props.history.push('/mybenefits/benefits/transaction') } />
 <label className = { 'mobile-icon' } htmlFor='tab2'>My Transactions</label>

 <input
    className = { 'input-tab' }
    id='tab3'  type='radio'
    name='tabs'
    onClick = { () => this.props.history.push('/mybenefits/benefits/forapproval') } />
<label className = { 'mobile-icon' } htmlFor = 'tab3' >For Approval</label>

  <section id='content1'>
    <Switch>
      <Route path = '/mybenefits/benefits/transaction'
        render = { props => <TransactionFragment { ...props } /> }/>
      <Route path = '/mybenefits/benefits/education'
        render = { props => <EducationFragment { ...props } />}/>
      <Route  path = '/mybenefits/benefits/medical'
        render = { props => <MedicalFragment { ...props } />}/>
      <Route  path = '/mybenefits/benefits/forapproval'
        render = { props => <div>For Aprroval</div>}/>
      <Route exact path = '/mybenefits/benefits'
        render = { Benefits } />
   </Switch>
  </section>
  </div>
</div>
    )
  }
}

BenefitsFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(BenefitsFragment, Presenter)
