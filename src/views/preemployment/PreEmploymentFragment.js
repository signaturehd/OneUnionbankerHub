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
  const percentageTemp = (pageNumber / 17) * 100
  const percentage = parseInt(percentageTemp)
  const biographicalArray = props.biographicalArray
  const sssArray = props.sssArray
  const tinArray = props.tinArray
  const educationVerificationForm = props.educationVerificationForm
  const birthCertifArray = props.birthCertifArray
  const nbiArray = props.nbiArray
  const bir1902Array = props.bir1902Array
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
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 11) {
    return <TinFragment
      tinArray = { tinArray }
      percentage = { percentage }
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
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 14) {
    return <PagibigFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 15) {
    return <PagIbigLoanFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 16) {
    return <PersonnelSignatureFragment
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
      preEmpPage  : 0,
      showFinancialObligationModal: false,
      showTaxPayerIdentificationModal: false,
      showPagibigLoanModal : false,
      showMarriedConfirmModal : false,
      showChildrenConfirmModal : false,
      preEmploymentData : [],
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(11)
    this.presenter.getPreEmploymentForm()
  }

  checkedPreEmploymentForm (preEmploymentData) {
    this.setState({ preEmploymentData })
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
    } else if (index === 11) {
      this.setState({ showTaxPayerIdentificationModal : true })
    } else if (index === 15) {
      this.setState({ showPagibigLoanModal : true })
    } else if (index === 17) {
      this.setState({ showMarriedConfirmModal : true })
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
    } else {
      this.setState({ preEmpPage : index })
    }
  }

  skipPage () {
    this.props.onChangeStateGoBenefits(1)
  }

  render() {
    const {
      setSelectedNavigation,
      selected,
      tempPreEmploymentModal,
      history,
      onChangeStatusPreEmploymentModal,
      checkPEUndertaking,
      onClose
    } = this.props

    const {
      isDismisable,
      enabledLoader,
      preEmpPage,
      showFinancialObligationModal,
      showTaxPayerIdentificationModal,
      showPagibigLoanModal,
      showMarriedConfirmModal,
      preEmploymentData,
      showChildrenConfirmModal
    } = this.state

    return(
      <div>
      { super.render() }
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
        tempPreEmploymentModal &&
        <Modal
          isDismisable = { true }
          onClose = { onClose }
          boxShadow = { 'none' }
          backgroundColor = { 'transparent' }
          width = { 50 }>
          <div className = { 'pre-container' }>
            <div className = { 'pre-env' }>
              <label for = { 'open-env' }>
                <input
                  type='checkbox'
                  id='open-env' />
                <label
                  className = { 'pre-top' }
                  for = { 'open-env' }>
                </label>
                <div className = { 'pre-content' }>
                  <h2 className = { 'unionbank-color font-weight-bold font-size-14px' }>Welcome to Unionbank!</h2>
                  <h2 className = { 'font-size-12px' } >Your journey as an individual with a higher purpose now begins. It is in our DNA to be bold, smart, agile and driven. Now, it&#39;s your turn to take the lead, set the bar, rewrite the rules, and seize bold opportunities. Unleash your inner potential and hustle like a boss as you thrive in our guild. Driven by our vision, together, let us own the future. </h2>
                  <h2 className = { 'font-size-12px' }>We&#39;re stoked to have you onboard, UnionBanker!</h2>
                </div>
                <div className = { 'pre-rest' }></div>
              </label>
            </div>
          </div>
          <br/>
          <center className = { 'open-env' } >
            <GenericButton
              className = { 'pre-emp-setup-button' }
              text = { 'SETUP MY ACCOUNT' }
              onClick = { () =>
                onChangeStatusPreEmploymentModal()
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
               <PreEmploymentFragments
                biographicalArray = { this.getFormData(1) }
                birthCertifArray = { this.getFormData(2) }
                educationVerificationForm = { this.getFormData(3) }
                nbiArray = { this.getFormData(6) }
                sssArray = { this.getFormData(10) }
                tinArray = { this.getFormData(11) }
                bir1902Array = { this.getFormData(12) }
                preEmpPage = { preEmpPage }
                onSendPageNumberToView = { (preEmpPage) => this.onSendPageNumberToView(preEmpPage) }
                />
                 <br/>
              <div className = { 'grid-global-columns-x3' }>
                {
                  preEmpPage !== 0 ?
                  <GenericButton
                    className = { 'global-button' }
                    text = { 'Previous' }
                    onClick = { () => this.decerementPage() } /> :
                  <div></div>
                }
                <GenericButton
                  className = { 'global-button' }
                  text = { 'Skip' }
                  onClick = { () => {
                    this.skipPage()
                    history.push('/')
                  } }
                />
                <GenericButton
                  className = { 'global-button' }
                  text = { 'Next' }
                  onClick = { () => this.incrementPage() } />
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
}

PreEmploymentFragment.defaultProps = {
  selected : -1
}

export default ConnectView(PreEmploymentFragment, Presenter)
