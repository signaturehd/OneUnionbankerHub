import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/NavigationPresenter'
/* Modules Fragment */
import BenefitsFragment from '../benefits/BenefitsFragment'
import NewsFragment from '../news/NewsFragment'
import FaqFragment from '../faq/FaqFragment'
import SettingsFragment from '../settings/SettingsFragment'
import PodcastFragment from '../podcast/PodcastFragment'
import LibraryFragment from '../library/LibraryFragment'
import MyLearningView from '../mylearning/MyLearningView'
import FeedbackFragment from '../Feedback/FeedbackFragment'
/* Navigation Drawer Component*/
import DrawerAppBar from './components/appbar/DrawerAppBar'
import SideBar from './components/sidebar/SideBar'
import Drawer from './components/drawer/Drawer'

import './styles/drawerview.css'

import { connect } from 'react-redux'

import store from '../../store'
import { NotifyActions } from '../../actions'
/* Education */
import EducationGrantPlanFragment from '../educationgrantplan/EducationGrantPlanFragment'
import EducationGrantAidFragment from '../educationgrantaid/EducationGrantAidFragment'
/* Medical */
import DentalReimbursement from '../dentalreimbursement/DentalReimbursementFragment'
import DentalLoaView from '../dentalloa/DentalLoaFragment'
import OpticalFragment from '../optical/OpticalFragment'
/* MPL */
import HousingAssistanceFragment from '../housingassistanceloan/HousingAssistanceFragment'
import EmergencyLoanFragment from '../emergencyloan/EmergencyLoanFragment'
import SalaryLoanFragment from '../salaryloan/SalaryLoanFragment'
/*  MPL Motorcycle */
import MotorcycleLoanFragment from '../motorcycleloan/MotorcycleLoanFragment'
/*  MPL Motorcycle */
import ComputerLoanFragment from '../computerloan/ComputerLoanFragment'
/*Transaction*/
import TransactionApprovalDetailFragment from '../transactiondetails/TransactionApprovalDetailFragment'
import TransactionPersonalDetailFragment from '../transactiondetails/TransactionPersonalDetailFragment'
import CarLeaseNewFragment from '../carlease/CarLeaseNewFragment'
import CarLeaseOldFragment from '../carlease/CarLeaseOldFragment'

import Carousel from '../carousel/Carousel'
/* Modals */
import NavigationViewModal from './modal/NavigationViewModal'
import ReloginModal from './modal/ReloginModal'

class NavigationView extends BaseMVPView {
  constructor (props) {
    super (props)

    this.state = {
      selected: 0,
      profile: [],
      showLogoutModal: false
    }

    this.setDisplay = this.setDisplay.bind(this)
    this.setSelectedNavigation = this.setSelectedNavigation.bind(this)
    this.callLogout = this.callLogout.bind(this)
    this.relogin = this.relogin.bind(this)
  }

  setDisplay (sideBar, topBar) {
    this.setState ({ displayShow : sideBar })
    this.setState({ displayNavIcon : topBar })
  }

  showProfile (profile) {
    this.setState({ profile })
  }

  componentDidMount () {
    const mediaQuery = window.matchMedia('(min-width: 1201px)')
      if (mediaQuery.matches) {
        this.setDisplay('block', 'none')
      } else {
        this.setDisplay('none', 'block')
      }
        mediaQuery.addListener(mq => {
      if (mq.matches) {
        this.setDisplay('block', 'none')
      } else {
        this.setDisplay('none', 'block')
      }
    })
    store.dispatch(NotifyActions.resetNotify())
    this.presenter.getLibraries()
    this.presenter.getProfile()
    this.presenter.getWizard()
  }

  setSelectedNavigation (id) {
    this.setState({ selected: id })
  }

  callLogout () {
    this.presenter.logout()
  }

  showWizard (wizard) {
    this.setState({ wizard })
  }

