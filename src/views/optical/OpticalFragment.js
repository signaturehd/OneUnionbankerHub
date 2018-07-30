import React from 'react'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/OpticalPresenter'
import ConnectView from '../../utils/ConnectView'
import Card from './components/OpticalCard'
import ConfirmationModal from './modal/OpticalReviewModal'
import NoticeModal from '../notice/Notice'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'
import ResponseModal from '../notice/NoticeResponseModal'
import './styles/optical.css'

import store from '../../store'
import { NotifyActions } from '../../actions'

import { CircularLoader } from '../../ub-components'

import { format } from '../../utils/numberUtils'

import {
  RequiredValidation,
  Validator,
  MoneyValidation
} from '../../utils/validate'

import * as func from './functions/OpticalFunctions'

class OpticalFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showNoticeModal : false,
      showConfirmation : false,
      noticeResponse : null,
      showNoticeResponseModal : false,
      showBenefitFeedbackModal : false,
      isVisible : false,
      file1 : null,
      file2 : null,
      attachmentsData: [],
      showEditSubmitButton : false,
      amountErrorMessage : '',
      amount: '',
      orNumberText: '',
      preferredDate: '',
      limit: 0
    }
    this.confirmation = this.confirmation.bind(this)
    this.validator = this.validator.bind(this)
  }

  validator (input) {
    return new RequiredValidation().isValid(input)
  }

  componentDidMount () {
    this.presenter.getOptical()
    this.props.setSelectedNavigation(1)
  }

  isEligible (resp) {
    this.setState({ isVisible : resp})
  }

  showAttachmentsMap (attachmentsData, limit) {
    this.setState({ attachmentsData, limit })
  }

  noticeOfUndertaking (noticeResponse) {
    this.setState({ showNoticeModal : true, noticeResponse })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/medical')
  }

  validateDesiredAmount (e) {
    const validate = func.checkedAmount(e)
    this.setState({ amount : validate, amountErrorMessage : '' })
  }

  validateSymbol (e) {
    const validate = func.checkedValidateSymbol(e)
    this.setState({ orNumberText : validate.toUpperCase(), orNumberErrorMessage : '' })
  }

  validateDate (e) {
    const validate = func.checkedMDYDate(e)
    this.setState({ preferredDate : validate, dateErrorMessage : '' })
  }

  confirmation () {
    const {
      amount,
      limit,
      attachmentsData
    } = this.state

    if (parseInt(amount) === 0 || amount === '') {
      store.dispatch(NotifyActions.addNotify({
          title : 'Optical Reimbursement',
          message : 'Please enter an amount not equal to 0',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (parseInt(amount) > parseInt(limit)) {
      store.dispatch(NotifyActions.addNotify({
          title : 'Optical Reimbursement',
          message : `Please double check amount must not exceeded to ${ format(limit) }`,
          type : 'warning',
          duration : 2000
        })
      )
    }
     else if (!this.validator(attachmentsData)) {
      store.dispatch(NotifyActions.addNotify({
          title : 'Optical Reimbursement',
          message : 'Please Check your attachments',
          type : 'warning',
          duration : 2000
        })
      )
    } else {
      this.setState({ showEditSubmitButton : true })
    }
  }

  editMode (resp) {
    this.setState({ showEditSubmitButton : false })
  }

  getAttachmentsArray (attachmentsData) {
    this.setState({ attachmentsData })
  }

  submitFormFunc () {
    const {
      amount,
      attachmentsData,
    } = this.state

      this.presenter.addOptical(amount, attachmentsData)
  }

  render () {
    const {
      showConfirmation,
      showNoticeModal,
      showBenefitFeedbackModal,
      showNoticeResponseModal,
      showEditSubmitButton,
      noticeResponse,
      amount,
      response,
      isVisible,
      attachmentsData,
      amountErrorMessage,
      orNumberText,
      preferredDate,
      limit
    } = this.state

    return (
      <div>
        {
          showNoticeModal &&
          <NoticeModal
            onClose = { () => this.setState({ showNotice : false })}
            noticeResponse = { noticeResponse }
            benefitId = { '8' }
            onDismiss = { (showNoticeModal, response) =>
              this.setState({ showNoticeModal, response, showNoticeResponseModal : true })  }
          />
        }

        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose = { () => {
              this.setState({ showNoticeResponseModal : false, showBenefitFeedbackModal : true })
            }}
            noticeResponse = { response }
          />
        }

        {
          showBenefitFeedbackModal &&
          <BenefitFeedbackModal
            benefitId = { '8' }
            onClose = { () => {
              this.props.history.push('/mybenefits/benefits/medical'),
              this.setState({ showBenefitFeedbackModal : false })
            }}
          />
        }
        <div className = { 'optical-grid-x3' }>
          <div>
            <div>
              <i className = { 'back-arrow' } onClick = {
                  this.navigate.bind(this) }></i>
            </div>
          </div>
          <div>
            <h2 className = { 'header-margin-default' }>Optical Reimbursement</h2>
            {
              isVisible ?
              <div className = { 'optical-container' }>
                <Card
                  attachmentsData = { attachmentsData }
                  amount = { amount }
                  orNumberText = { orNumberText }
                  showEditSubmitButton = { showEditSubmitButton }
                  preferredDate = { preferredDate }
                  dateFunc = { (resp) => this.validateDate(resp) }
                  onEditSubmissionFunc = { (resp) =>  this.editMode(resp) }
                  onCheckedSubmissionFunc = { () => this.confirmation() }
                  oRNumberFunc = { (resp) => this.validateSymbol(resp) }
                  desiredAmount = { (resp) => this.validateDesiredAmount(resp) }
                  onSubmitFunc = { () => this.submitFormFunc() }

                  setAttachmentArrayFunc = { (resp) =>
                    this.getAttachmentsArray(resp) }
                  />
              </div>          :
              <div className = { 'optical-loader' }>
                <center>
                  <CircularLoader show = {true} />
                </center>
              </div>
            }
          </div>
          <div></div>
        </div>
      </div>
    )
  }
}

export default ConnectView(OpticalFragment, Presenter)
