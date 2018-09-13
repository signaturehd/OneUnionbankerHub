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
  }
  else if (pageNumber === 5) {
    return <NbiClearanceFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 6) {
    return <CommunityTaxFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 7) {
    return <BspCertificationFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 8) {
    return <SSSFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 9) {
    return <TinFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 10) {
    return <PhilHealthFragment
      percentage = { percentage }
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 11) {
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
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(11)
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
      showFinancialObligationModal
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
        tempPreEmploymentModal &&
        <Modal>
          <center>
            <h2 className = { 'font-weight-bold font-size-24px' }>Hello</h2>
            <br/>
            <h2 className = { 'unionbank-color font-weight-lighter font-size-18px' }>
              Welcome to Unionbank!
            </h2>
            <br/>
            <br/>
          </center>
          <div className = { 'text-align-right' }>
            <GenericButton
              className = { 'pre-emp-setup-button' }
              text = { 'SETUP MY ACCOUNT' }
              onClick = { () =>
                onChangeStatusPreEmploymentModal()
                }
             />
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
                  onClick = { () => this.decerementPage() } /> :
                  <div></div>
              }
              <GenericButton
                className = { 'global-button' }
                text = { 'Next' }
                onClick = { () => this.incrementPage() } />
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
