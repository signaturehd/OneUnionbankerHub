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
import EducationBackgroundFragment
  from '../preemploymentfragment/education/EducationBackgroundFragment'
import WorkExperienceFragment
  from '../preemploymentfragment/workexperience/WorkExperienceFragment'
import CharacterReferenceFragment
  from '../preemploymentfragment/characterreference/CharacterReferenceFragment'
import NbiClearanceFragment
  from '../preemploymentfragment/nbiclearance/NbiClearanceFragment'
import CommunityTaxFragment
  from '../preemploymentfragment/communitytax/CommunityTaxFragment'
import BspCertificationFragment
  from '../preemploymentfragment/bspcertification/BspCertificationFragment'
import SSSFragment
  from '../preemploymentfragment/sss/SSSFragment'
import TinFragment
  from '../preemploymentfragment/tin/TinFragment'
import PhilHealthFragment
  from '../preemploymentfragment/philhealth/PhilHealthFragment'
import PagibigFragment
  from '../preemploymentfragment/pagibig/PagibigFragment'
/* Modal */
import IsFinancialObilgationConfirmModal
  from './modals/IsFinancialObilgationConfirmModal'

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
  const percentageTemp = (pageNumber / 11) * 100
  const percentage = parseInt(percentageTemp)
  const biographicalArray = props.biographicalArray
  if (props.preEmpPage === 0) {
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
    return <EducationBackgroundFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 4) {
    return <WorkExperienceFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 5) {
    return <CharacterReferenceFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 6) {
    return <NbiClearanceFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 7) {
    return <CommunityTaxFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 8) {
    return <BspCertificationFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 9) {
    return <SSSFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 10) {
    return <TinFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 11) {
    return <PhilHealthFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 12) {
    return <PagibigFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else {
    return <AffirmationDocumentFragment
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
      preEmploymentData : [],
      biographicalArray : []
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
      form.id === id &&
      formArray.push({
        id : form.id,
        name : form.name,
        url : form.url
      })
    })
    return formArray
  }

  getBiographicalData() {
    this.setState({ biographicalArray : this.getFormData(1) })
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
    } else {
      this.setState({ preEmpPage : index })
    }
  }

  decerementPage () {
    const index = this.state.preEmpPage - 1
    if(index === 1) {
      this.setState({ showFinancialObligationModal : true })
    } else {
      this.setState({ preEmpPage : index })
    }
  }

  render() {
    const {
      setSelectedNavigation,
      selected,
      tempPreEmploymentModal,
      history,
      onChangeStatusPreEmploymentModal,
      checkPEUndertaking
    } = this.props

    const {
      isDismisable,
      enabledLoader,
      preEmpPage,
      showFinancialObligationModal,
      preEmploymentData,
      biographicalArray
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
        !tempPreEmploymentModal &&
        <Modal
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
                  <h2 className = { 'unionbank-color font-weight-bold' }>Welcome to Unionbank!</h2>
                  <br/>
                  <GenericButton
                    className = { 'pre-emp-setup-button' }
                    text = { 'SETUP MY ACCOUNT' }
                    onChange = { () =>
                      onChangeStatusPreEmploymentModal()
                      }
                   />
                 <br/>
                  <h2>Your journey as an individual with a higher purpose now begins. It is in our DNA to be bold, smart, agile and driven. Now, it's your turn to take the lead, set the bar, rewrite the rules, and seize bold opportunities. Unleash your inner potential and hustle like a boss as you thrive in our guild. Driven by our vision, together, let us own the future. </h2>
                  <br/>
                  <h2>We're stoked to have you onboard, UnionBanker!</h2>
                </div>
                <div className = { 'pre-rest' }></div>
              </label>
            </div>
          </div>
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
            <PreEmploymentFragments
              biographicalArray = { this.getFormData(1) }
              preEmpPage = { preEmpPage }
              onSendPageNumberToView = { (preEmpPage) => this.onSendPageNumberToView(preEmpPage) }
              />
            }
            <br/>
            <div className = { 'grid-global' }>
              {
                preEmpPage !== 0 ?
                <GenericButton
                  className = { 'global-button' }
                  text = { 'Previous' }
                  onChange = { () => this.decerementPage() } /> :
                <div></div>
              }
              <GenericButton
                className = { 'global-button' }
                text = { 'Next' }
                onChange = { () => this.incrementPage() } />
            </div>
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
