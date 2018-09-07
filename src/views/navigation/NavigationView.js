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
import ComplianceFragment from '../compliance/ComplianceFragment'
import PhenomFragment from '../phenom/PhenomFragment'
/* Navigation Drawer Component*/
import DrawerAppBar from './components/appbar/DrawerAppBar'
import SideBar from './components/sidebar/SideBar'
import Drawer from './components/drawer/Drawer'

import './styles/drawerview.css'

import { connect } from 'react-redux'

import store from '../../store'
import { NotifyActions } from '../../actions'
/* Education */
import EducationAidFragment from '../educationaid/EducationAidFragment'
import EducationGrantPlanFragment from '../educationgrantplan/EducationGrantPlanFragment'
import EducationGrantAidFragment from '../educationgrantaid/EducationGrantAidFragment'
import EducationGroupAidFragment from  '../educationgroupaid/EducationGroupAidFragment'
/* Medical */
import DentalReimbursement from '../dentalreimbursement/DentalReimbursementFragment'
import DentalLoaView from '../dentalloa/DentalLoaFragment'
import OpticalFragment from '../optical/OpticalFragment'
import MedicalSchedulingFragment from '../medicalscheduling/MedicalSchedulingFragment'
import OutPatientReimbursementFragment from '../outpatientreimbursement/OutPatientReimbursementFragment'
import MaternityAssistanceFragment from '../maternityassistance/MaternityAssistanceFragment'
/* MPL */
import HousingAssistanceFragment from '../housingassistanceloan/HousingAssistanceFragment'
import EmergencyLoanFragment from '../emergencyloan/EmergencyLoanFragment'
import SalaryLoanFragment from '../salaryloan/SalaryLoanFragment'
/*  MPL Motorcycle */
import MotorcycleLoanFragment from '../motorcycleloan/MotorcycleLoanFragment'
/*  MPL Motorcycle */
import ComputerLoanFragment from '../computerloan/ComputerLoanFragment'
/* Bereavement */
import BereavementFragment from '../bereavement/BereavementFragment'
/* Transaction*/
import TransactionApprovalDetailFragment from '../transactiondetails/TransactionApprovalDetailFragment'
import TransactionPersonalDetailFragment from '../transactiondetails/TransactionPersonalDetailFragment'
import CarLeaseNewFragment from '../carlease/CarLeaseNewFragment'
import CarLeaseOldFragment from '../carlease/CarLeaseOldFragment'
/* Calamity */
import CalamityFragment from '../calamity/CalamityFragment'

/* Payslip*/
import Payslip from '../payslip/PayslipFragment'

import OnboardingView from '../onboarding/OnboardingView'
import Carousel from '../carousel/Carousel'

/* Pre Employment */
import PreEmploymentFragment from '../preemployment/PreEmploymentFragment'

/* Modals */
import NavigationViewModal from './modal/NavigationViewModal'
import ReloginModal from './modal/ReloginModal'
import CommonPinEnrollmentModal from './modal/CommonPinEnrollmentModal'

class NavigationView extends BaseMVPView {
  constructor (props) {
    super (props)

    this.state = {
      selected: 0,
      profile: [],
      showLogoutModal: false,
      showPinEnrollmentModal : true,
      hasPIN: '',
      enabledLoader : false,
      tempPreEmployment : 1,
      tempPreEmploymentModal : true,
    }

    this.setDisplay = this.setDisplay.bind(this)
    this.setSelectedNavigation = this.setSelectedNavigation.bind(this)
    this.callLogout = this.callLogout.bind(this)
  }

  setDisplay (sideBar, topBar) {
    this.setState ({ displayShow : sideBar })
    this.setState({ displayNavIcon : topBar })
  }

