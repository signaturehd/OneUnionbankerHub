import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/NavigationPresenter'
/* Modules Fragment */
import BenefitsFragment from '../benefits/BenefitsFragment'
import NewsFragment from '../news/NewsFragment'
import HomeFragment from '../home/HomeFragment'
import FaqFragment from '../faq/FaqFragment'
import SettingsFragment from '../settings/SettingsFragment'
import PodcastFragment from '../podcast/PodcastFragment'
import LibraryFragment from '../library/LibraryFragment'
import MyLearningView from '../mylearning/MyLearningView'
import FeedbackFragment from '../Feedback/FeedbackFragment'
import ComplianceFragment from '../compliance/ComplianceFragment'
import PhenomFragment from '../phenom/PhenomFragment'

/*Rewards and Recognition */
import RewardsRecognitionFragment from '../rewards/RewardsFragment'
import GiftsFragment from '../gifts/GiftsFragment'
import GiftsDetailsFragment from '../giftsdetails/GiftsDetailsFragment'

/* Navigation Drawer Component*/
import DrawerAppBar from './components/appbar/DrawerAppBar'
import SideBar from './components/sidebar/SideBar'
import Drawer from './components/drawer/Drawer'

import './styles/drawerview.css'

import { connect } from 'react-redux'

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
import VaccineFragment from '../vaccine/VaccineFragment'
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

/* Pre Employment */
import PreEmploymentFragment from '../preemployment/PreEmploymentFragment'
import AddingDependentsFragment
  from '../dependents/AddingDependentsFragment'
import ChildrenFragment
  from '../preemploymentfragment/childrenform/ChildrenFragment'
import SpouseFragment
  from '../preemploymentfragment/spouseform/SpouseFormFragment'
import ParentFragment
  from '../preemploymentfragment/parentform/ParentFragment'

/* Post Employment */
import PostEmploymentFragment from '../postemployment/PostEmploymentFragment'

/* Laptop Lease */
import LaptopLeaseFragment from '../laptoplease/LaptopLeaseFragment'

/* Event Budget Requisition */

import EventsBudgetFragment from '../eventbudget/EventsBudgetFragment'
/* Travel */
import TravelFragment from '../travel/TravelFragment'
import RequestFlightFragment from '../request/RequestFlightFragment'
import BookFlightFragment from '../bookflight/BookFlightFragment'
import LiquidationFragment from '../liquidation/LiquidationFragment'
import ApprovalFragment from '../approval/ApprovalFragment'

/* Certificate of Employment*/
import CertificateOfEmploymentFragment from '../coe/CertificateOfEmploymentFragment'

/* Goals */
import MyGoalsFragment from '../mygoals/MyGoalsFragment'
import RequestedGoalsFragment from '../requestedgoals/RequestedGoalsFragment'
import ApprovalGoalsFragment from '../approvalgoals/ApprovalGoalsFragment'

/* Pension Funds */
import PensionFundsFragment from '../pensionfunds/PensionFundsFragment'

/* New Employee Hire */
import NewEmployeeHireFragment from '../neo/NewEmployeeHireFragment'

// Squads and Workforce
import SquadsTabsFragment from '../squadsworkforce/SquadsTabsFragment'

/* Modals */
import NavigationViewModal from './modal/NavigationViewModal'
import ReloginModal from './modal/ReloginModal'
import CommonPinEnrollmentModal from './modal/CommonPinEnrollmentModal'

// footer

