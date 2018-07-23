import React from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/DentalReimbursementPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import DentalReimbursementProcedureModal from
  './modal/DentalReimbursementProcedureModal'
import DentalReimbursementCard from './components/DentalReimbursementCard'
import NoticeModal from '../notice/Notice'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'
import ResponseModal from '../notice/NoticeResponseModal'

import './styles/dentalReimbursement.css'
import { CircularLoader, Checkbox } from '../../ub-components/'

class DentalReimbursementFragment extends BaseMVPView {

  constructor (props) {
    super(props)
    this.state = {
      disabled: false,
      procedureModal: false,
      disabled: false, // this is for circular loader
      noticeResponse : null, /* notice response*/
      showNoticeResponseModal : false,
      showBenefitFeedbackModal : false,
      showNoticeModal : false,
      showConfirmation : false,
      attachmentArray : [],
    }
  }

  componentDidMount () {
    this.presenter.getDentalReimbursement()
    this.props.setSelectedNavigation(1)
  }

  hideCircularLoader (disabled) {
    this.setState({ disabled : false })
  }


  showCircularLoader (disabled) {
    this.setState({ disabled : true })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/medical')
  }

  /* Notice Response*/
  noticeOfUndertaking (noticeResponse) {
    this.setState({ showNoticeModal : true, noticeResponse })
  }

  showDentalReimbursementValidate (validateDentalReimbursementResp) {
    this.setState({
      dependents: validateDentalReimbursementResp.dependents,
    })

    const { attachments } = validateDentalReimbursementResp
    const updatedAttachment = [...this.state.attachmentArray]
    attachments && attachments.map((attachment, key) => {
      updatedAttachment.push({name: attachment})
    })

    this.setState({ attachmentArray : updatedAttachment })
  }

  render () {
    const {
      procedureModal,
      disabled,
      dependents,
      selectedDependent,
      selectedProcedures,
      showConfirmation,
      showNoticeModal,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      noticeResponse,
      response,
      attachmentArray,
    } = this.state

    return (
      <div  className = { 'benefits-container' }>
        { super.render() }
        <div>
          <i className = { 'back-arrow' } onClick = { () => this.navigate() }></i>
          <h4 className = { 'header-margin-default' } >DENTAL REIMBURSEMENT</h4>
        </div>
          <div className = { 'dentalreimbursement-container' }>
            {
              showNoticeModal &&
              <NoticeModal
                onClose = { () => this.setState({ showNotice : false })}
                noticeResponse = { noticeResponse }
                benefitId = { '6' }
                onDismiss = { (showNoticeModal, response) =>
                  this.setState({ showNoticeModal, response, showNoticeResponseModal : true })  }
              />
            }

            {
              showNoticeResponseModal &&
              <ResponseModal
                onClose = { () => {
                  this.setState({ showNoticeResponseModal : false,  showBenefitFeedbackModal : true })
                }}
                noticeResponse = { response }
              />

            }

            {
              showBenefitFeedbackModal &&
              <BenefitFeedbackModal
                benefitId = { '6' }
                onClose = { () => {
                  this.props.history.push('/mybenefits/benefits/medical'),
                  this.setState({ showBenefitFeedbackModal : false })
                }}
              />
            }

            {
              disabled ?
               <center className = { 'dentalloa-loader' }>
                <CircularLoader show = {this.state.disabled}/>
               </center>               :
              <DentalReimbursementCard
                attachments = { attachmentArray }
                presenter = { this.presenter }
                dependents = { dependents }/>
            }
          </div>
      </div>
    )
  }
}

export default ConnectView(DentalReimbursementFragment, Presenter)
