import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/EducationGrantAidPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import ConfirmationModal from './modal/EducationGrantAidReviewModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from './components/EducationGrantAidFormCardComponent'

class EducationGrantAidFragment extends BaseMVPView{
  constructor(props) {
    super(props)
    this.state = {
      showNoticeModal : false,
      showConfirmation : false,
      noticeResponse : null,
      showNoticeResponseModal : false,
      enabledLoader : false,
      grantAid : [],
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
    this.presenter.validateGrantAid()
  }

  confirmation (showConfirmation, grantId, grantType, grantAmount, file, imagePreviewUrl) {
    if (grantType === "") {
      store.dispatch(NotifyActions.addNotify({
          title : 'education Grant - Aid',
          message : 'Please double check your type of grant',
          type : 'warning',
          duration : 2000
        })
      )
    }
    else if ( grantAmount === 0 || grantAmount === "") {
      store.dispatch(NotifyActions.addNotify({
          title : 'education Grant - Aid',
          message : 'Please double check your grant amount',
          type : 'warning',
          duration : 2000
        })
      )
    }
    else if (!file) {
      store.dispatch(NotifyActions.addNotify({
          title : 'education Grant - Aid',
          message : 'Please double check your attachments',
          type : 'warning',
          duration : 2000
        })
      )
    }
    else {
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

  setGrantAid(grantAid) {
    this.setState({ grantAid })
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
    this.setState({showConfirmation: false, noticeResponse })
  }

  submitForm (grantId, grantAmount, file) {
    this.presenter.addGrantAid(grantId, file)
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
      grantAid,
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
            grantAid = { grantAid }
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
            benefitId = { '13' }
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
            benefitId = { '13' }
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
            Education Grant - Aid
          </h2>
        </div>
        {
          enabledLoader ?
           <center className = { 'circular-loader-center' }>
             <CircularLoader show = { enabledLoader }/>
           </center> :
          <FormComponent
            grantAid = { grantAid }
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

export default ConnectView(EducationGrantAidFragment, Presenter)
