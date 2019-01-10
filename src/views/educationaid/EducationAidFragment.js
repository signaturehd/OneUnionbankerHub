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
import { format } from '../../utils/numberUtils'


class EducationAidFragment extends BaseMVPView {

  constructor(props) {
    super(props)

    this.state={
      titleChange : true,
      showNoticeModal : false,
      noticeResponse : null,
      showNoticeResponseModal : false,
      enabledLoader : false,
      showEditSubmitButton : false,
      showSchools : false,
      showEducationAcademicYearToModal : false,
      showEducationAcademicYearFromModal : false,
      showEducationSemesterModal : false,
      showBenefitFeedbackModal : false,
      schoolId: '',
      academicYearToId: '',
      semesterId: '',
      tuitionFeeText: '',
      registrationFeeText: '',
      schoolName: '',
      computations: '',
      courseText: '',
      semesterText: '',
      gwaText: '',
      totalReimbursableAmount: '',
      orNumber : '',
      orNumberErrorMessage : '',
      orDate : '',
      orDateErrorMessage : '',
      tuitionFeeErrorMessage: '',
      registrationFeeErrorMessage: '',
      schoolErrorMessage: '',
      courseTextErrorMessage: '',
      academicYearToTextErrorMessage: '',
      academicYearFromTextErrorMessage: '',
      semesterErrorMessage: '',
      gwaErrorMessage: '',
      data: '',
      schoolsData: [],
      attachmentsData : [],
      attachmentArray : [],
      academicYearTo : '',
      academicYearFrom: '',
      academicYearFromErrorMessage : '',
      academicYearToErrorMessage: '',
    }
    this.validateRequired = this.validateRequired.bind(this)
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

  academicYearFromFunc (e) {
    const validate = EducationAidFunction.checkedAmount(e)
    const validateDateFrom = moment().subtract(2, 'years').format('YYYY')
    if(validateDateFrom >= validate) {
      this.setState({ academicYearFromErrorMessage : 'Enter present or past 2 yrs' })
    } else {
      this.setState({ academicYearFrom : validate, academicYearFromErrorMessage : '' })
    }
  }

  academicYearToFunc (e) {
    const validate = EducationAidFunction.checkedAmount(e)
    const validateDateFrom = moment().subtract(1, 'years').format('YYYY')
    const validateDateTo = moment().add(1, 'years').format('YYYY')

    if(validate > parseInt(validateDateTo)) {
      this.setState({ academicYearToErrorMessage : 'Enter present or past 2 yrs' })
    } else {
      this.setState({ academicYearTo : validate, academicYearToErrorMessage : '' })
    }
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

  orNumberFunc (e) {
    const validate = EducationAidFunction.checkedValidateSymbol(e)
    this.setState({ orNumber : validate, orNumberErrorMessage : '' })
  }

  orDateFunc (data) {
    this.setState({ orDate: data.format('MM/DD/YYYY'), orDateErrorMessage : '' })
  }

  validateRequired (e) {
    return EducationAidFunction.checkedValidateInput(e)
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

  editFormReview (e) {
    this.setState({ showEditSubmitButton : false, titleChange : true })
  }

  submitForm () {
    const {
      courseText,
      academicYearText,
      semesterText,
      gwaText,
      tuitionFeeText,
      registrationFeeText,
      schoolId,
      orDate,
      orNumber,
      attachmentArray
    } = this.state

    this.presenter.addEducationAid(
      courseText,
      academicYearText,
      semesterText,
      gwaText,
      tuitionFeeText,
      registrationFeeText,
      schoolId,
      orDate,
      orNumber,
      attachmentArray)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateAid()
  }

  showFormReviewFieldDisabled (e) {
    const {
      tuitionFeeText,
      registrationFeeText,
      schoolName,
      courseText,
      academicYearText,
      semesterText,
      gwaText,
      orNumber,
      orDate,
      attachmentArray
    } = this.state

    let validateAttachments = false
    attachmentArray && attachmentArray.map(
      (attachment, key) => {
        if(!attachment.file) {
          validateAttachments = true
        }
      }
    )

    if(!this.validateRequired(tuitionFeeText)) {
     this.setState({ tuitionFeeErrorMessage : 'Please enter an amount' })
    } else if (!this.validateRequired(registrationFeeText)) {
      this.setState({ registrationFeeErrorMessage : 'Please enter an amount' })
    } else if (!this.validateRequired(schoolName)) {
      this.setState({ schoolErrorMessage : 'Please select a Colleges/Universities' })
    } else if (!this.validateRequired(courseText)) {
      this.setState({ courseTextErrorMessage : 'Please enter a Course' })
    } else if (!this.validateRequired(academicYearText)) {
      this.setState({ academicYearTextErrorMessage : 'Please select an Academic Year' })
    } else if (!this.validateRequired(semesterText)) {
      this.setState({ semesterErrorMessage : 'Please select a Semester' })
    } else if (!this.validateRequired(gwaText)) {
      this.setState({ gwaErrorMessage : 'Please enter your GWA' })
    } else if (!this.validateRequired(orDate)) {
      this.setState({ orDateErrorMessage : 'Please select a date' })
    } else if (!this.validateRequired(orNumber)) {
      this.setState({ orNumberErrorMessage : 'Please enter an Official Receipt Number' })
    } else if (!attachmentArray.length) {
       store.dispatch(NotifyActions.addNotify({
          title : 'My Benefits' ,
          message : 'Attachments is required',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (validateAttachments) {
      attachmentArray && attachmentArray.map(
        (attachment, key) => {
          if(!attachment.file) {
            store.dispatch(NotifyActions.addNotify({
               title : 'My Benefits' ,
               message : attachment.name + ' is required',
               type : 'warning',
               duration : 2000
             })
           )
          }
        }
      )

     }
     else {
      this.setState({
        showEditSubmitButton: true,
        titleChange: false,
      })
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

  setAcademicYear (AcademicYearOptionsFrom, AcademicYearOptionsTo) {
     this.setState({ AcademicYearOptionsFrom, AcademicYearOptionsTo })
  }

  showAcademicYearFromFunc () {
    this.setState({ showEducationAcademicYearFromModal : true })
  }

  showAcademicYearToFunc () {
    this.setState({ showEducationAcademicYearToModal : true })
  }

  navigate () {
    // this.props.history.push('/mybenefits/benefits/education')
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
      academicYearFromId,
      academicYearFromText,
      academicYearToId,
      academicYearToText,
      academicYearFromTextErrorMessage,
      academicYearToTextErrorMessage,
      semesterId,
      semesterText,
      semesterErrorMessage,
      gwaText,
      gwaErrorMessage,
      totalReimbursableAmount,
      orNumber,
      orNumberErrorMessage,
      orDate,
      orDateErrorMessage,
      educationAid,
      enabledLoader,
      showSchools,
      showNoticeModal,
      noticeResponse,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      showEditSubmitButton,
      showEducationAcademicYearToModal,
      showEducationAcademicYearFromModal,
      showEducationSemesterModal,
      data,
      titleChange,
      schoolsData,
      attachmentArray,
      attachmentsData,
      academicYearTo,
      academicYearFrom,
      academicYearFromErrorMessage,
      academicYearToErrorMessage,
      AcademicYearOptionsFrom,
      AcademicYearOptionsTo,
    }=this.state

    const resultTotalFee =
    tuitionFeeText &&
    registrationFeeText ?
    parseFloat(tuitionFeeText) + parseFloat(registrationFeeText)
    : 0.00
    {
    //
    // const AcademicYearOptions = [
    //   {
    //     id: 0,
    //     name: moment().subtract(2, 'years').format('YYYY') + '-' + moment().subtract(1, 'years').format('YYYY')
    //   },
    //   {
    //     id: 1,
    //     name: moment().subtract(1, 'years').format('YYYY') + '-' + moment().format('YYYY')
    //   }
    // ]
    }

    const semesterOptions = [
      {
          id: 0,
          name: '1st Semester',
      },
      {
          id: 1,
          name: '2nd Semester',
      },
      {
          id: 2,
          name: '3rd Semester',
      },
      {
          id: 4,
          name: '4th Semester',
      }
    ]

    const totalReimbursment = format(EducationAidFunction.totalReimbursableAmount(computations, gwaText, resultTotalFee))

    return (
      <div>
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
          showEducationAcademicYearFromModal &&
          <SingleInputModal
            label = { 'Academic Year' }
            inputArray = { AcademicYearOptionsFrom }
            selectedArray = { (academicYearFromId, academicYearFromText) => {
              if(!academicYearToText) {
                this.setState({
                  academicYearFromId,
                  academicYearFromText,
                  showEducationAcademicYearFromModal : false,
                  academicYearFromTextErrorMessage : ''
                })
              } else {
                if(
                  parseInt(academicYearToText) === parseInt(academicYearFromText) ||
                  parseInt(academicYearToText)-1 === parseInt(academicYearFromText)
                  ) {
                  this.setState({
                    academicYearFromId,
                    academicYearFromText,
                    showEducationAcademicYearFromModal : false,
                    academicYearFromTextErrorMessage : ''
                  })
                }
              }
            }
          }
          onClose = { () => this.setState({ showEducationAcademicYearFromModal : false }) }
          />
        }

        {
          showEducationAcademicYearToModal &&
          <SingleInputModal
            label = { 'Academic Year' }
            inputArray = { AcademicYearOptionsTo }
            selectedArray = { (academicYearToId, academicYearToText) => {
              if(academicYearFromText) {
                if(
                  parseInt(academicYearToText) === parseInt(academicYearFromText) + 1 ||
                  parseInt(academicYearToText) === parseInt(academicYearFromText)) {
                  this.setState({
                    academicYearToId,
                    academicYearToText,
                    showEducationAcademicYearToModal : false,
                    academicYearToTextErrorMessage : ''
                    })
                  }
                }
              }
            }
            onClose = { () => this.setState({ showEducationAcademicYearToModal : false }) }
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

          {
            titleChange ?
            <h2 className={ 'header-margin-default' }>
              Education Aid
            </h2>
            :
            <h2 className = { 'header-margin-default' }>
              Form Summary
            </h2>
          }

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
            registrationFeeText = { registrationFeeText }
            totalFeeText = { resultTotalFee }
            schoolName = { schoolName }
            showSchools = { showSchools }
            computations = { computations }
            courseText = { courseText }
            academicYearFromText = { academicYearFromText }
            academicYearToText = { academicYearToText }
            academicYearToFunc = { (e) => this.academicYearToFunc(e) }
            academicYearFromFunc = { (e) => this.academicYearFromFunc(e) }
            academicYearTo = { academicYearTo }
            academicYearFrom = { academicYearFrom }
            academicYearFromErrorMessage = { academicYearFromErrorMessage }
            academicYearToErrorMessage = { academicYearToErrorMessage }
            semesterText = { semesterText }
            gwaText = { gwaText }
            totalReimbursment = { totalReimbursment }
            schoolErrorMessage = { schoolErrorMessage }
            registrationFeeErrorMessage = { registrationFeeErrorMessage }
            academicYearToTextErrorMessage = { academicYearToTextErrorMessage }
            academicYearFromTextErrorMessage = { academicYearFromTextErrorMessage }
            courseTextErrorMessage = { courseTextErrorMessage }
            semesterErrorMessage = { semesterErrorMessage }
            gwaErrorMessage = { gwaErrorMessage }
            orNumber = { orNumber }
            orNumberErrorMessage = { orNumberErrorMessage }
            orDate = { orDate }
            orDateErrorMessage = { orDateErrorMessage }
            attachmentsData = { attachmentsData }
            showEditSubmitButton = { showEditSubmitButton }
            tuitionFeeFunc = { (resp) => this.tuitionFeeFunc(resp) }
            registrationFeeFunc = { (resp) => this.registrationFeeFunc(resp) }
            showSchoolsFunc = { () => this.showSchoolsFunc() }
            courseTextFunc = { (resp) => this.courseTextFunc(resp) }
            showAcademicYearFromFunc = { () => this.showAcademicYearFromFunc() }
            showAcademicYearToFunc = { () => this.showAcademicYearToFunc() }
            showSemesterFunc = { (resp) => this.showSemesterFunc(resp) }
            gwaFunc = { (resp) => this.gwaFunc(resp) }
            orNumberFunc = { (resp) => this.orNumberFunc(resp) }
            orDateFunc = { (resp) => this.orDateFunc(resp) }
            showFormReview = { (resp) => this.showFormReviewFieldDisabled(resp) }
            onSubmitFunc = { () => this.submitForm() }
            editFormDataFunc = { () => this.editFormReview() }
            setAttachmentArrayFunc = { (updatedAttachments) => this.setFileAttachments(updatedAttachments) }
          />
        }
      </div>
    )
  }
}


export default ConnectView(EducationAidFragment, Presenter)
