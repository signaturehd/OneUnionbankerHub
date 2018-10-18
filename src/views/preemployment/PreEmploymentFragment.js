import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

/* Fragment */
import AffirmationDocumentFragment
  from '../preemploymentfragment/affirmdocument/AffirmationDocumentFragment'
import FinancialObligationFragment
  from '../preemploymentfragment/financialobligation/FinancialObligationFragment'
import BiographicalDataFragment
  from '../preemploymentfragment/biographicaldata/BiographicalDataFragment'
import BirthCertificateFragment
  from '../preemploymentfragment/birthcertificate/BirthCertificateFragment'
import EducationBackgroundFragment
  from '../preemploymentfragment/education/EducationBackgroundFragment'
import WorkExperienceFragment
  from '../preemploymentfragment/workexperience/WorkExperienceFragment'
import CharacterReferenceFragment
  from '../preemploymentfragment/characterreference/CharacterReferenceFragment'
import NbiClearanceFragment
  from '../preemploymentfragment/nbiclearance/NbiClearanceFragment'
import AuthorizationBackgroundCheckFragment
  from '../preemploymentfragment/authorizationbackgroundcheck/AuthorizationBackgroundCheckFragment'
import CommunityTaxFragment
  from '../preemploymentfragment/communitytax/CommunityTaxFragment'
import BspCertificationFragment
  from '../preemploymentfragment/bspcertification/BspCertificationFragment'
import SSSFragment
  from '../preemploymentfragment/sss/SSSFragment'
import TinFragment
  from '../preemploymentfragment/tin/TinFragment'
import Bir1902FormFragment
  from '../preemploymentfragment/bir1902form/Bir1902FormFragment'
import PhilHealthFragment
  from '../preemploymentfragment/philhealth/PhilHealthFragment'
import PagibigFragment
  from '../preemploymentfragment/pagibig/PagibigFragment'
import PagIbigLoanFragment
  from '../preemploymentfragment/pagibigloan/PagIbigLoanFragment'
import PersonnelSignatureFragment
  from '../preemploymentfragment/personnelsignature/PersonnelSignatureFragment'
import SpouseFormFragment
  from '../preemploymentfragment/spouseform/SpouseFormFragment'
import ChildrenFragment
  from '../preemploymentfragment/childrenform/ChildrenFragment'
import ParentFragment
  from '../preemploymentfragment/parentform/ParentFragment'
import MedicalAppointmentFragment
  from '../preemploymentfragment/medicalappointment/MedicalAppointmentFragment'
/* Modal */
import IsFinancialObilgationConfirmModal
  from './modals/IsFinancialObilgationConfirmModal'
import IsTaxPayerConfirmModal
  from './modals/IsTaxPayerConfirmModal'
import IsPagIbigLoanConfirmModal
  from './modals/IsPagIbigLoanConfirmModal'
import IsMarriedConfirmModal
  from './modals/IsMarriedConfirmModal'
import IsChildrenConfirmModal
  from './modals/IsChildrenConfirmModal'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card
} from '../../ub-components/'

import Presenter from './presenter/PreEmploymentPresenter'

import './styles/preEmploymentStyle.css'