  showProfile (profile) {
    this.setState({ profile })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false  })
  }

  hideEnrollPin (hasPIN) {
    this.setState({ hasPIN })
  }

  validateInputPIN (e) {
    if(e.length > 5 || e.length < 5) {}
    else {
      this.presenter.postEnrollPin(e)
    }
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
  }

  setSelectedNavigation (id) {
    this.setState({ selected: id })
  }

  showPinIsValid (hasPIN) {
    this.setState({ hasPIN })
  }

  callLogout () {
    this.presenter.logout()
  }

  relogin () {
    this.props.history.push('/')
  }

  onChangeStatusPreEmploymentModal () {
    this.setState({ tempPreEmploymentModal : false  })
  }

  render () {
    const {
      displayShow,
      displayNavIcon,
      displayNavIconState,
      selected,
      onClick,
      profile,
      showLogoutModal,
      showPinEnrollmentModal,
      hasPIN,
      enabledLoader,
      tempPreEmployment,
      tempPreEmploymentModal
    } = this.state

    const { history, login } = this.props

    const style = {
      show: {
          display : displayShow
      }
    }
    const locationPath = history.location.pathname

    return (
      <div className = { 'navigation-body-div' }>
        { super.render() }
        <header className = { 'page-boundary page-boundary--fixed-top' }>
          <DrawerAppBar
            onCallWizard = { () => this.callWizard() }
            onClick = { onClick }
            displayNavIcon = { displayNavIcon } displayShow = { displayShow }
            hide = { () => this.setState({ displayShow : 'block' })}
            show = { () => this.setState({ displayShow : 'none' })} />
        </header>
        <div className="navigation-panels">
          <main
            className = { 'navigation-panel navigation-content' }
            role = { 'main' }
            id = { 'navPanId' }>
              {
                hasPIN === 0 &&
                <CommonPinEnrollmentModal
                  hasPIN = { hasPIN }
                  enabledLoader = { enabledLoader }
                  onSubmitPinCode = { (resp) => this.validateInputPIN(resp) }
                  />
              }
              {
                showLogoutModal &&
                <NavigationViewModal
                  logout = { () => this.presenter.logout() }
                  onClose = { () => this.setState({ showLogoutModal : false }) }
                />
              }
              {
                login &&
                <ReloginModal
                  relogin = { () => {
                   this.presenter.relogin()
                  } }
                />
              }
            <Drawer >
              {
                tempPreEmployment === 1 ?
                <Switch>
                  <Route exact path = '/' render = {props =>
                    <NewsFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> }/>
                  <Route path = '/settings' render = { props =>
                    <SettingsFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/preemployment' render = { props =>
                    <PreEmploymentFragment { ...props }
                      onChangeStatusPreEmploymentModal = { () => this.onChangeStatusPreEmploymentModal() }
                      tempPreEmploymentModal = { tempPreEmploymentModal }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/faqs' render = { props =>
                    <FaqFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                </Switch>
                :
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
                  <Route path = '/mybenefits/benefits/education/aid' render = { props =>
                    <EducationAidFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } />}/>
                  <Route path = '/mybenefits/benefits/education/grantplan' render = { props =>
                    <EducationGrantPlanFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } />}/>
                  <Route path = '/mybenefits/benefits/education/grantaid' render = { props =>
                    <EducationGrantAidFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } />}/>
                  <Route path = '/mybenefits/benefits/education/groupaid' render = { props =>
                    <EducationGroupAidFragment { ...props }
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
                  <Route path = '/mybenefits/benefits/medical/scheduling' render = { props =>
                    <MedicalSchedulingFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation }/>}/>
                  <Route path = '/mybenefits/benefits/medical/reimbursement/outpatient' render = { props =>
                    <OutPatientReimbursementFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation }/>}/>
                  <Route path = '/mybenefits/benefits/medical/assistance/maternity' render = { props =>
                    <MaternityAssistanceFragment { ...props }
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
                  <Route path = '/mybenefits/benefits/bereavement/:type' render = { props =>
                    <BereavementFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/mybenefits/benefits/calamity' render = { props =>
                    <CalamityFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/mybenefits' render = { props =>
                    <BenefitsFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/payslip' render = { props =>
                    <Payslip { ...props }
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
                  <Route path = '/onboard' render = { props =>
                    <OnboardingView { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/mycompliance' render = { props =>
                    <ComplianceFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  <Route path = '/phenom' render = { props =>
                    <PhenomFragment { ...props }
                      setSelectedNavigation = { this.setSelectedNavigation } /> } />
               </Switch>
              }
            </Drawer>
          </main>
          <aside
            className ="left-side"
            style = { style.show }>
            <SideBar
              tempPreEmployment = { tempPreEmployment }
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
  notify : state.notify.notify,
})


export default ConnectView(connect(mapStateToProps)(NavigationView), Presenter)
