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
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'
import DependentModal from './modals/DependentsModal'
import DurationOfPremium from './modals/DurationOfPremium'

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from './components/EducationGroupAidFormCardComponent'
import moment from 'moment'

import * as EducationGroupAidFunction from './function/EducationGroupAidFunction'

class EducationGroupAidFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showNoticeModal : false,
      showConfirmation : false,
      showDependent : false,
      showDOPModal : false,
      showNoticeResponseModal : false,
      enabledLoader : false,
      showBenefitFeedbackModal : false,
      showEditSubmitButton : false,
      titleChange : true,
      noticeResponse : null,
      data : '',
      dependentId : '',
      dependentName : '',
      dependentMonths : '',
      dependentErrorMessage : '',
      company : '',
      companyErrorMessage : '',
      desiredAmount : '',
      desiredAmountErrorMessage : '',
      premiumId : '',
      premiumMonths : '',
      premiumDuration : '',
      DOPErrorMessage : '',
      effectiveDate : '',
      effectivityDateText : '',
      grantPlan : [],
      dependentArray : [],
      durationOfPremium : [],
      attachmentsData : [],
      attachmentArray : [],
      effectivityDate : moment(),
    }
  }

  showDependentMap (dependentArray) {
    this.setState({ dependentArray })
  }

  showPremiumMap (durationOfPremium) {
    this.setState({ durationOfPremium })
  }

  showAttachmentsMap (attachmentsData) {
    this.setState({ attachmentsData })
  }

  showValidatedGroupAid (grantPlan) {
    this.setState({ grantPlan })
  }

  showDependentModal (showDependent) {
    this.setState({ showDependent })
  }

  showPremiumModal (showDOPModal) {
    this.setState({ showDOPModal })
  }

  setFileAttachments (attachmentArray) {
    this.setState({ attachmentArray })
  }

  companyFunc (e) {
    const validate = EducationGroupAidFunction.checkedValidateText(e)
    this.setState({ company : validate , companyErrorMessage : '' })
  }

  desiredAmountFunc (e) {
    const validate = EducationGroupAidFunction.checkedDesiredAmountFunc(e)
    this.setState({ desiredAmount: validate ,  desiredAmountErrorMessage: '' })
  }

  dateFunc (date) {
    const { premiumMonths } = this.state
    const eDate = (premiumMonths ? moment(date).add(premiumMonths, 'months') : '')
    const eDateText = date.format('LL') + ( eDate ? ' - ' + eDate.format('LL') : '' )
    this.setState({ effectivityDate : date, effectiveDate: eDate.format('MM-DD-YYYY'), effectivityDateText: eDateText })
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateGroupAid()
  }

  editFormReview (e) {
    this.setState({ showEditSubmitButton : false, titleChange : true })
  }

  validateRequired (e) {
    return EducationGroupAidFunction.checkedValidateInput(e)
  }

  showFormReviewFieldDisabled (e) {
    const {
      dependentId,
      desiredAmount,
      company,
      premiumId,
      attachmentArray
    } = this.state

    if(!this.validateRequired(dependentId)) {
     this.setState({ dependentErrorMessage : 'Please select your dependent' })
    } else if (!this.validateRequired(company)) {
      this.setState({ companyErrorMessage : 'Please enter a company' })
    } else if (!this.validateRequired(desiredAmount)) {
      this.setState({ desiredAmountErrorMessage : 'Please enter desired amount' })
    } else if (!this.validateRequired(premiumId)) {
      this.setState({ DOPErrorMessage : 'Please select a duration of premium payment' })
    } else {
      this.setState({
        showEditSubmitButton: true,
        titleChange: false,
      })
    }
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

  submitForm () {
    const {
      dependentId,
      desiredAmount,
      company,
      premiumId,
      effectiveDate,
      attachmentArray
    } = this.state

    this.presenter.addGroupAid(
      dependentId,
      desiredAmount,
      effectiveDate,
      company,
      premiumId,
      attachmentArray)
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/education')
  }

  render () {
    const {
      titleChange,
      showEditSubmitButton,
      showNoticeModal,
      showConfirmation,
      showDependent,
      showDOPModal,
      noticeResponse,
      showNoticeResponseModal,
      enabledLoader,
      grantPlan,
      dependentArray,
      showBenefitFeedbackModal,
      data,
      dependentId,
      dependentName,
      dependentMonths,
      dependentErrorMessage,
      company,
      companyErrorMessage,
      desiredAmount,
      desiredAmountErrorMessage,
      premiumId,
      premiumMonths,
      premiumDuration,
      DOPErrorMessage,
      durationOfPremium,
      effectiveDate,
      effectivityDateText,
      effectivityDate,
      attachmentsData,
      attachmentArray
    } = this.state

    return (
      <div>

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
          showDependent &&
          <DependentModal
            label = { 'Dependents' }
            inputArray = { dependentArray }
            selectedArray = { (dependentId, dependentName, dependentMonths) =>
              this.setState({
                dependentId,
                dependentName,
                dependentMonths,
                showDependent : false,
                dependentErrorMessage : ''
              })
            }
            onClose = { () => this.setState({ showDependent : false }) }
          />
        }

        {
          showDOPModal &&
          <DurationOfPremium
            label = { 'Dependents' }
            inputArray = { durationOfPremium }
            selectedArray = { (premiumId, premiumMonths, premiumDuration) =>
              this.setState({
                premiumId,
                premiumMonths,
                premiumDuration,
                showDOPModal : false,
                DOPErrorMessage : ''
              })
            }
            onClose = { () => this.setState({ showDOPModal : false }) }
          />
        }

        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>

          {
            titleChange ?
            <h2 className = { 'header-margin-default' }>
              Education Group - Plan
            </h2>
            :
            <h2 className = { 'header-margin-default' }>
              Form Summary
            </h2>
          }

        </div>
        {
          enabledLoader ?
           <center className = { 'circular-loader-center' }>
             <CircularLoader show = { enabledLoader }/>
           </center> :
          <FormComponent
            grantPlan = { grantPlan }
            dependentName = { dependentName }
            dependentMonths = { dependentMonths }
            dependentErrorMessage = { dependentErrorMessage }
            desiredAmount = { desiredAmount }
            desiredAmountErrorMessage = { desiredAmountErrorMessage }
            company = { company }
            companyErrorMessage = { companyErrorMessage }
            premiumMonths = { premiumMonths }
            premiumDuration = { premiumDuration }
            DOPErrorMessage = { DOPErrorMessage }
            effectivityDate = { effectivityDate }
            effectivityDateText = { effectivityDateText }
            showEditSubmitButton = { showEditSubmitButton }
            showDependentFunc = { (resp) => this.showDependentModal(resp) }
            showPremiumFunc = { (resp) => this.showPremiumModal(resp) }
            companyFunc = { (resp) => this.companyFunc(resp) }
            desiredAmountFunc = { (resp) => this.desiredAmountFunc(resp) }
            dateFunc = { (resp) => this.dateFunc(resp) }
            setAttachmentArrayFunc = { (updatedAttachments) => this.setFileAttachments(updatedAttachments) }
            showFormReview = { (resp) => this.showFormReviewFieldDisabled(resp) }
            onSubmitFunc = { () => this.submitForm() }
            editFormDataFunc = { () => this.editFormReview() }
            attachmentsData = { attachmentsData }
          />
        }
      </div>
    )
  }
}

export default ConnectView(EducationGroupAidFragment, Presenter)
