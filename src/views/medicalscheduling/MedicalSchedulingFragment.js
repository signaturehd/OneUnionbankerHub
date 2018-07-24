import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/MedicalSchedulingPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import { CircularLoader } from '../../ub-components/'
import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
//import ConfirmationModal from './modal/EducationGrantAidReviewModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'
import store from '../../store'
import { NotifyActions } from '../../actions'
import FormComponent from './components/MedicalSchedulingFormCardComponent'
import { RequiredValidation, MoneyValidation } from '../../utils/validate'

class MedicalSchedulingFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      enabledLoader : false
    }
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/education')
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
            Medical Scheduling
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

export default ConnectView(MedicalSchedulingFragment, Presenter)