  relogin () {
    console.log('triggered')
    try {
      this.props.history.push('/')
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    const {
      displayShow,
      displayNavIcon,
      displayNavIconState,
      selected,
      onClick,
      profile,
      wizard,
      showLogoutModal
    } = this.state
      const { history, login } = this.props
    const style = {
      show: {
          display : displayShow
      }
    }

    let locationPath = history.location.pathname
    return (
      <div className = { 'navigation-body-div' }>
        <header className = { 'page-boundary page-boundary--fixed-top' }>
          <DrawerAppBar
            onClick = { onClick }
            displayNavIcon = { displayNavIcon } displayShow = { displayShow }
            hide = { () => this.setState({ displayShow : 'block' })}
            show = { () => this.setState({ displayShow : 'none' })} />
        </header>
        <div className="navigation-panels">
          <main className ="navigation-panel navigation-content" role="main" id="navPanId">
          {
            !wizard &&
            <Carousel
              onClose = { () => this.presenter.setWizard('false') }
            />
          }
          {
            showLogoutModal &&
            <NavigationViewModal
              logout = { () => this.presenter.logout() }
              onClose = { () => this.setState({showLogoutModal : false}) }
            />
          }

          {
            login &&
            <ReloginModal
              relogin = { () => { this.presenter.relogin(), this.relogin() } }
            />
          }

          { super.render() }

              <Drawer >
                <Switch>
                  <Route exact path = '/' render = {props =>
                    <NewsFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> }/>
                  <Route path = '/mybenefits/transactions/personal/:id' render = { props =>
                    <TransactionPersonalDetailFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } />}/>
                  <Route path = '/mybenefits/transactions/approval/:id' render = { props =>
                    <TransactionApprovalDetailFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation }/>}/>
                  <Route path = '/mybenefits/benefits/education/grantplan' render = { props =>
                    <EducationGrantPlanFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } />}/>
                  <Route path = '/mybenefits/benefits/education/grantaid' render = { props =>
                    <EducationGrantAidFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } />}/>
                  <Route path = '/mybenefits/benefits/medical/optical' render = { props =>
                    <OpticalFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } />}/>
                  <Route path = '/mybenefits/benefits/medical/reimbursement/dental' render = { props =>
                    <DentalReimbursement { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation }/>}/>
                  <Route path = '/mybenefits/benefits/medical/loa/dental' render = { props =>
                    <DentalLoaView { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation }/>}/>
                  <Route path = '/mybenefits/benefits/loans/housingassistance' render = { props =>
                    <HousingAssistanceFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/mybenefits/benefits/carlease/new' render = { props =>
                    <CarLeaseNewFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/mybenefits/benefits/carlease/old' render = { props =>
                    <CarLeaseOldFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/mybenefits/benefits/loans/emergency' render = { props =>
                    <EmergencyLoanFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/mybenefits/benefits/loans/salary' render = { props =>
                    <SalaryLoanFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/mybenefits/benefits/loans/motorcycle' render = { props =>
                    <MotorcycleLoanFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/mybenefits/benefits/loans/computer' render = { props =>
                    <ComputerLoanFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/mybenefits' render = { props =>
                    <BenefitsFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/faqs' render = { props =>
                    <FaqFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/settings' render = { props =>
                    <SettingsFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/mylearning' render = { props =>
                    <MyLearningView { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/feedback' render = { props =>
                    <FeedbackFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
               </Switch>
            </Drawer>
          </main>
          <aside
            className ="left-side"
            style = { style.show }>
            <SideBar
              logout = { () => this.setState({ showLogoutModal : true }) }
              selected={ selected }
              profile = { profile }
              history = { this.props.history } >
             </SideBar>
          </aside>
        </div>
      </div>
    )
  }
}

NavigationView.propTypes = {
  onClick : PropTypes.func,
}

const mapStateToProps = state => ({
  login : state.login,
})


export default ConnectView(connect(mapStateToProps)(NavigationView), Presenter)
