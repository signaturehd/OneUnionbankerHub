import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/EducationGroupAidPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import {
  CircularLoader,
  SingleInputModal } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import ConfirmationModal from './modals/EducationGroupAidReviewModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from './components/EducationGroupAidFormCardComponent'
import moment from 'moment'

class EducationGroupAidFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showNoticeModal : false,
      showConfirmation : false,
      showDependentModal : false,
      showDOPModal : false,
      showNoticeResponseModal : false,
      enabledLoader : false,
      showBenefitFeedbackModal : false,
      data : '',
      grantId : '',
      grantType : '',
      grantAmount : '',
      dependent : '',
      company : '',
      desiredAmount : '',
      durationOfPayment : '',
      grantPlan : [],
      attachmentsData : [],
      attachmentArray : [],
      effectivityDate : moment(),
      noticeResponse : null,
      attachment : null
    }
  }

  showDependentModal (showDepedendent) {
    this.setState({ showDepedendent })
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateGroupAid()
  }

  confirmation (showConfirmation, data) {
    if (data.dependent === '') {
      store.dispatch(NotifyActions.addNotify({
          title : 'Education Group - Plan',
          message : 'Please double check your dependents',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (data.company.trim() == '') {
      store.dispatch(NotifyActions.addNotify({
          title : 'Education Group - Plan',
          message : 'Please double check your company',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (data.desiredAmount.trim() === '' || data.desiredAmount === '0') {
      store.dispatch(NotifyActions.addNotify({
          title : 'Education Group - Plan',
          message : 'Please double check your desired amount',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (data.durationOfPayment === '') {
      store.dispatch(NotifyActions.addNotify({
          title : 'Education Group - Plan',
          message : 'Please double check your duration of payment',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (!data.file1 || !data.imagePreviewUrl1) {
      store.dispatch(NotifyActions.addNotify({
          title : 'Education Group - Plan',
          message : 'Please double check your attachments',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (!data.file2 || !data.imagePreviewUrl2) {
      store.dispatch(NotifyActions.addNotify({
          title : 'Education Group - Plan',
          message : 'Please double check your attachments',
          type : 'warning',
          duration : 2000
        })
      )
    } else {
      this.setState({showConfirmation, data})
    }
  }

  setGrantPlan (grantPlan) {
    this.setState({ grantPlan })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  noticeOfUndertaking (noticeResponse) {
  this.setState({ showNoticeModal : true, showConfirmation: false, noticeResponse })
  }

  noticeResponse (noticeResponse) {
    this.setState({ showConfirmation: false, noticeResponse })
  }

  submitForm (dependentId, desiredAmount, effectiveDate, company, durationOfPaymentId, file1, file2) {
    this.presenter.addGroupAid(dependentId, desiredAmount, effectiveDate, company, durationOfPaymentId, file1, file2)
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/education')
  }

  render () {
    const {
      showNoticeModal,
      showConfirmation,
      showDependentModal,
      showDOPModal,
      noticeResponse,
      showNoticeResponseModal,
      enabledLoader,
      grantPlan,
      grantId,
      grantType,
      grantAmount,
      attachment,
      showBenefitFeedbackModal,
      data,
      dependent,
      company,
      desiredAmount,
      durationOfPayment,
      effectivityDate,
      attachmentsData
    } = this.state

    return (
      <div>
        {
          showConfirmation &&
          <ConfirmationModal
            data = { data }
            attachments = { grantPlan.attachments }
            submitForm = { (d1, d2, d3, d4, d5, d6, d7) =>
              this.submitForm(d1, d2, d3, d4, d5, d6, d7) }
            onClose = { () => this.setState({ showConfirmation : false }) }
          />
        }

        {
          showNoticeModal &&
          <NoticeModal
            onClose = { () => this.setState({ showNoticeModal : false })}
            noticeResponse = { noticeResponse }
            benefitId = { '12' }
            onDismiss = { (showNoticeModal, noticeResponse) =>
              this.setState({ showNoticeModal, noticeResponse, showNoticeResponseModal : true })  }
          />
        }

        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose = { () => {
              this.setState({ showNoticeResponseModal : false, showBenefitFeedbackModal : true })
            }}
            noticeResponse = { noticeResponse }
          />

        }

        {
          showBenefitFeedbackModal &&
          <BenefitFeedbackModal
            benefitId = { '12' }
            onClose = { () => {
              this.props.history.push('/mybenefits/benefits/education'),
              this.setState({ showBenefitFeedbackModal : false })
            }}
          />
        }

        {
          showDependentModal &&
          <SingleInputModal
            label = { 'Dependents' }
            inputArray = { grantPlan }
            selectedArray = { (dependent) =>
              this.setState({
                dependent,
                showDependentModal : false,
                dependentErrorMessage : ''
              })
            }
            onClose = { () => this.setState({ showDependentModal : false }) }
          />
        }

        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>
            Education Group - Plan
          </h2>
        </div>
        {
          enabledLoader ?
           <center className = { 'circular-loader-center' }>
             <CircularLoader show = { enabledLoader }/>
           </center> :
          <FormComponent
            grantPlan = { grantPlan }
            showDepedendentFunc = { (resp) => this.showDependentModal(resp) }
            attachmentsData = { attachmentsData }
            onClick = {
              (showConfirmation, data) => {
                this.confirmation(showConfirmation, data)
              }
            }
            presenter = { this.presenter }
          />
        }
      </div>
    )
  }
}

export default ConnectView(EducationGroupAidFragment, Presenter)
