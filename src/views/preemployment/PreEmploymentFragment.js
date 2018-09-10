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

  if (props.preEmpPage === 0) {
    return <AffirmationDocumentFragment
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 1) {
    return <FinancialObligationFragment
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 2 ) {
    return <BiographicalDataFragment
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else if (pageNumber === 3) {
    return <EducationBackgroundFragment
      onSendPageNumberToView = { onSendPageNumberToView }
      />
  } else {
    onSendPageNumberToView(pageNumber)
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
