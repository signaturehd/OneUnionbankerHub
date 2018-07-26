import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/BenefitsPresenter'

import EducationFragment from './fragments/education/EducationFragment'
import LoansFragment from './fragments/loans/LoansFragment'
import MedicalFragment from './fragments/medical/MedicalFragment'
import CarLeaseFragment from './fragments/carlease/CarLeaseFragment'
import CalamityFragment from '../calamity/CalamityFragment'

import TransactionPersonalFragment from '../transaction/TransactionPersonalFragment'
import TransactionApprovalFragment from '../transaction/TransactionApprovalFragment'
import OpticalFragment from '../optical/OpticalFragment'
import BereavementFragment from '../bereavement/BereavementFragment'


import {
  InputModal,
  Card,
  Modal,
  GenericButton,
  GenericTextBox,
  CircularLoader,
  FloatingActionButton
 } from '../../ub-components'

import ReleasingCenterModal from './modal/ReleasingCenterModal'
import BereavementConfirmationModal from './modal/BereavementConfirmationModal'

import './styles/benefits.css'

class BenefitsFragment extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      showBereavementConfirmationModal: false,
      showAccountNumberModal: false,
      showReleasingCenterModal : false,
      releasingCenters: null,
      showModal: false,
      withDeathCert : false,
      carValidated: [],
      accountNumber: '', // this is only used to handle onChange of input modal
      enableLoader: false,
      enabledAccountNumberLoader: false,
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateFabToShow()
    this.presenter.getReleasingCenters()
  }

  showReleasingCenters (releasingCenters) {
    this.setState({ releasingCenters })
  // TODO show to generic multilist dialog
  }

  showCarValidated (carValidated) {
    this.setState({ carValidated })
  }

  showManagersCheck () {
    this.setState({ showReleasingCenterModal: true })
  }

  onValidAccountNumber () {
    this.setState({ showAccountNumberModal: false })
  }

  showAccountNumberModal () {
    this.setState({ showAccountNumberModal: true })
  }

  setReleasingCenter (releasingCenter) {
    this.presenter.setReleasingCenter(releasingCenter)
  }

  showCircularLoader () {
    this.setState({ enableLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enableLoader : false })
  }

  /* Loader for Account Number  */
  showLoaderValidatingAccountNumber (enabledAccountNumberLoader) {
    this.setState({ enabledAccountNumberLoader : true })
  }

  hideLoaderValidatingAccountNumber (enabledAccountNumberLoader) {
    this.setState({ enabledAccountNumberLoader : false })
  }

  isAccountNumber (bool) {
    if (bool) {
      this.setState({ showAccountNumberModal: true })
    } else {
      this.setState({ showReleasingCenterModal: true })
    }
  }

  isAccountOrRelasing (bool) {
    if (bool) {
      this.setState({ isAccountNumber : bool })
    } else {
      this.setState({ isAccountNumber : bool })
    }
  }



  navigate () {
    this.props.history.push('/mybenefits/benefits')
  }

  render () {
    const { history, onClick } = this.props
    const {
      accountNumber,
      showBereavementConfirmationModal,
      showAccountNumberModal,
      showReleasingCenterModal,
      releasingCenters,
      showModal,
      withDeathCert,
      isAccountNumber,
      carValidated,
      enableLoader,
      enabledAccountNumberLoader
    } = this.state


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
      title: 'MULTI PURPOSE LOAN',
      path: '/mybenefits/benefits/loans',
    }, {
      id: 3,
      styleName: 'option-cards-4',
      title: 'CAR LEASE',
      path: '/mybenefits/benefits/carlease',
    }, {
      id: 4,
      styleName: 'option-cards-5',
      title: 'BEREAVEMENT',
      path: '/mybenefits/benefits/bereavement',
    }, {
      id: 5,
      styleName : 'option-cards-6',
      title: 'CALAMITY',
      path: '/mybenefits/benefits/calamity',
    }]

  const Benefits = () => (
    <div className={ 'benefits-container' }>
      {
        showBereavementConfirmationModal &&
        <BereavementConfirmationModal
          navigateCall={ () => this.navigate() }
          onYes = {
            () => {
              this.setState({ showBereavementConfirmationModal : false })
              history.push('/mybenefits/benefits/bereavement/certified')
            }
          }
          onClose  = {
            () => {
              this.setState({ showBereavementConfirmationModal : false })
              history.push('/mybenefits/benefits/bereavement/uncertified')
            }
          }
        />
      }

      {
        showAccountNumberModal &&
        <Modal
          isDismisable={ true }
          onClose={ () =>
            this.setState({ showAccountNumberModal: false }) }
        >
        <div>
          {
          enabledAccountNumberLoader ?
            <center>
              <h4>Please wait while validating the Account Number</h4>
              <br/>
              <CircularLoader show={ true }/>
            </center>
            :
              <div>
                <h4>All benefit requests and claims will be credited to this account. Payroll accounts will not be accepted.</h4>
                <GenericTextBox
                  onChange={ e => this.setState({ accountNumber:   e.target.value }) }
                  placeholder={ 'Account Number' }
                  container={ 'benefits-container-text' }
                  group={ 'benefits-container-group' }
                  type={ 'text' }
                />
              <br/>
              <center>
                <GenericButton
                  onClick={ e => {
                    e.preventDefault()
                    this.presenter.validateAccountNumber(accountNumber)
                    }
                  }
                  text={ 'Submit' }
                  />
              </center>
            </div>
            }
          </div>
        </Modal>
        }
        {
          showReleasingCenterModal &&
          <ReleasingCenterModal
            isDismisable={ true }
            releasingCenters={ releasingCenters }
            onClick={ releasingCenter => this.setReleasingCenter(releasingCenter) }
            onClose={ () => this.setState({ showReleasingCenterModal: false }) }
            type={ 'text' }
          />
        }
        <div className={ 'adjustment' }>
          <div className={ 'card-container' }>
            {
            benefitsOptions.map((value, idx) => (

              <Card className={ 'benefits-card' } key={ idx }>
                <div
                  className={ value.styleName }
                  text={ value.title }
                  onClick={ () => {
                    if(value.id == 4) {
                      this.setState({ showBereavementConfirmationModal : true })
                    } else {
                      history.push(value.path)
                    }
                  }
                } >

                  <p className={ 'benefits-option-cards' }> { value.title } </p>
                </div>
              </Card>
            ))
            }
        </div>
      </div>
      <FloatingActionButton
        text="+"
        onClick={ () => {
            isAccountNumber ?
            this.setState({ showAccountNumberModal : true }):
            this.setState({ showReleasingCenterModal : true })
          }
        }
      />
    </div>
  )

  return (
    <div>
        <h2 className={'header-margin-default' }>MY BENEFITS</h2>
        <div className={ 'tabs-container' }>
          <input
            className={ 'input-tab' }
            id='tab1'
            type='radio'
            name='tabs'
            defaultChecked={true}
            onClick={ () => this.props.history.push('/mybenefits/benefits') }/>
          <label  className={ 'benefit-icon-tab' } htmlFor='tab1'>Benefits</label>

         <input
            className={ 'input-tab' }
            id='tab2'
            type='radio'
            name='tabs'
            onClick={ () => this.props.history.push('/mybenefits/transactions/personal') } />
          <label className={ 'transaction-icon-tab' } htmlFor='tab2'>My Transactions</label>

          {
            // TODO uncomment if required the for approval module

            // <input
            //    className = { 'input-tab' }
            //    id='tab3'  type='radio'
            //    name='tabs'
            //    onClick = { () => this.props.history.push('/mybenefits/transactions/approval') } />
            //    <label className = { 'approval-icon' } htmlFor = 'tab3' >For Approval</label>
          }

          <section id='content1'>
            <Switch>
              <Route path='/mybenefits/transactions/personal'
                render={ props => <TransactionPersonalFragment { ...props } /> } />
              <Route path='/mybenefits/transactions/approval'
                render={ props => <TransactionApprovalFragment { ...props }/> } />
              <Route path='/mybenefits/benefits/education'
                render={ props => <EducationFragment { ...props } />}/>
              <Route exact path='/mybenefits/benefits/medical'
                render={ props => <MedicalFragment { ...props } />}/>
              <Route exact path='/mybenefits/benefits/loans'
                render={ props => <LoansFragment { ...props } />}/>
              {
                enableLoader ?
                <Modal>
                  <h4>Please wait while validating your Employee Number</h4>
                  <br/>
                  <center>
                    <CircularLoader show={ enableLoader }/>
                  </center>
                </Modal>
                :
                <Route exact path='/mybenefits/benefits/carlease'
                  render={ props => <CarLeaseFragment
                  { ...props }
                  callCarBack={ () => this.navigate() }
                  />}
                />
              }

              <Route path='/mybenefits'
                render={ Benefits } />
              <Route exact path='/mybenefits/calamity'
                render={ props => <CalamityFragment { ...props } />}/>
             </Switch>
          </section>
        </div>
      </div>
    )
  }
}

BenefitsFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
  onClick: PropTypes.func,
  history: PropTypes.object,
}

export default ConnectView(BenefitsFragment, Presenter)
