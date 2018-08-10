import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/EducationAidPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader, SingleInputModal } from '../../ub-components/'

import SchoolsModal from './modal/SchoolsModal'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import ConfirmationModal from './modal/EducationAidReviewModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from './components/EducationAidFormCardComponent'

import { RequiredValidation, MoneyValidation } from '../../utils/validate'

import * as EducationAidFunction from './function/EducationAidFunction'

import moment from 'moment'

class EducationAidFragment extends BaseMVPView {

  constructor(props) {
    super(props)

    this.state={
      showNoticeModal : false,
      noticeResponse : null,
      showConfirmation : false,
      showNoticeResponseModal : false,
      enabledLoader : false,
      showEditSubmitButton : false,
      showSchools : false,
      showEducationAcademicYearModal : false,
      showEducationSemesterModal : false,
      tuitionFeeText: '',
      tuitionFeeErrorMessage: '',
      registrationFeeText: '',
      registrationFeeErrorMessage: '',
      totalFeeText: '',
      schoolId: '',
      schoolName: '',
      computations: '',
      schoolErrorMessage: '',
      computations: '',
      courseText: '',
      courseTextErrorMessage: '',
      academicYearId: '',
      academicYearText: '',
      academicYearTextErrorMessage: '',
      semesterId: '',
      semesterText: '',
      semesterErrorMessage: '',
      totalReimbursableAmount: '',
      totalReimbursableAmountText: '',
      gwaText: '',
      gwaErrorMessage: '',
      fileOR: '',
      fileCOG: '',
      fileRegForm: '',
      imagePrevOR : null,
      imagePrevCOG : null,
      imagePrevRegForm : null,
      showBenefitFeedbackModal : false,
      data: '',
      educationAid: [], //education aid details
      schoolsData: [],
      attachmentsData : [],
      attachmentArray : []
    }
    this.validator = this.validator.bind(this)
    this.tuitionFeeFunc = this.tuitionFeeFunc.bind(this)
    this.registrationFeeFunc = this.registrationFeeFunc.bind(this)
    this.courseTextFunc = this.courseTextFunc.bind(this)
    this.showAcademicYearFunc = this.showAcademicYearFunc.bind(this)
    this.showSemesterFunc = this.showSemesterFunc.bind(this)
  }

  tuitionFeeFunc (e) {
    const validate = EducationAidFunction.checkedAmount(e)
        this.setState({ tuitionFeeText : validate, tuitionFeeErrorMessage : '' })
  }

  registrationFeeFunc (e) {
    const validate = EducationAidFunction.checkedAmount(e)
        this.setState({ registrationFeeText : validate, registrationFeeErrorMessage : '' })
  }

  showSchoolsFunc () {
    this.setState({ showSchools : true })
  }

  courseTextFunc (e) {
    const validate = EducationAidFunction.checkedValidateText(e)
    this.setState({ courseText : validate , courseTextErrorMessage : '' })
  }

  gwaFunc (e) {
    const validate = EducationAidFunction.checkedValidateDecimal(e)
    this.setState({ gwaText : validate , gwaErrorMessage : '' })
  }

  showAcademicYearFunc () {
    this.setState({ showEducationAcademicYearModal : true })
  }

  showSemesterFunc () {
    this.setState({ showEducationSemesterModal : true })
  }

  showValidatedAid (educationAid) {
    this.setState({ educationAid })
  }

  setFileAttachments (attachmentArray) {
    this.setState({ attachmentArray })
  }

  showAttachmentsMap (attachmentsData) {
    this.setState({ attachmentsData })
  }

