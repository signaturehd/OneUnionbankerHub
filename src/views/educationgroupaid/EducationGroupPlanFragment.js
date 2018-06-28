import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/EducationGroupPlanPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

class EducationGroupPlanFragment extends BseMVPView {

  constructor (props) {
    super (props)
  }

  render () {
    const {  }=this.state
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


export default ConnectView(EducationGroupPlanFragment, Presenter)
