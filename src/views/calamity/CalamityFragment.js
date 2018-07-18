import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/CalamityPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components/'

import store from '../../store'
import { NotifyActions } from '../../actions'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import ConfirmationModal from './modal/CalamityReviewModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import FormComponent from './components/CalamityFormCardComponent'
import { RequiredValidation } from '../../utils/validate'

class CalamityFragment extends BaseMVPView {

  constructor(props) {
    super(props)

    this.state={
      showConfirmation : false,
      showNoticeModal : false,
      noticeResponse : null,
      showNoticeResponseModal : false,
      showBenefitFeedbackModal : false,
      enabledLoader:false,
      calamityAssistance: [],
      date: null,
      calamityId: '',
      calamityType: '',
      preferredDate: '',
      property: '',
      propertyDesc: '',
      propertyType: '',
      acquisitionValue: '',
      estimatedCost: '',
      fileBC: null,
      fileDP: null,
      imgPrevBC: null,
      imgPrevDP: null,
      data : ''
    }
    this.validator = this.validator.bind(this)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateCalamityAssistance()
  }
  validator (input) {
     return new RequiredValidation().isValid(input)
   }

  confirmation (showConfirmation, data) {
    if (!this.validator(data.calamityType)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Calamity Assistance' ,
         message : 'Please provide information to Calamity Type field',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (!this.validator(data.preferredDate)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Calamity Assistance' ,
         message : 'Please provide information to Date of Occurrence field',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (!this.validator(data.property)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Calamity Assistance' ,
         message : 'Please provide information to Property field',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (!this.validator(data.propertyDesc)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Calamity Assistance' ,
         message : 'Please provide information to Property description field',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (!this.validator(data.propertyType)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Calamity Assistance' ,
         message : 'Please provide information to Property Type field',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (!this.validator(data.acquisitionValue) || data.acquisitionValue==0) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Calamity Assistance' ,
         message : 'Please provide information to Acquisition Value field',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (!this.validator(data.estimatedCost) || data.estimatedCost==0) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Calamity Assistance' ,
         message : 'Please provide information to Estimated Cost field',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (!data.fileBC) {
      store.dispatch(NotifyActions.addNotify({
          title : 'Calamity Assistance ',
          message : 'Please check your Barangay Certificate',
          type : 'warning',
          duration : 2000
        })
      )
    }
    else if (!data.fileDP) {
      store.dispatch(NotifyActions.addNotify({
          title : 'Calamity Assistance ',
          message : 'Please check your Damaged Property',
          type : 'warning',
          duration : 2000
        })
      )
    }
    else {
      this.setState({ showConfirmation, data })
    }
  }

  submitForm (data) {
    this.presenter.addCalamityAssistance(
      data.calamityId,
      data.preferredDate,
      data.property,
      data.propertyDesc,
      data.propertyType,
      data.acquisitionValue,
      data.estimatedCost,
      data.fileBC,
      data.fileDP
    )
  }

  setValidateCalamityAssistance(calamityAssistance) {
    this.setState({ calamityAssistance })
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

  navigate () {
    this.props.history.push('/mybenefits/benefits')
  }

  render () {
    const {
      showNoticeModal,
      noticeResponse,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      calamityAssistance,
      enabledLoader,
      date,
      response,
      showConfirmation,
      data
    }=this.state

    return (
      <div>
      {
        showConfirmation &&
        <ConfirmationModal
          data = { data }
          submitForm = { (data) =>
            this.submitForm(data) }
          onClose = { () => this.setState({ showConfirmation : false }) }
        />
      }

      {
        showNoticeModal &&
        <NoticeModal
          onClose={ () => this.setState({ showNoticeModal : false })}
          noticeResponse={ noticeResponse }
          benefitId={ '22' }
          onDismiss={ (showNoticeModal, response) =>
            this.setState({ showNoticeModal, response, showNoticeResponseModal : true })  }
        />
      }

      {
        showNoticeResponseModal &&
        <ResponseModal
          onClose={ () => {
            this.setState({ showNoticeResponseModal : false, showBenefitFeedbackModal : true })
          }}
          noticeResponse={ response }
        />
      }

      {
        showBenefitFeedbackModal &&
        <BenefitFeedbackModal
          benefitId={ '22' }
          onClose={ () => {
            this.props.history.push('/mybenefits/benefits'),
            this.setState({ showBenefitFeedbackModal : false })
          }}
        />
      }
        <div>
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>
          <h2 className={ 'header-margin-default' }>
            Calamity Assistance Form
          </h2>
        </div>
        {
          enabledLoader ?
           <center className={ 'circular-loader-center' }>
             <CircularLoader show={ this.state.enabledLoader }/>
           </center> :
          <FormComponent
            onClick = {
              (showConfirmation, data) => {
                this.confirmation(showConfirmation, data)
              }
            }
            calamityAssistance={ calamityAssistance }
            getPreferredDate = { data =>
              this.setState({ date :  data })}

              getFormData={ (
                calamityId,
                calamityType,
                preferredDate,
                property,
                propertyDesc,
                propertyType,
                acquisitionValue,
                estimatedCost,
                fileBC,
                fileDP,
                imgPrevBC,
                imgPrevDP
              ) => this.confirmation(
                calamityId,
                calamityType,
                preferredDate,
                property,
                propertyDesc,
                propertyType,
                acquisitionValue,
                estimatedCost,
                fileBC,
                fileDP,
                imgPrevBC,
                imgPrevDP
                )
              }
          />
        }
      </div>
    )
  }
}


export default ConnectView(CalamityFragment, Presenter)