import BaseFooterComponent from '../common/components/BaseFooterComponent'

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
      profileHasCOC: '',
      tempPreEmploymentModal: false,
      hasFilledOut: '',
      preEmploymentStatus: null,
      isLineManager : false,
      isPO : false,
      employeeNumber : '',
      profileDisplay : 'none',
      profillePosition: '',
      agreementBool: null
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
    this.setState({
      rewardsPoints: profile && profile.badgesAndPoints && profile.badgesAndPoints.redeemablePoints,
      profile : profile && profile.employee,
      isLineManager: profile && profile.isLineManager,
      isPO: profile && profile.isPO,
      profillePosition: profile && profile.employee && profile.employee.position,
      employeeNumber: profile && profile.employee && profile.employee.employeeNumber
    })
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

  showAgreementStatus (agreementBool) {
    this.setState({ agreementBool })
  }

  validateInputPIN (e) {
    if(e.length > 5 || e.length < 5) {}
    else {
      this.presenter.postEnrollPin(e)
    }
  }

  showPreemploymentStatus (data) {
    const status = data && data.id
    const statusName = data && data.status
    this.setState({ preEmploymentStatus : status })

    if(status === 1 || status === 2) {
      this.props.history.push('/preemployment')
    } else if (status === null || status === 6) {
      this.props.history.push('/')
    } else if (status === 3 || status === 4 || status === 5) {
      this.props.history.push('/postemployment')
    }
  }

  componentDidMount () {
    const {
      preEmploymentStatus,
    } = this.state

    this.presenter.getPreEmploymentStatus()
    this.presenter.getLibraries()

    const mediaQuery = window.matchMedia('(min-width: 1300px)')
      if (mediaQuery.matches) {
        this.setDisplay('none', 'none')
      } else {
        this.setDisplay('none', 'block')
      }
        mediaQuery.addListener(mq => {
      if (mq.matches) {
        this.setDisplay('none', 'none')
      } else {
        this.setDisplay('none', 'block')
      }
    })
    this.checkWidthNavigation()
  }

  checkWidthNavigation() {
    const width = document.body.offsetWidth
    if(width <= 768) {
      this.setState({ storeWidth : width - 100 })
    } else if (width >= 1600) {
      this.setState({ storeWidth : width - 170 })
    } else {
      this.setState({ storeWidth : width - 140 })
    }
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

  isHasCOC (profileHasCOC) {
    this.setState({ profileHasCOC })
  }

  relogin () {
    this.props.history.push('/')
  }

  skipPage (e) {
    this.setState({ preEmploymentStatus : e })
  }

  hideProfileMenu(){
    this.setState({ profileDisplay : 'none' })
  }

  render () {
    const {
      profileDisplay,
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
      profileHasCOC,
      tempPreEmploymentModal,
      hasFilledOut,
      preEmploymentStatus,
      isLineManager,
      isPO,
      employeeNumber,
      profillePosition,
      storeWidth,
      agreementBool,
      rewardsPoints
    } = this.state

    const { history, login, profilePicture } = this.props
    const style = {
      show: {
        display : displayShow
      }
    }

    const locationPath = history.location.pathname
    const name = profile && profile.fullname ? profile.fullname : 'Empty Empty'
    let initials = []
    let splitUserInitial
    name &&
    name.split(' ').map((newName, key) => {
      const length = newName.length
      if(length > 0) {
        for(var i = 0; i < length; i++) {
          if(newName === undefined) {
            delete newName[key].newName[key]
          } else {
            newName.split().map((letters, key) =>
              initials.push(letters[0])
            )
          }
        }
      }
    })
    const fullName = name && name.split(' ')
    let firstName = fullName && fullName[0]
    splitUserInitial = initials[0] + initials[initials.length - 1]

    return (
      <div
        className = { 'navigation-body-div' }>
        { super.render() }
        <header className = { 'page-boundary page-boundary--fixed-top' }>
          <DrawerAppBar
            hideProfileMenu = { () => this.hideProfileMenu() }
            tempPreEmployment = { preEmploymentStatus }
            selected={ selected }
            splitUserInitial = { splitUserInitial }
            profillePosition = { profillePosition }
            firstName = { firstName }
            history = { history }
            profileImage = { profilePicture }
            displayNavIcon = { displayNavIcon }
            profileDisplay = { profileDisplay }
            displayShow = { displayShow }
            hide = { () => this.setState({ displayShow : 'block' })}
            show = { () => this.setState({ displayShow : 'none' }) }
            profileDisplayFunc = { (profileDisplay) => this.setState({ profileDisplay }) }
            onHideChangeDisplay = { () => this.setState({ profileDisplay : 'block' }) }
            onShowChangeDisplay = { () => this.setState({ profileDisplay : 'none' }) }
            onCallWizard = { () => this.callWizard() }
            logout = { () => this.setState({ showLogoutModal : true }) }/>
        </header>
        <div
          className="navigation-panels"
          onClick = { () => this.hideProfileMenu() }>
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
            <Drawer  >
              <Switch>
                <Route exact path = '/' render = {props =>
                  <HomeFragment
                    storeWidth = { storeWidth }
                    { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> }/>
                <Route path = '/postemployment' render = { props =>
                  <PostEmploymentFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/preemployment' render = { props =>
                  <PreEmploymentFragment { ...props }
                    onBoardingSkipPage = { (e) => this.skipPage(e)}
                    preEmploymentStatus = { preEmploymentStatus }
                    tempPreEmploymentModal = { tempPreEmploymentModal }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/dependent' render = { props =>
                  <AddingDependentsFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path='/dependentchildren' render={ props => <ChildrenFragment{ ...props }
                  reuse = { true }
                  setSelectedNavigation = { this.setSelectedNavigation }  />}/>
                <Route path='/dependentspouse' render={ props => <SpouseFragment{ ...props }
                  reuse = { true }
                  setSelectedNavigation = { this.setSelectedNavigation }  />}/>
                <Route path='/dependentsiblings' render={ props => <ParentFragment{ ...props }
                  reuse = { true }
                  setSelectedNavigation = { this.setSelectedNavigation }  />}/>
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
                    allowsManagerCheck = { profile && profile.allowManagersCheck }
                    setSelectedNavigation = { this.setSelectedNavigation } />}/>
                <Route path = '/mybenefits/benefits/medical/optical' render = { props =>
                  <OpticalFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } />}/>
                <Route path = '/mybenefits/benefits/medical/reimbursement/dental' render = { props =>
                  <DentalReimbursement { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation }/>}/>
                  <Route path = '/mybenefits/benefits/medical/reimbursement/outpatient' render = { props =>
                  <OutPatientReimbursementFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation }/>}/>
                <Route path = '/mybenefits/benefits/medical/loa/dental' render = { props =>
                  <DentalLoaView { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation }/>}/>
                <Route path = '/mybenefits/benefits/medical/scheduling' render = { props =>
                  <MedicalSchedulingFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation }/>}/>
                <Route path = '/mybenefits/benefits/medical/assistance/maternity' render = { props =>
                  <MaternityAssistanceFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/mybenefits/benefits/loans/housingassistance' render = { props =>
                  <HousingAssistanceFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/mybenefits/benefits/carlease/new' render = { props =>
                  <CarLeaseNewFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/mybenefits/benefits/carlease/old' render = { props =>
                  <CarLeaseOldFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/mybenefits/benefits/laptoplease' render = { props =>
                  <LaptopLeaseFragment { ...props }
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
                  <Route path = '/mybenefits/benefits/eventbudgetrequisition' render = { props =>
                  <EventsBudgetFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/mybenefits' render = { props =>
                  <BenefitsFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/mytravel/travel/request' render = { props =>
                  <RequestFlightFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/mytravel/travel/book' render = { props =>
                  <BookFlightFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/mytravel/travel/liquidation' render = { props =>
                  <LiquidationFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/mytravel/approval' render = { props =>
                  <ApprovalFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/mytravel' render = { props =>
                  <TravelFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation }
                    isLineManager = { isLineManager } /> } />
                <Route path = '/coe' render = { props =>
                  <CertificateOfEmploymentFragment
                  { ...props }
                  setSelectedNavigation = { this.setSelectedNavigation } /> }/>
                <Route path = '/payslip' render = { props =>
                  <Payslip { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/faqs' render = { props =>
                  <FaqFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/settings' render = { props =>
                  <SettingsFragment { ...props }
                    profileImage = { profilePicture }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/mylearning' render = { props =>
                  <MyLearningView { ...props }
                    profile = { profile }
                    setSelectedNavigation = { this.setSelectedNavigation }/> } />
                <Route path = '/mygoals/' render = { props =>
                  <MyGoalsFragment { ...props }
                    profile = { profile }
                    setSelectedNavigation = { this.setSelectedNavigation }
                    isLineManager = { isLineManager }
                    isPO = { isPO }
                    employeeNumber = { employeeNumber }/> } />
                <Route path = '/feedback' render = { props =>
                  <FeedbackFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/mycompliance' render = { props =>
                  <ComplianceFragment { ...props }
                    profileHasCOC = { profileHasCOC }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/phenom' render = { props =>
                  <PhenomFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/myrewards' render = { props =>
                  <RewardsRecognitionFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/gifts' render = { props =>
                  <GiftsFragment { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/rewardgifts/details/:id' render = { props =>
                  <GiftsDetailsFragment { ...props }
                    rewardsPoints = { rewardsPoints }
                    getProfileFunc = { () => this.presenter.getLibraries() }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/pensionfunds' render = { props =>
                  <PensionFundsFragment { ...props }
                    agreementBool = { agreementBool }
                    getProfileFunc = { () => this.presenter.getLibraries() }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  {
                    // <Route path = '/neo' render = { props =>
                    //   <NewEmployeeHireFragment { ...props }
                    //     setSelectedNavigation = { this.setSelectedNavigation } /> } />
                  }
                <Route path = '/squads/' render = { props =>
                  <SquadsTabsFragment { ...props }
                    profile = { profile }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
               </Switch>
            </Drawer>
            <br/>
            <BaseFooterComponent
              preEmploymentStatus = { preEmploymentStatus }
              history = { history }/>
          </main>
          <aside
            className ="left-side"
            style = { style.show }>
            <SideBar
              splitUserInitial = { splitUserInitial }
              tempPreEmployment = { preEmploymentStatus }
              logout = { () => this.setState({ showLogoutModal : true }) }
              selected={ selected }
              profile = { profile }
              profileImage = { profilePicture }
              history = { history } >
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
  profilePicture: state.profile,
  notify : state.notify.notify,
})


export default ConnectView(connect(mapStateToProps)(NavigationView), Presenter)