  showSchoolsMap (schoolsData) {
    this.setState({ schoolsData })
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
    else if (parseInt(data.totalReimbursment) === 0) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Education Aid' ,
         message : 'Invalid GWA',
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
    else if (data.courseText.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)){
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
      tuitionFeeText,
      tuitionFeeErrorMessage,
      registrationFeeText,
      registrationFeeErrorMessage,
      schoolID,
      schoolName,
      schoolErrorMessage,
      computations,
      courseText,
      courseTextErrorMessage,
      academicYearId,
      academicYearText,
      academicYearTextErrorMessage,
      semesterId,
      semesterText,
      semesterErrorMessage,
      totalFeeText,
      gwaText,
      gwaErrorMessage,
      educationAid,
      enabledLoader,
      showSchools,
      showNoticeModal,
      noticeResponse,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      showConfirmation,
      showEditSubmitButton,
      showEducationAcademicYearModal,
      showEducationSemesterModal,
      data,
      schoolsData,
      attachmentArray,
      attachmentsData
    }=this.state

    const resultTotalFee =
    tuitionFeeText &&
    registrationFeeText ?
    parseFloat(tuitionFeeText) + parseFloat(registrationFeeText)
    : 0.00

    const AcademicYearOptions = [
      {
        id: 0,
        name: moment().subtract(1, 'years').format('YYYY') + ' - ' + moment().format('YYYY')
      },
      {
        id: 1,
        name: moment().format('YYYY') + ' - ' + moment().add(1, 'years').format('YYYY')
      }
    ]

    const semesterOptions = [
      {
          id: 0,
          name: 'First Semester',
      },
      {
          id: 1,
          name: 'Second Semester',
      },
      {
          id: 2,
          name: 'Third Semester',
      },
      {
          id: 4,
          name: 'Fourth Semester',
      }
    ]

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

        {
          showSchools &&
          <SchoolsModal
            label = { 'College/Universities' }
            inputArray = { schoolsData }
            selectedArray = { (schoolId, schoolName, computations) => {
              this.setState({
                schoolId,
                schoolName,
                computations,
                showSchools : false,
                schoolErrorMessage : ''
                })
              }
            }
            onClose = { () => this.setState({ showSchools : false }) }
          />
        }

        {
          showEducationAcademicYearModal &&
          <SingleInputModal
            label = { 'Academic Year' }
            inputArray = { AcademicYearOptions }
            selectedArray = { (academicYearId, academicYearText) => {
              this.setState({
                academicYearId,
                academicYearText,
                showEducationAcademicYearModal : false,
                academicYearTextErrorMessage : ''
                })
              }
            }
            onClose = { () => this.setState({ showEducationAcademicYearModal : false }) }
          />
        }

        {
          showEducationSemesterModal &&
          <SingleInputModal
            label = { 'Semester' }
            inputArray = { semesterOptions }
            selectedArray = { (semesterId, semesterText) => {
              this.setState({
                semesterId,
                semesterText,
                showEducationSemesterModal : false,
                semesterErrorMessage : ''
                })
              }
            }
            onClose = { () => this.setState({ showEducationSemesterModal : false }) }
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
            educationAid = { educationAid }
            tuitionFeeText = { tuitionFeeText }
            tuitionFeeErrorMessage = { tuitionFeeErrorMessage }
            tuitionFeeFunc = { (resp) => this.tuitionFeeFunc(resp) }
            registrationFeeText = { registrationFeeText }
            registrationFeeErrorMessage = { registrationFeeErrorMessage }
            registrationFeeFunc = { (resp) => this.registrationFeeFunc(resp) }
            totalFeeText = { resultTotalFee }
            attachmentsData = { attachmentsData }
            showEditSubmitButton = { showEditSubmitButton }
            schoolName = { schoolName }
            showSchools = { showSchools }
            computations = { computations }
            showSchoolsFunc = { () => this.showSchoolsFunc() }
            schoolErrorMessage = { schoolErrorMessage }
            courseText = { courseText }
            courseTextFunc = { (resp) => this.courseTextFunc(resp) }
            courseTextErrorMessage = { courseTextErrorMessage }
            academicYearText = { academicYearText }
            showAcademicYearFunc = { (resp) => this.showAcademicYearFunc(resp) }
            academicYearTextErrorMessage = { academicYearTextErrorMessage }
            semesterText = { semesterText }
            showSemesterFunc = { (resp) => this.showSemesterFunc(resp) }
            gwaText = { gwaText }
            gwaFunc = { (resp) => this.gwaFunc(resp) }
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
