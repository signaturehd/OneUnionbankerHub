import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/TravelPresenter'

import RequestFlightFragment from '../request/RequestFlightFragment'
import BookFlightFragment from '../bookflight/BookFlightFragment'
import LiquidationFragment from '../liquidation/LiquidationFragment'

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

import './styles/travel.css'

class TravelFragment extends BaseMVPView {
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
      accountNumberPrefill : ''
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(13)
    this.presenter.validateFabToShow()
    this.presenter.getReleasingCenters()
    this.presenter.getAccountNumber()
  }

  showAccountNumberPrefill (accountNumber) {
    this.setState({ accountNumber })
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
    this.props.history.push('/mytravel/travel')
  }

  render () {
    const { history, onClick, isLineManager } = this.props
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


    const travelOptions = [
      {
        id: 0 ,
        styleName: 'travel-option-cards-1 travel-option-default font-weight-bold',
        title: 'Request Flight Quotation',
        path: '/mytravel/travel/request',
        subTitle: ''
      },
      {
        id: 1 ,
        styleName: 'travel-option-cards-1 travel-option-default font-weight-bold',
        title: 'Book Flight',
        path: '/mytravel/travel/book',
        subTitle: ''
      },
      {
        id: 2 ,
        styleName: 'travel-option-cards-1 travel-option-default font-weight-bold',
        title: 'Liquidation My Flight',
        path: '/mytravel/travel/liquidation',
        subTitle: ''
      }
    ]

  const myTravel = () => (
    <div className={ 'travel-container' }>
      <div className={ 'adjustment' }>
        <div className={ 'travel-card-container' }>
          {
            travelOptions.map((value, idx) => (
              <Card
                className={ 'travel-card' }
                onClick={ () => history.push(value.path) }
                key={ idx }>
                <div className = { 'travel-column-grid' }>
                  <div
                    className={ value.styleName }
                    text={ value.title } >
                  </div>
                  <p className={ 'travel-option-cards font-weight-bold' }>{ value.title }</p>
                  <h2 className = { 'font-size-12px' }>{value.subTitle}</h2>
                </div>
              </Card>
            ))
          }
        </div>
      </div>
    </div>
  )
  return (
    <div>
      <div>
        <div>
          <h2 className={ 'header-margin-default text-align-left' }>My travel</h2>
          <h2>Where do you want to travel today?</h2>
          <br/>
        </div>
      </div>
      <div className = { 'tabs-container' }>
        <input
          className = { 'input-tab' }
          id = { 'tab1' }
          type = { 'radio' }
          name = { 'tabs' }
          defaultChecked = { true }
          onClick = { () => this.props.history.push('/mytravel/travel') }/>
        <label className = { 'travel-icon-tab' } htmlFor='tab1'>My Travel</label>

        {
          isLineManager &&
          <label>
            <input
              className = { 'input-tab' }
              id = { 'tab2' }
              type = { 'radio' }
              name = { 'tabs' }
              onClick = { () => this.props.history.push('/mytravel/approval') }/>
            <label className = { 'travel-icon-tab' } htmlFor='tab2'>Approvals</label>
          </label>
        }

        <section id='content1'>
          <Switch>
            <Route path='/mytravel'
              render={ myTravel } />
            <Route exact path='/mytravel/travel/request/RequestFlightFragment'
              render={ props => <RequestFlightFragment { ...props } /> }/>
            <Route exact path='/mytravel/travel/book/BookFlightFragment'
              render={ props => <BookFlightFragment { ...props } /> }/>
            <Route exact path='/mytravel/travel/liquidation/LiquidationFragment'
              render={ props => <LiquidationFragment { ...props } /> }/>
           </Switch>
        </section>
      </div>
    </div>
    )
  }
}

TravelFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
  onClick: PropTypes.func,
  history: PropTypes.object,
}

export default ConnectView(TravelFragment, Presenter)
