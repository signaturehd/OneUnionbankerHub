import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/OutPatientReimbursementPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
//import ConfirmationModal from './modal/EducationGrantAidReviewModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from './components/OutPatientReimbursementFormCardComponent'

import { RequiredValidation, MoneyValidation } from '../../utils/validate'

class OutPatientReimbursementFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      enabledLoader : false
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/medical')
  }

  render () {
    const {
      enabledLoader
    } = this.state

    return (
      <div>
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>
            OUTPATIENT REIMBURSEMENT
          </h2>
        </div>
        {
          enabledLoader ?
          <center className = { 'circular-loader-center' }>
            <CircularLoader show = { enabledLoader }/>
          </center> :
          <FormComponent
            presenter = { this.presenter }
          />
        }
      </div>
    )
  }
}

export default ConnectView(OutPatientReimbursementFragment, Presenter)