function  PreEmploymentFragments (props)  {
  const pageNumber = props.preEmpPage
  const onSendPageNumberToView = props.onSendPageNumberToView
  const percentage = props.percentage
  const biographicalArray = props.biographicalArray
  const sssArray = props.sssArray
  const tinArray = props.tinArray
  const educationVerificationForm = props.educationVerificationForm
  const birthCertifArray = props.birthCertifArray
  const nbiArray = props.nbiArray
  const bir1902Array = props.bir1902Array
  const philHealthArray = props.philHealthArray
  const pagibigArray = props.pagibigArray
  const pagibigLoanArray = props.pagibigLoanArray
  const personnelArray = props.personnelArray
  const characterReferenceData = props.characterReferenceData
  const characterReferencePresenter = props.characterReferencePresenter
  const educationData = props.educationData
  const educationPresenter = props.educationPresenter
  const reloadPreEmploymentForm = props.reloadPreEmploymentForm

  if (pageNumber === 0) {
    return <AffirmationDocumentFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 1) {
    return <FinancialObligationFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 2 ) {
    return <BiographicalDataFragment
      biographicalArray = { biographicalArray }
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 3) {
    return <BirthCertificateFragment
      birthCertifArray = { birthCertifArray }
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 4) {
    return <EducationBackgroundFragment
      percentage = { percentage }
      educationData = { educationData }
      educationPresenter = { educationPresenter }
      educationVerificationForm = { educationVerificationForm }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 5) {
    return <WorkExperienceFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 6) {
    return <CharacterReferenceFragment
      percentage = { percentage }
      characterReferenceData = { characterReferenceData }
      characterReferencePresenter = { characterReferencePresenter }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 7) {
    return <NbiClearanceFragment
      nbiArray = { nbiArray }
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 8) {
    return <AuthorizationBackgroundCheckFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  }else if (pageNumber === 9) {
    return <BspCertificationFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 10) {
    return <SSSFragment
      sssArray = { sssArray }
      percentage = { percentage }
      reloadPreEmploymentForm = { reloadPreEmploymentForm }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 11) {
    return <TinFragment
      tinArray = { tinArray }
      percentage = { percentage }
      reloadPreEmploymentForm = { reloadPreEmploymentForm }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 12) {
    return <Bir1902FormFragment
      bir1902Array = { bir1902Array }
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
    />
  } else if (pageNumber === 13) {
    return <PhilHealthFragment
      philHealthArray = { philHealthArray }
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 14) {
    return <PagibigFragment
      pagibigArray = { pagibigArray }
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 15) {
    return <PagIbigLoanFragment
      pagibigLoanArray = { pagibigLoanArray }
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 16) {
    return <PersonnelSignatureFragment
      personnelArray = { personnelArray }
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 17) {
    return <SpouseFormFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
    />
  } else if (pageNumber === 18) {
    return <ChildrenFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
    />
  } else if (pageNumber === 19) {
    return <ParentFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
    />
  } else if (pageNumber === 20) {
    return <MedicalAppointmentFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
    />
  } else {
    return <PagibigFragment
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  }
}

class PreEmploymentFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      welcomeModal : true,
      isDismisable : true,
      enabledLoader: false,
      showFinancialObligationModal: false,
      showTaxPayerIdentificationModal: false,
      showSkipMessage: false,
      showPagibigLoanModal : false,
      showMarriedConfirmModal : false,
      showChildrenConfirmModal : false,
      hideSubmitButton : true,
      preEmploymentData : [],
      characterReferenceData : [],
      educationData : [],
      preEmpPage  : 0,
      percentage : 0,
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(11)
    this.presenter.getPreEmploymentForm()
    this.presenter.getCharacterReference()
    this.presenter.getEmployeeSchool()
    this.presenter.getParents()
  }

  reloadPreEmploymentForm() {
    this.presenter.getPreEmploymentForm()
    this.presenter.getCharacterReference()
    this.presenter.getEmployeeSchool()
    this.presenter.getParents()
  }

  /* Documents */

  checkedPreEmploymentForm (preEmploymentData) {
    this.setState({ preEmploymentData })
  }

  /* Character Reference */
  showCharacterReferenceMap (characterReferenceData) {
    this.setState({ characterReferenceData })
  }

  /* Education */
  showEducationMap (educationData) {
    this.setState({ educationData })
  }

  /* Percentage */

  showPercentageOfPreEmployment (value) {
    this.setState({ percentage : parseInt(value) })
  }

  getFormData (id) {
    let formArray = []
    this.state.preEmploymentData.map((form, key) => {
      form.documentId === id &&
        formArray.push({
          id : form.documentId,
          name : form.documentType,
          status : form.status,
          url : form.url
        })
    })
    return formArray
  }

  hideCircularLoader() {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader() {
    this.setState({ enabledLoader : true })
  }

  onSendPageNumberToView (preEmpPage) {
    const storedPage = this.state.preEmpPage
    if(preEmpPage === null) {
      this.setState({ preEmpPage : storedPage })
    } else {
      this.setState({ preEmpPage })
    }
  }

  incrementPage () {
    const index = this.state.preEmpPage + 1
    if(index === 1) {
      this.setState({ showFinancialObligationModal : true })
      // const index1 = this.state.preEmpPage + 17
      // this.setState({ preEmpPage : index1 })
    } else if (index === 11) {
      this.setState({ showTaxPayerIdentificationModal : true })
    } else if (index === 15) {
      this.setState({ showPagibigLoanModal : true })
    } else if (index === 17) {
      this.setState({ showMarriedConfirmModal : true })
    } else if (index === 18) {
      this.setState({ showChildrenConfirmModal : true })
    } else if (index === 21) {
      this.setState({ hideSubmitButton : false })
    } else {
      this.setState({ preEmpPage : index })
    }
  }

  decerementPage () {
    let index = this.state.preEmpPage - 1
    if(index === 1) {
      this.setState({ preEmpPage : index - 1 })
    } else if (index === 11) {
      this.setState({ preEmpPage : index - 1 })
    } else if (index === 15) {
      this.setState({ preEmpPage : index - 1 })
    } else if (index === 17) {
      this.setState({ preEmpPage : index - 1 })
    } else if (index === 18) {
      this.setState({ preEmpPage : index - 1 })
    } else {
      this.setState({ preEmpPage : index })
    }
  }

  skipPage () {
    this.setState({ showSkipMessage : true })
  }

  render() {
    const {
      setSelectedNavigation,
      selected,
      history,
      checkPEUndertaking,
      onClose,
      onBoardingSkipPage,
    } = this.props

    const {
      welcomeModal,
      isDismisable,
      enabledLoader,
      preEmpPage,
      showFinancialObligationModal,
      showTaxPayerIdentificationModal,
      showSkipMessage,
      showPagibigLoanModal,
      showMarriedConfirmModal,
      preEmploymentData,
      showChildrenConfirmModal,
      hideSubmitButton,
      characterReferenceData,
      educationData,
      percentage,
    } = this.state

    return(
      <div>
      { super.render() }
      {
      showSkipMessage &&
        <Modal>
          <h2 className = { 'font-weight-bold' }>Skip</h2>
          <h2>Do you want to skip pre-employment process? You can still updates this on 1UHub > Drawer > Pre-Employment.</h2>
          <div className = { 'grid-global' }>
            <GenericButton
              onClick = { () => this.setState({ showSkipMessage : false }) }
              text = { 'No' }
              />
            <GenericButton
              onClick = { () => {
                onBoardingSkipPage (0)
                this.props.history.push('/')
                }
              }
              text = { 'Yes' }
              />
          </div>
        </Modal>
      }
      {
        showFinancialObligationModal &&
        <IsFinancialObilgationConfirmModal
          onSendPageNumberToView = { (res) => {
          this.onSendPageNumberToView(res)
          this.setState({ showFinancialObligationModal : false })
        } }
        />
      }
      {
        showTaxPayerIdentificationModal &&
        <IsTaxPayerConfirmModal
          onSendPageNumberToView = { (res) => {
          this.onSendPageNumberToView(res)
          this.setState({ showTaxPayerIdentificationModal : false })
        } }
        />
      }
      {
        showPagibigLoanModal &&
        <IsPagIbigLoanConfirmModal
          onSendPageNumberToView = { (res) => {
          this.onSendPageNumberToView(res)
          this.setState({ showPagibigLoanModal : false })
        } }
        />
      }
      {
        showMarriedConfirmModal &&
        <IsMarriedConfirmModal
          onSendPageNumberToView = { (res) => {
          this.onSendPageNumberToView(res)
          this.setState({ showMarriedConfirmModal : false })
          }}
          showChildrenConfirmModalFunc = { (
            showChildrenConfirmModal,
            showMarriedConfirmModal) =>
            this.setState({
              showChildrenConfirmModal,
              showMarriedConfirmModal
            })
          }
        />
      }
      {
        showChildrenConfirmModal &&
        <IsChildrenConfirmModal
          onSendPageNumberToView = { (res) => {
          this.onSendPageNumberToView(res)
          this.setState({ showChildrenConfirmModal : false })
        } }
        />
      }
      {
        welcomeModal &&
        <Modal
          width = { 50 }>
          {
            // <div className = { 'pre-container' }>
            //   <div className = { 'pre-env' }>
            //     <label for = { 'open-env' }>
            //       <input
            //         type='checkbox'
            //         id='open-env' />
            //       <label
            //         className = { 'pre-top' }
            //         for = { 'open-env' }>
            //       </label>
            //       <div className = { 'pre-content' }>
            //       </div>
            //       <div className = { 'pre-rest' }></div>
            //     </label>
            //   </div>
            // </div>
          }
          <div>
            <center>
              <h2 className = { 'unionbank-color font-weight-bold font-size-18px' }>Welcome to Unionbank!</h2>
            </center>
            <br/>
            <center>
              <h2 className = { 'font-size-16px font-size-normal' } >Your journey as an individual with a higher purpose now begins. It is in our DNA to be bold, smart, agile and driven. Now, it&#39;s your turn to take the lead, set the bar, rewrite the rules, and seize bold opportunities. Unleash your inner potential and hustle like a boss as you thrive in our guild. Driven by our vision, together, let us own the future. </h2>
              <br/>
              <br/>
              <h2 className = { 'font-size-16px font-size-normal' }>We&#39;re stoked to have you onboard, UnionBanker!</h2>
            </center>
          </div>
          <br/>
          <center className = { 'open-env' } >
            <GenericButton
              className = { 'pre-emp-setup-button' }
              text = { 'SETUP MY ACCOUNT' }
              onClick = { () =>
                this.setState({ welcomeModal : false })
              }
           />
          </center>
        </Modal>
      }
      <div className={ 'preemployment-container' }>
        <div></div>
        <div>
          {
            enabledLoader ?
            <center className = { 'circular-loader-center' }>
              <CircularLoader show = { true }/>
            </center>
            :
            <div>
              <div className = { 'text-align-right' }>
                <GenericButton
                  className = { 'global-button pre-employment-button' }
                  text = { 'Skip' }
                  onClick = { () =>
                    this.skipPage()
                  }
                />
              </div>
               <PreEmploymentFragments
                biographicalArray = { this.getFormData(1) }
                birthCertifArray = { this.getFormData(2) }
                educationVerificationForm = { this.getFormData(3) }
                nbiArray = { this.getFormData(6) }
                sssArray = { this.getFormData(10) }
                tinArray = { this.getFormData(11) }
                bir1902Array = { this.getFormData(12) }
                philHealthArray = { this.getFormData(13) }
                pagibigArray = { this.getFormData(14) }
                personnelArray = { this.getFormData(15) }
                pagibigLoanArray = { this.getFormData(16) }
                preEmpPage = { preEmpPage }
                percentage = { percentage }
                reloadPreEmploymentForm = { () => this.reloadPreEmploymentForm() }
                characterReferencePresenter = { () => this.presenter.getCharacterReference() }
                characterReferenceData = { characterReferenceData }
                educationPresenter = { () => this.presenter.getEmployeeSchool() }
                educationData = { educationData }
                onSendPageNumberToView = { (preEmpPage) => this.onSendPageNumberToView(preEmpPage) }
                />
              <br/>
              <div className = { 'grid-global ' }>
                {
                  preEmpPage !== 0 ?
                  <GenericButton
                    className = { 'global-button' }
                    text = { 'Previous' }
                    onClick = { () => this.decerementPage() } /> :
                  <div></div>
                }
                {
                  hideSubmitButton ?
                  <GenericButton
                    className = { 'preemp-next-button' }
                    text = { 'Next' }
                    onClick = { () => this.incrementPage() } />
                    :
                  <div></div>
                }
              </div>
            </div>
            }
        </div>
        <div></div>
      </div>
    </div>
    )
  }
}

PreEmploymentFragment.propTypes = {
  setSelectedNavigation : PropTypes.func,
  selected : PropTypes.number,
  tempPreEmployment : PropTypes.number,
  refreshOptions : PropTypes.func,
}

PreEmploymentFragment.defaultProps = {
  selected : -1
}

export default ConnectView(PreEmploymentFragment, Presenter)
