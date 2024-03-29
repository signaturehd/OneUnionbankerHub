import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/EducationGrantPlanPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import ConfirmationModal from './modal/EducationGrantPlanReviewModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from './components/EducationGrantPlanFormCardComponent'

class EducationGrantPlanFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showNoticeModal : false,
      showConfirmation : false,
      noticeResponse : null,
      showNoticeResponseModal : false,
      enabledLoader : false,
      grantPlan : [],
      grantId : '',
      grantType : '',
      grantAmount : '',
      file : null,
      imagePreviewUrl : null,
      showBenefitFeedbackModal : false
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateGrantPlan()
  }

  confirmation (showConfirmation, grantId, grantType, grantAmount, file, imagePreviewUrl) {
    if (grantType === '') {
      store.dispatch(NotifyActions.addNotify({
          title : 'education Grant - Plan',
          message : 'Please double check your type of grant',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (grantAmount === 0 || grantAmount === '') {
      store.dispatch(NotifyActions.addNotify({
          title : 'education Grant - Plan',
          message : 'Please double check your grant amount',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (!file) {
      store.dispatch(NotifyActions.addNotify({
          title : 'education Grant - Plan',
          message : 'Please double check your attachments',
          type : 'warning',
          duration : 2000
        })
      )
    } else {
      this.setState({
        showConfirmation,
        grantId,
        grantType,
        grantAmount,
        file,
        imagePreviewUrl
      })
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

  submitForm (grantId, grantAmount, file) {
    this.presenter.addGrantPlan(grantId, file)
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/education')
  }

  render () {
    const {
      showNoticeModal,
      showConfirmation,
      noticeResponse,
      showNoticeResponseModal,
      enabledLoader,
      grantPlan,
      grantId,
      grantType,
      grantAmount,
      file,
      imagePreviewUrl,
      showBenefitFeedbackModal
    } = this.state

    return (
      <div>
        {
          showConfirmation &&
          <ConfirmationModal
            grantPlan = { grantPlan }
            grantId = { grantId }
            grantType = { grantType }
            grantAmount = { grantAmount }
            file = { file }
            imagePreviewUrl = { imagePreviewUrl }
            submitForm = { (grantId, grantAmount, file) =>
              this.submitForm(grantId, grantAmount, file) }
            onClose = { () => this.setState({ showConfirmation : false }) }
          />
        }

        {
          showNoticeModal &&
          <NoticeModal
            onClose = { () => this.setState({ showNoticeModal : false })}
            noticeResponse = { noticeResponse }
            benefitId = { '32' }
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
            benefitId = { '32' }
            onClose = { () => {
              this.props.history.push('/mybenefits/benefits/education'),
              this.setState({ showBenefitFeedbackModal : false })
            }}
          />
        }

        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>
            Education Grant - Plan
          </h2>
        </div>
        {
          enabledLoader ?
           <center className = { 'circular-loader-center' }>
             <CircularLoader show = { enabledLoader }/>
           </center> :
          <FormComponent
            grantPlan = { grantPlan }
            onClick = {
              (showConfirmation, grantId, grantType, grantAmount, file, imagePreviewUrl) => {
                this.confirmation(showConfirmation, grantId, grantType, grantAmount, file, imagePreviewUrl)
              }
            }
            presenter = { this.presenter }
          />
        }
      </div>
    )
  }
}

export default ConnectView(EducationGrantPlanFragment, Presenter)
