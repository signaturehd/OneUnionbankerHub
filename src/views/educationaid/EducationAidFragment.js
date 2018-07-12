import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/EducationAidPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import ConfirmationModal from './modal/EducationAidReviewModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from './components/EducationAidFormCardComponent'

import { RequiredValidation, MoneyValidation } from '../../utils/validate'

class EducationAidFragment extends BaseMVPView {

  constructor(props) {
    super(props)

    this.state={
      showNoticeModal : false,
      noticeResponse : null,
      showConfirmation : false,
      showNoticeResponseModal : false,
      enabledLoader : false,
      tuitionFeeText: '',
      registrationFeeText: '',
      totalFeeText: '',
      collegeType: '',
      schoolID: '',
      courseText: '',
      academicYearText: '',
      semesterText: '',
      totalReimbursableAmount: '',
      gwaText: '',
      fileOR: '',
      fileCOG: '',
      fileRegForm: '',
      imagePrevOR : null,
      imagePrevCOG : null,
      imagePrevRegForm : null,
      showBenefitFeedbackModal : false,
      data: '',
      educationAid: [] //education aid details
    }
    this.validator = this.validator.bind(this)
  }

  submitForm (
    courseText,
    academicYearText,
    semesterText,
    gwaText,
    tuitionFeeText,
    registrationFeeText,
    schoolId,
    fileAttachments) {
    this.presenter.addEducationAid(
      courseText,
      academicYearText,
      semesterText,
      gwaText,
      tuitionFeeText,
      registrationFeeText,
      schoolId,
      fileAttachments)
  }

  validator (input) {
     return new RequiredValidation().isValid(input)
   }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateAid()
  }

  confirmation (showConfirmation, data) {
    if (this.validator(!data.tuitionFeeText)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Education Aid' ,
         message : 'Please double check your Tuition Fee',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (this.validator(!data.registrationFeeText)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Education Aid' ,
         message : 'Please double check your Registration Fee',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (this.validator(!data.schoolID)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Education Aid' ,
         message : 'Please double check your College/Universities',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (this.validator(!data.courseText)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Education Aid' ,
         message : 'Please double check your Course',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (this.validator(!data.academicYearText)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Education Aid' ,
         message : 'Please double check your Academic Year',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (this.validator(!data.semesterText)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Education Aid' ,
         message : 'Please double check your Semester',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (this.validator(!data.gwaText)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Education Aid' ,
         message : 'Please double check your GWA',
         type : 'warning',
         duration : 2000
       })
     )
    }
     else if (!(data.fileOR && data.fileCOG && data.fileRegForm)) {
      store.dispatch(NotifyActions.addNotify({
          title : 'Education Aid',
          message : 'Please check your attachments',
          type : 'warning',
          duration : 2000
        })
      )
    }
    if (data.courseText.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)){
      store.dispatch(NotifyActions.addNotify({
          title : 'Education Aid',
          message : 'Special Characters are not accepted',
          type : 'warning',
          duration : 2000
        })
      )
    }
    else {
      this.setState({showConfirmation, data})
    }
  }

  setEducationAid(educationAid) {
    this.setState({ educationAid })
  }

  setValidateAid(validateAid) {
    this.setState({ validateAid })
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
    this.props.history.push('/mybenefits/benefits/education')
  }

  render () {
    const {
      courseText,
      academicYearText,
      semesterText,
      gwaText,
      tuitionFeeText,
      registrationFeeText,
      schoolID,
      fileOR,
      fileCOG,
      fileRegForm,
      imagePrevOR,
      imagePrevCOG,
      imagePrevRegForm,
      totalFeeText,
      educationAid,
      enabledLoader,
      showNoticeModal,
      noticeResponse,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      showConfirmation,
      data
    }=this.state

    return (
      <div>
      {
        showConfirmation &&
        <ConfirmationModal
          data = { data }
          submitForm = { (
            courseText,
            academicYearText,
            semesterText,
            gwaText,
            tuitionFeeText,
            registrationFeeText,
            schoolId,
            fileAttachments) =>
            this.submitForm(
              courseText,
              academicYearText,
              semesterText,
              gwaText,
              tuitionFeeText,
              registrationFeeText,
              schoolId,
              fileAttachments) }
          onClose = { () => this.setState({ showConfirmation : false }) }
        />
      }


        {
          showNoticeModal &&
          <NoticeModal
            onClose={ () => this.setState({ showNoticeModal : false })}
            noticeResponse={ noticeResponse }
            benefitId={ '11' }
            onDismiss={ (showNoticeModal, noticeResponse) =>
              this.setState({ showNoticeModal, noticeResponse, showNoticeResponseModal : true })  }
          />
        }

        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false, showBenefitFeedbackModal : true })
            }}
            noticeResponse={ noticeResponse }
          />
        }

        {
          showBenefitFeedbackModal &&
          <BenefitFeedbackModal
            benefitId={ '11' }
            onClose={ () => {
              this.props.history.push('/mybenefits/benefits/education'),
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
            Education Aid
          </h2>
        </div>
        {
          enabledLoader ?
           <center className={ 'circular-loader-center' }>
             <CircularLoader show={ this.state.enabledLoader }/>
           </center> :
          <FormComponent
            educationAid={ educationAid }
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


export default ConnectView(EducationAidFragment, Presenter)
